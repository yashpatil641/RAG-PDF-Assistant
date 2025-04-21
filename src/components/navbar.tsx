"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { FileText, MessageCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: "Chat", href: "/chat", icon: <MessageCircle className="w-4 h-4 mr-2" /> },
  ];

  const isActive = (path: string) => pathname === path;

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 dark:bg-gray-900/90 py-3 shadow-md" 
        : "bg-white/70 dark:bg-gray-900/70 py-5"
    }`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight text-blue-600 dark:text-blue-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          PDF Assistant
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                isActive(item.href)
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              } text-sm transition-colors duration-200 flex items-center`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          {/* Authentication UI */}
          <div className="flex items-center gap-3 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors duration-200">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }} 
              />
            </SignedIn>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }} 
            />
          </SignedIn>
          <button
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg animate-slideDown">
          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-300"
                } px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {/* Authentication UI for mobile */}
            <SignedOut>
              <div className="flex flex-col px-6 py-4 space-y-3 border-t border-gray-100 dark:border-gray-800">
                <SignInButton mode="modal">
                  <button className="w-full text-left text-gray-600 dark:text-gray-300 py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;