"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  Heart,
  Shield,
  Users,
  BookOpen,
  Award,
  Clock,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  AlertTriangle,
  Brain,
  Activity,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  useEffect(() => {
    for (let i = 0; i < 25; i++) {
      let particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "vw"
      particle.style.animationDuration = 5 + Math.random() * 10 + "s"
      particle.style.animationDelay = Math.random() * 10 + "s"
      document.body.appendChild(particle)
    }

    return () => {
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle) => particle.remove())
    }
  }, [])

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#fff" }}>
      <style jsx>{`
        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #00e0ff;
          border-radius: 50%;
          opacity: 0.7;
          animation: floatUp 10s linear infinite;
          z-index: 1;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) scale(1);
            opacity: 0;
          }
        }

        .badge-animation {
          animation: fadeIn 1s ease-out, gentlePulse 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gentlePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo12.png"
                  alt="Grace Kennett Foundation Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  priority
                />
                <span className="text-xl font-bold" style={{ color: "#FF5C00" }}>
                  Grace Kennett Foundation
                </span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-[#FF5C00] transition-colors">
                  Dashboard
                </a>
                <a href="#" className="hover:text-[#FF5C00] transition-colors">
                  My Progress
                </a>
                <a href="#" className="hover:text-[#FF5C00] transition-colors">
                  Certificates
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        {/* ... (same content as your original hero + sections) ... */}

        {/* Reduced Footer with #2D4EF0 font color */}
        <footer className="border-t py-8" style={{ backgroundColor: "#ABFA8F" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Logo + Title */}
              <div className="flex items-center justify-center mb-4">
                <img
                  src="logo12.png"
                  alt="Grace Kennett Foundation Logo"
                  className="h-10 w-10 mr-2"
                />
                <span className="text-xl font-bold" style={{ color: "#2D4EF0" }}>
                  Grace Kennett Foundation
                </span>
              </div>

              {/* WhatsApp Contact */}
              <p className="mb-4 text-base" style={{ color: "#2D4EF0" }}>
                For suggestions WhatsApp GKF-IT Team at +91 9842194442
              </p>

              {/* License Info */}
              <div
                className="flex items-center justify-center space-x-2 text-sm mb-3"
                style={{ color: "#2D4EF0" }}
              >
                <img
                  src="logo12.png"
                  alt="Grace Kennett Foundation Logo"
                  className="h-4 w-4"
                />
                <span>
                  License 4.0 • Grace Kennett Foundation Hospital, 8, Kennett Road,
                  Madurai, Tamil Nadu, India
                </span>
              </div>

              {/* Copyright */}
              <p className="text-xs opacity-90" style={{ color: "#2D4EF0" }}>
                © 2025 Grace Kennett Foundation. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
