// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Send, Upload, FileText, X, Loader2, Bot, User } from "lucide-react";

// export default function Chat() {
//   const [message, setMessage] = useState("");
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
//     { role: "assistant", content: "Hello! Upload a PDF and ask me questions about it." }
//   ]);
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);
  
//   // Auto scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       // Add user message to chat
//       setMessages((prev) => [...prev, { role: "user", content: message }]);
      
//       // Clear input
//       setMessage("");
      


//       // In a real implementation, you would send this to your API
//       // For now, just show a placeholder response with typing effect
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev, 
//           { 
//             role: "assistant", 
//             content: "This is a placeholder response. In a real implementation, I would answer based on the PDF content."
//           }
//         ]);
//       }, 1000);
//     }
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log("entered function")
//     if (e.target.files && e.target.files.length > 0) {
//       setIsUploading(true);
//       console.log("Files uploaded:", e.target.files);
//       // Filter only PDF files
//       const pdfFiles = Array.from(e.target.files).filter(
//         file => file.type === "application/pdf"
//       );

// 			const file = e.target.files[0];
// 			const formData = new FormData();
// 			formData.append('pdf', file);
// 			await fetch('http://localhost:5000/api/upload/pdf', {
// 				method: 'POST',
// 				body: formData,
// 			})
// 			console.log("File uploaded successfully");
      
//       if (pdfFiles.length > 0) {
//         setUploadedFiles(prev => [...prev, ...pdfFiles]);
        
//         // Add system message about the upload
//         setMessages(prev => [
//           ...prev,
//           { 
//             role: "assistant", 
//             content: `I've received ${pdfFiles.length} PDF file${pdfFiles.length > 1 ? 's' : ''}. You can now ask questions about ${pdfFiles.length > 1 ? 'them' : 'it'}.`
//           }
//         ]);
//       }
//       setIsUploading(false);
//     }
//   };

//   const removeFile = (fileToRemove: File) => {
//     setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
    
//     // Add system message about the removal
//     setMessages(prev => [
//       ...prev,
//       { role: "assistant", content: `I've removed "${fileToRemove.name}" from the context.` }
//     ]);
//   };

//   return (
//     <div className="flex flex-col h-[calc(100vh-70px)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
//       {/* Chat header */}
//       <div className="border-b border-gray-200 dark:border-gray-800 py-3 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
//         <div className="max-w-3xl mx-auto flex items-center">
//           <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
//             <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//           </div>
//           <div>
//             <h1 className="font-medium text-gray-800 dark:text-gray-200">PDF Assistant</h1>
//             <p className="text-xs text-gray-500 dark:text-gray-400">Upload PDFs and ask questions</p>
//           </div>
//         </div>
//       </div>
      
