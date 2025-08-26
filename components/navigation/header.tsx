"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

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
    <>
      {/* Header with custom background color */}
      <header className="bg-[#0099ff] shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and title */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white">
                  <Image
                    src="/logo14.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain w-10 h-10"
                    priority
                  />
                </div>
                {/* GRACE KENNETT FOUNDATION as main title */}
                <div className="hidden sm:block">
                  <h1
                    className="text-xl font-bold"
                    style={{
                      color: "#FFA500",
                      fontFamily: "Bookman Old Style, serif",
                    }}
                  >
                    GRACE KENNETT FOUNDATION
                  </h1>
                  {/* Removed subtitle as instructed */}
                </div>
              </Link>
              {/* Breadcrumb for non-home pages */}
              {!isHomePage && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-white-500">
                  <span>/</span>
                  <span className="text-gray-900">{title || "Training Module"}</span>
                </div>
              )}
            </div>

            {/* Center - Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                  isHomePage ? "text-white-900" : "text-gray-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/3zone"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname.startsWith("/3zone") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                3Zone Training
              </Link>
              <Link
                href="/noradrenaline"
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  pathname.startsWith("/noradrenaline") ? "text-purple-600" : "text-gray-700"
                }`}
              >
                Noradrenaline
              </Link>
              <Link
                href="/sepsis"
                className={`text-sm font-medium transition-colors hover:text-red-600 ${
                  pathname.startsWith("/sepsis") ? "text-red-600" : "text-gray-700"
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
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>
              )}

              {/* Mobile menu button */}
              <Button
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isHomePage ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/3zone"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname.startsWith("/3zone")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  3Zone Training
                </Link>
                <Link
                  href="/noradrenaline"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname.startsWith("/noradrenaline")
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Noradrenaline Training
                </Link>
                <Link
                  href="/sepsis"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname.startsWith("/sepsis")
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700 hover:text-red-600 hover:bg-red-50"
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
      {/* The bottom fixed text has been removed as requested */}
    </>
  )
}
