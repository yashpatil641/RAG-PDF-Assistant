import { Worker } from "bullmq";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { weaviateStore } from "./store";


dotenv.config();


const worker = new Worker(
  "file-upload-q",
  async (job) => {
    const data = JSON.parse(job.data);
    // console.log("Data", data);

    const fileName = path.basename(data.fileName, path.extname(data.fileName));
    const collectionId = `${fileName.replace(/[^a-zA-Z0-9_-]/g, '_')}_${uuidv4()}`;
    // console.log(`Creating collection: ${collectionId}`);
    

    const loader = new PDFLoader(data.filePath);
    const docs = await loader.load();
    docs.forEach((doc, index) => {
      const pageNumber = doc.metadata.loc?.pageNumber || null;
      doc.metadata = {
        ...doc.metadata,
        fileName: data.fileName,
        collectionId: collectionId,
        processedAt: new Date().toISOString(),
        chunkId: index,
        totalChunks: docs.length,
        pageNumber: pageNumber, // Add page number to metadata
      };
    });
    
    // const textSplitter = new CharacterTextSplitter({
    //   chunkSize: 1000,
    //   chunkOverlap: 200,
    // });
    // let allChunks = [];
    // for (const doc of docs) {
    //   const chunks = await textSplitter.splitText(doc.pageContent);
    //   allChunks.push(...chunks);
    // }
    // // console.log("All Chunks", allChunks);


    // console.log("start embedding");
    // const embeddings = new GoogleGenerativeAIEmbeddings({
    //   model: "text-embedding-004", // 768 dimensions
    //   taskType: TaskType.RETRIEVAL_DOCUMENT,
    //   title: "Document title",
    //   apiKey: process.env.GOOGLE_API_KEY,
    // });    
    // // const vectors = await embeddings.embedDocuments(allChunks);
    // // console.log("Vectors", vectors);

    // const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    //   url: "http://localhost:6333",
    //   collectionName: collectionId,
    // });

    // await vectorStore.addDocuments(docs);
    // console.log("Added documents to Qdrant");


    await weaviateStore.addDocuments(docs);
  },
  { concurrency: 100, connection: { host: "localhost", port: 6379 } }
);
