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
    <header className="bg-black text-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo */}
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
            
            {/* Title */}
            <Link href="/" className="flex items-center space-x-3">
              {isHomePage ? (
                <div>
                  <h1 className="text-xl font-bold text-orange-500">
                    Medical Training Platform
                  </h1>
                  <p className="text-sm hidden sm:block text-orange-400">
                    Hospital Staff Education Program
                  </p>
                </div>
              ) : (
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold text-orange-500">
                    Medical Training Platform
                  </h1>
                </div>
              )}
            </Link>

            {/* Breadcrumb for non-home pages */}
            {!isHomePage && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-orange-500">
                <span>/</span>
                <span className="text-orange-500">
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
                isHomePage ? "text-orange-500" : "text-orange-400 hover:text-orange-500"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/3zone"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/3zone") ? "text-orange-500" : "text-orange-400 hover:text-orange-500"
              }`}
            >
              3Zone Training
            </Link>
            <Link
              href="/noradrenaline"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/noradrenaline") ? "text-orange-500" : "text-orange-400 hover:text-orange-500"
              }`}
            >
              Noradrenaline
            </Link>
            <Link
              href="/sepsis"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/sepsis") ? "text-orange-500" : "text-orange-400 hover:text-orange-500"
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
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-orange-500 hover:bg-gray-800">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden text-orange-500 hover:bg-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 bg-black mt-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  isHomePage ? "bg-gray-800 text-orange-500" : "text-orange-400 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/3zone"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/3zone")
                    ? "bg-gray-800 text-orange-500"
                    : "text-orange-400 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                3Zone Training
              </Link>
              <Link
                href="/noradrenaline"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/noradrenaline")
                    ? "bg-gray-800 text-orange-500"
                    : "text-orange-400 hover:text-orange-500 hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Noradrenaline Training
              </Link>
              <Link
                href="/sepsis"
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname.startsWith("/sepsis")
                    ? "bg-gray-800 text-orange-500"
                    : "text-orange-400 hover:text-orange-500 hover:bg-gray-800"
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
