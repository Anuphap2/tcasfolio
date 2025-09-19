"use client";

import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-100 min-h-screen flex flex-col`}
    >
      {/* Navbar */}
      <nav className="bg-white text-gray-800 p-4 md:p-6 shadow-lg border-b border-gray-200 sticky top-0 z-50 animate-fadeInDown">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-800">
            TCASFOLIO
          </h1>
          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 transition-colors font-semibold text-lg hover:scale-105 duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm hover:scale-105 duration-200"
            >
              ออกจากระบบ
            </Link>
          </nav>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 animate-fadeInUp">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-500 text-center p-4 mt-auto border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          &copy; {new Date().getFullYear()} TCASFOLIO. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
