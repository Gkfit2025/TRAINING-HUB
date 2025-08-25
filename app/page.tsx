"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Menu, X, LogOut, FlaskConical, Droplet, HeartPulse } from "lucide-react";

// The Button component from "@/components/ui/button"
function Button({ variant, size, className, children, ...props }) {
  // A simplified version of the Button component for demonstration
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default} ${className || ""}`;
  return <button className={classes} {...props}>{children}</button>;
}

// The Badge component from "@/components/ui/badge"
function Badge({ variant, className, children, ...props }) {
  // A simplified version of the Badge component
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variantClasses = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className || ""}`;
  return <div className={classes} {...props}>{children}</div>;
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  moduleType?: "3zone" | "noradrenaline" | "sepsis";
}

const moduleConfig = {
  "3zone": {
    badge: "3Zone Training",
    badgeClass: "bg-gray-100 text-gray-800",
    color: "gray",
  },
  noradrenaline: {
    badge: "Noradrenaline Training",
    badgeClass: "bg-gray-100 text-gray-800",
    color: "gray",
  },
  sepsis: {
    badge: "Sepsis Guidelines 2024",
    badgeClass: "bg-gray-100 text-gray-800",
    color: "gray",
  },
};

export function Header({ title, subtitle, moduleType }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = pathname === "/";
  const config = moduleType ? moduleConfig[moduleType] : null;

  return (
    <>
      {/* Header with custom background color */}
      <header className="bg-[#67C090] shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and title */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white">
                  <Image
                    src="/logo11.png"
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
                </div>
              </Link>
              {/* Breadcrumb for non-home pages */}
              {!isHomePage && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-800">
                  <span>/</span>
                  <span className="text-gray-900">{title || "Training Module"}</span>
                </div>
              )}
            </div>

            {/* Center - Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isHomePage ? "text-white" : "text-gray-900"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/3zone"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-white ${
                  pathname.startsWith("/3zone") ? "text-gray-900" : "text-gray-900"
                }`}
              >
                <FlaskConical className="h-4 w-4" />
                <span>3Zone Training</span>
              </Link>
              <Link
                href="/noradrenaline"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-white ${
                  pathname.startsWith("/noradrenaline") ? "text-gray-900" : "text-gray-900"
                }`}
              >
                <Droplet className="h-4 w-4" />
                <span>Noradrenaline</span>
              </Link>
              <Link
                href="/sepsis"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-white ${
                  pathname.startsWith("/sepsis") ? "text-gray-900" : "text-gray-900"
                }`}
              >
                <HeartPulse className="h-4 w-4" />
                <span>Sepsis Guidelines</span>
              </Link>
            </nav>

            {/* Right side - Module badge and mobile menu */}
            <div className="flex items-center space-x-4">
              {config && (
                <Badge variant="secondary" className={`${config.badgeClass} hidden sm:inline-flex`}>
                  {config.badge}
                </Badge>
              )}

              {/* Logout button */}
              <Link href="/api/auth/logout">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-800 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </Link>

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
                    isHomePage ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  } flex items-center space-x-2`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FlaskConical className="h-5 w-5" />
                  <span>3Zone Training</span>
                </Link>
                <Link
                  href="/noradrenaline"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname.startsWith("/noradrenaline")
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  } flex items-center space-x-2`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Droplet className="h-5 w-5" />
                  <span>Noradrenaline Training</span>
                </Link>
                <Link
                  href="/sepsis"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    pathname.startsWith("/sepsis")
                      ? "bg-red-50 text-red-600"
                      : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                  } flex items-center space-x-2`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HeartPulse className="h-5 w-5" />
                  <span>Sepsis Guidelines</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
