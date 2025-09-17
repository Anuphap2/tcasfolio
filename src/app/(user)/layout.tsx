"use client";

import Link from "next/link";

import "../globals.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div
      className={`antialiased bg-gray-50 text-gray-800 min-h-screen flex flex-col`}
    >
      {/* Navbar Header */}
      <header className="bg-white p-4 md:p-6 shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700">
            TCASFOLIO
          </h1>
          <nav className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/"
              className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors shadow-md"
            >
              ออกจากระบบ
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content with subtle padding and margin */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-500 text-center p-4 mt-auto border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-sm">
          &copy; {new Date().getFullYear()} TCASFOLIO. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
