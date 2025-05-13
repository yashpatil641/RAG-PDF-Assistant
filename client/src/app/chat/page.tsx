"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Upload, FileText, X, Loader2, Bot, User, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';

export default function Chat() {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Upload a PDF document and ask me anything about it." }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSubmitting) {
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      const userQuestion = message;
      setMessage("");
      setIsSubmitting(true);

      try {
        const response = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userQuestion })
        });

        if (!response.ok) throw new Error(`Server responded with status: ${response.status}`);
        const data = await response.json();
        const assistantMessage = data.response?.kwargs?.content || 
          "I couldn't process your request. Please try again.";
        
        setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: "Sorry, I encountered an error while processing your request." }
        ]);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const pdfFiles = Array.from(e.target.files).filter(file => file.type === "application/pdf");

      try {
        for (const file of pdfFiles) {
          const formData = new FormData();
          formData.append('pdf', file);
          const response = await fetch('http://localhost:5000/api/upload/pdf', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) throw new Error(`Failed to upload ${file.name}`);
        }
        
        if (pdfFiles.length > 0) {
          setUploadedFiles(prev => [...prev, ...pdfFiles]);
          setMessages(prev => [
            ...prev,
            { role: "assistant", content: `PDF${pdfFiles.length > 1 ? 's' : ''} processed successfully.` }
          ]);
        }
      } catch (error) {
        console.error("Upload error:", error);
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: "Upload failed. Please try again." }
        ]);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: `Removed "${fileToRemove.name}" from context.` }
    ]);
  };

  const clearAllFiles = () => {
    if (uploadedFiles.length > 0) {
      setUploadedFiles([]);
      setMessages(prev => [...prev, { role: "assistant", content: "All documents removed from context." }]);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] bg-neutral-50 dark:bg-neutral-950">
      {/* Header with file upload */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center">
          {uploadedFiles.length > 0 && (
            <button 
              onClick={clearAllFiles}
              className="mr-3 p-2 rounded-md text-neutral-500 hover:text-red-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              title="Clear all documents"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={triggerFileUpload}
            disabled={isUploading}
            className={`flex items-center space-x-2 py-2 px-3 rounded-md border border-neutral-200 dark:border-neutral-800 ${
              isUploading ? 'opacity-50' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            } transition-colors`}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-neutral-500 dark:text-neutral-400" />
            ) : (
              <Upload className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            )}
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {uploadedFiles.length > 0 ? `${uploadedFiles.length} PDF${uploadedFiles.length > 1 ? 's' : ''}` : 'Upload PDF'}
            </span>
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
            multiple
            disabled={isUploading}
          />
        </div>
      </div>
      
      {/* Chat messages area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] group`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 mt-1 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                
                <div 
                  className={`py-3 px-4 rounded-lg ${
                    msg.role === "user" 
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shadow-sm border border-neutral-200 dark:border-neutral-800"
                  } ${msg.role === "assistant" ? "prose prose-sm dark:prose-invert max-w-none" : ""}`}
                >
                  {msg.role === "user" ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <div className="rounded-md overflow-hidden my-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                              <div className="bg-neutral-200 dark:bg-neutral-800 px-3 py-1 text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                                <span>{match[1]}</span>
                              </div>
                              <pre className="overflow-auto p-4 bg-neutral-100 dark:bg-neutral-900 text-sm">
                                <code className={`language-${match[1]}`} {...props}>
                                  {children}
                                </code>
                              </pre>
                            </div>
                          ) : (
                            <code className="bg-neutral-100 dark:bg-neutral-800 rounded px-1 py-0.5 text-xs" {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
                
                {msg.role === "user" && (
                  <div className="w-8 h-8 mt-1 rounded-md bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isSubmitting && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 mt-1 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="py-3 px-4 rounded-lg bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 flex items-center">
                  <span className="flex space-x-1">
                    <span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Uploaded files chips */}
      {uploadedFiles.length > 0 && (
        <div className="px-6 py-3 flex items-center overflow-x-auto whitespace-nowrap border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex space-x-2">
            {uploadedFiles.map((file, index) => (
              <div 
                key={index}
                className="flex items-center bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs px-3 py-1.5 rounded-md shadow-sm border border-neutral-200 dark:border-neutral-700"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5 text-indigo-500 dark:text-indigo-400" />
                <span className="max-w-[100px] truncate">{file.name}</span>
                <button 
                  onClick={() => removeFile(file)}
                  className="ml-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  aria-label="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about the PDF content..."
              className="flex-1 px-4 py-3 bg-transparent text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 outline-none"
              disabled={isUploading || isSubmitting}
            />
            
            <button
              type="submit"
              disabled={!message.trim() || isSubmitting}
              className={`p-3 mx-1 rounded-md ${
                !message.trim() || isSubmitting 
                  ? 'text-neutral-400 dark:text-neutral-600' 
                  : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
              } transition-colors`}
              aria-label="Send message"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}