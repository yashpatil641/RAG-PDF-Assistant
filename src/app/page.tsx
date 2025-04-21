import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="py-20 flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
            Converse with your documents intelligently
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Upload your PDFs and get instant, accurate answers through natural conversation. 
            No more endless scrolling through pages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/chat" 
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Start chatting
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#how-it-works" 
              className="px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium transition-colors duration-200"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Upload PDF</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply upload your PDF document to our secure platform.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Instant Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system quickly analyzes and indexes your document content.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Chat Away</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ask questions naturally and get accurate answers based on your document.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600/80 dark:bg-blue-800/50 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to chat with your documents?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Experience a new way to interact with your PDFs
          </p>
          <Link 
            href="/chat" 
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors duration-200"
          >
            Get Started Now
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-50 dark:bg-gray-900 text-center text-gray-600 dark:text-gray-400 text-sm px-4">
        <p>© {new Date().getFullYear()} PDF Assistant. All rights reserved.</p>
      </footer>
    </div>
  );
}