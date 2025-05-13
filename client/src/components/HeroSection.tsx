"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveDemo from './InteractiveDemo';

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Chat with Your PDFs
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8">
            Ask questions, get instant answers from your documents
          </h2>
          <p className="text-gray-400 mb-10 text-lg">
            Upload your PDF files and start a conversation. Our AI assistant will find the relevant information and provide accurate answers based on your document content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition transform hover:scale-105">
              Upload Your First PDF
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
        >
          <InteractiveDemo />
        </motion.div>
      </div>
    </section>
  );
}