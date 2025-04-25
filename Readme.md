# RAG PDF Assistant

A conversational AI application that allows users to chat with their PDF documents using Retrieval-Augmented Generation (RAG).

## Features

- **PDF Document Processing**: Upload PDFs and extract text content
- **Document Isolation**: Each PDF gets a unique collection in Qdrant vector database
- **Conversational Interface**: Chat with your documents using natural language
- **Semantic Search**: Retrieve relevant information from PDFs
- **AI-Powered Responses**: Get comprehensive answers based on your document content
- **Markdown Support**: View formatted responses with code highlighting

## Architecture

### Client (Next.js)

- React-based frontend with a modern UI
- Real-time chat interface
- PDF document upload and management
- Markdown rendering with syntax highlighting

### Server (Express.js)

- RESTful API endpoints for chat and file processing
- PDF processing with LangChain
- Vector database integration with Qdrant
- Background job processing with BullMQ

### Vector Store (Qdrant)

- Stores document embeddings for semantic search
- Creates a unique collection per uploaded PDF
- Enables efficient similarity search

### LLM Integration

- Uses Google's Generative AI (Gemini) for text generation
- Retrieves contextual information from the vector database
- Combines retrieved context with user questions