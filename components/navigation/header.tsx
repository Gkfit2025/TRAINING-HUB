"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

interface HeaderProps {
  title?: string
  subtitle?: string
  moduleType?: "3zone" | "noradrenaline" | "sepsis"
}

const moduleConfig = {
  "3zone": {
    badge: "3Zone Training",
    badgeClass: "bg-blue-100 text-blue-800",
    color: "blue",
  },
  noradrenaline: {
    badge: "Noradrenaline Training",
    badgeClass: "bg-purple-100 text-purple-800",
    color: "purple",
  },
  sepsis: {
    badge: "Sepsis Guidelines 2024",
    badgeClass: "bg-red-100 text-red-800",
    color: "red",
  },
}

export function Header({ title, subtitle, moduleType }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isHomePage = pathname === "/"
  const config = moduleType ? moduleConfig[moduleType] : null

  return (
    <header className="shadow-sm border-b sticky top-0 z-50" style={{ backgroundColor: "#000000" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Logo fixed in the left side corner */}
        <div className="absolute left-0 top-0 h-16 flex items-center pl-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo12.png"
              alt="Logo"
              width={40}
              height={40}
              priority
              className=""
              style={{ borderRadius: "0px" }}
            />
          </Link>
        </div>
        <div className="flex items-center justify-between h-16 pl-16">
          {/* Left side - Title and breadcrumb */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              {isHomePage ? (
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Medical Training Platform
                  </h1>
                  <p className="text-sm hidden sm:block text-gray-300">
                    Hospital Staff Education Program
                  </p>
                </div>
              ) : (
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-white">
                    Medical Training Platform
                  </h1>
                </div>
              )}
            </Link>

            {/* Breadcrumb for non-home pages */}
            {!isHomePage && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-white">
                <span>/</span>
                <span className="text-white">
                  {title || "Training Module"}
                </span>
              </div>
            )}
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isHomePage ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/3zone"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/3zone") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              3Zone Training
            </Link>
            <Link
              href="/noradrenaline"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/noradrenaline") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Noradrenaline
            </Link>
            <Link
              href="/sepsis"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/sepsis") ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Sepsis Guidelines
            </Link>
          </nav>

          {/* Right side - Module badge and mobile menu */}
          <div className="flex items-center space-x-4">
            {config && (
              <Badge variant="secondary" className={`${config.badgeClass} hidden sm:inline-flex`}>
                {config.badge}
              </Badge>
            )}

            {!isHomePage && (
              <Link href="/" className="lg:hidden">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-white hover:bg-[#0d3c6c]">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-[#0d3c6c]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#0d3c6c]" style={{ backgroundColor: "#0B3559" }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isHomePage ? "bg-[#0d3c6c] text-white" : "text-gray-300 hover:text-white hover:bg-[#0d3c6c]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/3zone"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/3zone")
                    ? "bg-[#0d3c6c] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#0d3c6c]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                3Zone Training
              </Link>
              <Link
                href="/noradrenaline"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/noradrenaline")
                    ? "bg-[#0d3c6c] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#0d3c6c]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Noradrenaline Training
              </Link>
              <Link
                href="/sepsis"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/sepsis")
                    ? "bg-[#0d3c6c] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#0d3c6c]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sepsis Guidelines
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
