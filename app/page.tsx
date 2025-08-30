"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left side: Logo + Title */}
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <Image
                src="/logo12.png"
                alt="Grace Kennett Foundation Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="text-xl font-bold text-[#FF5C00] hover:text-white transition-colors">
                Grace Kennett Foundation
              </span>
            </div>

            {/* Right side: Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="hover:text-[#FF5C00] transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="hover:text-[#FF5C00] transition-colors"
              >
                My Progress
              </a>
              <a
                href="#"
                className="hover:text-[#FF5C00] transition-colors"
              >
                Certificates
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-[#FF5C00] animate-fadeInUp">
          Welcome to Grace Kennett Foundation Training Platform
        </h1>
        <p className="mt-4 text-gray-700">
          Learn, grow, and achieve your certifications with ease.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-6 mt-10 text-center">
        © {new Date().getFullYear()} Grace Kennett Foundation. All rights reserved.
      </footer>
    </div>
  );
}
