import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { Queue } from "bullmq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const queue = new Queue("file-upload-q", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API" });
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.post(
  "/api/upload/pdf",
  upload.single("pdf"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await queue.add(
      "file-upload",
      JSON.stringify({
        filePath: req.file.path,
        fileName: req.file.originalname,
        destination: req.file.destination,
      })
    );
    return res.status(200).json({
      message: "File uploaded successfully",
      // file: req.file,
    });
  }
);

app.post("/api/chat", async (req: Request, res: Response) => {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: "Document title",
    apiKey: process.env.GOOGLE_API_KEY,
  });
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "langchainjs-testing",
    }
  );
  const retriever = vectorStore.asRetriever({
    k: 2,
  });
  const result = await retriever.invoke(
    req.body.question,
  );
  console.log("Result", result);
  // res.status(200).json({ result });

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    maxOutputTokens: 2048,
		apiKey: process.env.GOOGLE_API_KEY,
  });

  // Batch and stream are also supported

  const systemPrompt = `
	You are a helpful AI assistant that answers questions based solely on the content of a PDF document provided by the user.
	Only use information from the PDF to answer questions. If something is not mentioned or cannot be inferred from the PDF, clearly say so.
	explain the concepts that the user asks about in detail, and provide examples if possible.
	also include imojies in your answers.
	context: ${JSON.stringify(result)}
	`;
	const messages = [
		{ role: "system", content: systemPrompt },
		{ role: "user", content: req.body.question },
	];
	const resp = await model.invoke(messages);
	console.log("Response", resp);
	res.status(200).json({ response: resp });

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
