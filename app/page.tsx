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
    <header className="shadow-sm border-b sticky top-0 z-50" style={{ backgroundColor: "#050505" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Logo fixed in the left side corner */}
        <div className="absolute left-0 top-0 h-16 flex items-center pl-2">
          <Link href="/" className="flex items-center">
            {/* Remove any rounded styling, keep original aspect */}
            <Image
              src="/logo12.png"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="" // No rounded, border, or overflow classes
              style={{ borderRadius: "0px" }} // Explicitly no border-radius
            />
          </Link>
        </div>
        <div className="flex items-center justify-between h-16 pl-16">
          {/* Left side - Title and breadcrumb (logo is now handled above) */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              {/* Hide logo here, as it's now fixed in the corner */}
              {isHomePage ? (
                <div>
                  <h1 className="text-xl font-bold" style={{ color: "#ED4209" }}>
                    Medical Training Platform
                  </h1>
                  <p className="text-sm hidden sm:block" style={{ color: "#ED4209" }}>
                    Hospital Staff Education Program
                  </p>
                </div>
              ) : (
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold" style={{ color: "#ED4209" }}>
                    Medical Training Platform
                  </h1>
                </div>
              )}
            </Link>

            {/* Breadcrumb for non-home pages */}
            {!isHomePage && (
              <div className="hidden md:flex items-center space-x-2 text-sm" style={{ color: "#ED4209" }}>
                <span>/</span>
                <span className="" style={{ color: "#ED4209" }}>
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
                isHomePage ? "text-white" : "text-gray-400"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/3zone"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname.startsWith("/3zone") ? "text-blue-600" : "text-gray-400"
              }`}
            >
              3Zone Training
            </Link>
            <Link
              href="/noradrenaline"
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                pathname.startsWith("/noradrenaline") ? "text-purple-600" : "text-gray-400"
              }`}
            >
              Noradrenaline
            </Link>
            <Link
              href="/sepsis"
              className={`text-sm font-medium transition-colors hover:text-red-600 ${
                pathname.startsWith("/sepsis") ? "text-red-600" : "text-gray-400"
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
                <Button variant="ghost" size="sm" className="flex items-center space-x-2" style={{ color: "#ED4209" }}>
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "#ED4209" }}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t" style={{ backgroundColor: "#050505" }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isHomePage ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/3zone"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/3zone")
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-blue-600 hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                3Zone Training
              </Link>
              <Link
                href="/noradrenaline"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/noradrenaline")
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-purple-600 hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Noradrenaline Training
              </Link>
              <Link
                href="/sepsis"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/sepsis")
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-red-600 hover:bg-gray-800"
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