//       {/* Chat container */}
//       <div className="flex-1 overflow-auto p-6 space-y-6 scrollbar-thin">
//         {messages.map((msg, index) => (
//           <div 
//             key={index} 
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} max-w-3xl mx-auto w-full group`}
//           >
//             <div className={`flex items-start gap-3 max-w-[85%]`}>
//               {msg.role === "assistant" && (
//                 <div className="w-8 h-8 mt-1 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
//                   <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                 </div>
//               )}
              
//               <div 
//                 className={`py-3 px-4 rounded-2xl ${
//                   msg.role === "user" 
//                     ? "bg-blue-600 text-white ml-auto"
//                     : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700"
//                 }`}
//               >
//                 {msg.content}
//               </div>
              
//               {msg.role === "user" && (
//                 <div className="w-8 h-8 mt-1 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
//                   <User className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Uploaded files */}
//       {uploadedFiles.length > 0 && (
//         <div className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3">
//           <div className="max-w-3xl mx-auto">
//             <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Document Context</h3>
//             <div className="flex flex-wrap gap-2">
//               {uploadedFiles.map((file, index) => (
//                 <div 
//                   key={index}
//                   className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm px-3 py-1.5 rounded-full"
//                 >
//                   <FileText className="w-4 h-4 mr-1.5" />
//                   <span className="max-w-[150px] truncate text-xs font-medium">{file.name}</span>
//                   <button 
//                     onClick={() => removeFile(file)}
//                     className="ml-1.5 text-blue-600/80 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                     aria-label="Remove file"
//                   >
//                     <X className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Message input and controls */}
//       <div className="border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6">
//         <form onSubmit={handleSubmit} className="flex gap-3 max-w-3xl mx-auto">
//           <label className="flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">
//             <input
//               type="file"
//               accept=".pdf"
//               className="hidden"
//               onChange={handleFileUpload}
//               multiple
//               disabled={isUploading}
//             />
//             {isUploading ? (
//               <Loader2 className="w-5 h-5 animate-spin" />
//             ) : (
//               <Upload className="w-5 h-5" />
//             )}
//           </label>
          
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Ask about your PDF..."
//               className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-600"
//               disabled={isUploading}
//             />
            
//             <button
//               type="submit"
//               disabled={!message.trim()}
//               className={`absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-full flex items-center justify-center transition-all ${
//                 !message.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//               }`}
//             >
//               <Send className="w-4 h-4" />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Upload, FileText, X, Loader2, Bot, User } from "lucide-react";
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
    { role: "assistant", content: "Hello! Upload a PDF and ask me questions about it." }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSubmitting) {
      // Add user message to chat
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      
      // Store the message and clear input
      const userQuestion = message;
      setMessage("");
      setIsSubmitting(true);

      try {
        // Send request to API
        const response = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ question: userQuestion })
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract the actual response content from the nested structure
        const assistantMessage = data.response?.kwargs?.content || 
          "Sorry, I couldn't process your request. Please try again.";
        
        // Add AI response to chat
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: assistantMessage }
        ]);
      } catch (error) {
        console.error("Error querying the API:", error);
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: "Sorry, I encountered an error while processing your request. Please try again."
          }
        ]);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      // Filter only PDF files
      const pdfFiles = Array.from(e.target.files).filter(
        file => file.type === "application/pdf"
      );

      try {
        // For each PDF file, upload to server
        for (const file of pdfFiles) {
          const formData = new FormData();
          formData.append('pdf', file);
          
          const response = await fetch('http://localhost:5000/api/upload/pdf', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }
        }
        
        if (pdfFiles.length > 0) {
          setUploadedFiles(prev => [...prev, ...pdfFiles]);
          
          // Add system message about the upload
          setMessages(prev => [
            ...prev,
            { 
              role: "assistant", 
              content: `I've processed ${pdfFiles.length} PDF file${pdfFiles.length > 1 ? 's' : ''}. You can now ask questions about the content.`
            }
          ]);
        }
      } catch (error) {
        console.error("Upload error:", error);
        setMessages(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: "Sorry, there was an error uploading your file. Please try again."
          }
        ]);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileToRemove));
    
    // Add system message about the removal
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: `I've removed "${fileToRemove.name}" from the context.` }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Chat header */}
      <div className="border-b border-gray-200 dark:border-gray-800 py-3 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="font-medium text-gray-800 dark:text-gray-200">PDF Assistant</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Upload PDFs and ask questions</p>
          </div>
        </div>
      </div>
      
      {/* Chat container */}
      <div className="flex-1 overflow-auto p-6 space-y-6 scrollbar-thin">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} max-w-3xl mx-auto w-full group`}
          >
            <div className={`flex items-start gap-3 max-w-[85%]`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 mt-1 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
              )}
              
              <div 
                className={`py-3 px-4 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700"
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
                          <div className="rounded-md overflow-hidden my-2">
                            <div className="bg-gray-800 dark:bg-gray-900 px-3 py-1.5 text-xs text-gray-400 border-b border-gray-700">
                              {match[1]}
                            </div>
                            <pre className="overflow-auto p-4 bg-gray-900 dark:bg-black text-sm">
                              <code className={`language-${match[1]}`} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ) : (
                          <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5" {...props}>
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
                <div className="w-8 h-8 mt-1 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        {isSubmitting && (
          <div className="flex justify-start max-w-3xl mx-auto w-full">
            <div className="flex items-start gap-3 max-w-[85%]">
              <div className="w-8 h-8 mt-1 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="py-3 px-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2">Document Context</h3>
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm px-3 py-1.5 rounded-full"
                >
                  <FileText className="w-4 h-4 mr-1.5" />
                  <span className="max-w-[150px] truncate text-xs font-medium">{file.name}</span>
                  <button 
                    onClick={() => removeFile(file)}
                    className="ml-1.5 text-blue-600/80 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Message input and controls */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-3xl mx-auto">
          <label className="flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
              multiple
              disabled={isUploading || isSubmitting}
            />
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </label>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your PDF..."
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-600"
              disabled={isUploading || isSubmitting}
            />
            
            <button
              type="submit"
              disabled={!message.trim() || isSubmitting}
              className={`absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-full flex items-center justify-center transition-all ${
                !message.trim() || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}