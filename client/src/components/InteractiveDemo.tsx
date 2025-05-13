"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Sample Q&A for demonstration
const demoConversation = [
  {
    question: "What are the key features of this application?",
    answer: "The key features include PDF document processing, document isolation with unique collections in Qdrant, a conversational interface using natural language, semantic search for relevant information retrieval, AI-powered responses, and markdown support for formatted responses.",
    sourceText: "PDF Document Processing: Upload PDFs and extract text content\nDocument Isolation: Each PDF gets a unique collection in Qdrant vector database\nConversational Interface: Chat with your documents using natural language"
  },
  {
    question: "How does the vector store work?",
    answer: "The vector store uses Qdrant to store document embeddings for semantic search. It creates a unique collection per uploaded PDF and enables efficient similarity search to find relevant content when you ask questions.",
    sourceText: "Vector Store (Qdrant):\n- Stores document embeddings for semantic search\n- Creates a unique collection per uploaded PDF\n- Enables efficient similarity search"
  }
];

export default function InteractiveDemo() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [typing, setTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    if (activeQuestion >= 0) {
      // Reset and start typing effect
      setDisplayedAnswer('');
      setTyping(true);
      setShowSource(false);
      
      let i = 0;
      const answer = demoConversation[activeQuestion].answer;
      const typingInterval = setInterval(() => {
        if (i < answer.length) {
          setDisplayedAnswer(prev => prev + answer.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTyping(false);
          setTimeout(() => setShowSource(true), 500);
        }
      }, 20);
      
      return () => clearInterval(typingInterval);
    }
  }, [activeQuestion]);

  return (
    <div className="demo-container p-4 h-full flex flex-col">
      <div className="demo-header flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-gray-400">RAG PDF Assistant Demo</div>
      </div>
      
      <div className="demo-content flex-grow overflow-auto mb-4">
        <div className="flex mb-6">
          <div className="bg-gray-700 rounded-lg p-3 max-w-xs sm:max-w-sm ml-auto">
            <p className="text-white">{demoConversation[activeQuestion].question}</p>
          </div>
        </div>
        
        <div className="flex mb-2">
          <div className="bg-blue-600 rounded-lg p-3 max-w-xs sm:max-w-sm mr-auto">
            <p className="text-white">
              {displayedAnswer}
              {typing && <span className="typing-cursor">|</span>}
            </p>
          </div>
        </div>
        
        {showSource && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-400 mx-auto mb-4"
          >
            <div className="text-xs uppercase text-gray-500 mb-1">Source from document:</div>
            <p className="whitespace-pre-line">{demoConversation[activeQuestion].sourceText}</p>
          </motion.div>
        )}
      </div>
      
      <div className="demo-questions flex overflow-x-auto space-x-2 pb-2">
        {demoConversation.map((item, index) => (
          <button
            key={index}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
              activeQuestion === index 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setActiveQuestion(index)}
          >
            {item.question.length > 25 
              ? item.question.substring(0, 25) + '...' 
              : item.question}
          </button>
        ))}
      </div>
      
      <div className="demo-input mt-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Try asking a question..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 pr-10 text-white"
          />
          <button className="absolute right-3 top-3 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}