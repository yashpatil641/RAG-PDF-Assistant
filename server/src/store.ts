import { WeaviateStore } from "@langchain/weaviate";
import weaviate, { ApiKey } from "weaviate-ts-client";
import type { Document } from "@langchain/core/documents";
import dotenv from "dotenv";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";


dotenv.config();


const embeddings = new GoogleGenerativeAIEmbeddings({
	model: "text-embedding-004", // 768 dimensions
	taskType: TaskType.RETRIEVAL_DOCUMENT,
	title: "Document title",
	apiKey: process.env.GOOGLE_API_KEY,
});    

const weaviateClient = (weaviate as any).client({
	scheme:"https",
	host: "jswfwkuashsibpw5hr7ag.c0.asia-southeast1.gcp.weaviate.cloud",
	apiKey: new ApiKey("l7VAbX6FSrHAuUlo6IZ8yDkP7eXNwc1Mv3Oh"),
});

export const weaviateStore = new WeaviateStore(embeddings, {
	client: weaviateClient,
	indexName: "Mean",
	textKey: "text",
	metadataKeys: ["pageNumber"],
});
