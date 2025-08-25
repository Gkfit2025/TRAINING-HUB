"use client"

import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle, Trophy, Target, MessageSquare, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/lib/progress-context"

export default function HomePage() {
  const { getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg2.png')",
        }}
      />

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
            {/* Left side - Title and Button */}
            <div className="flex-1 text-center lg:text-left">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg animate-fade-in"
                style={{ color: "#004030" }}
              >
                Medical Training Hub
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-xl sm:max-w-2xl mb-6 sm:mb-8 drop-shadow">
                Complete your required medical training modules and track your progress
              </p>
              <Link href="/modules">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg shadow-lg"
                >
                  View Training Modules
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>

            {/* Right side - Stats Cards */}
            <div className="flex-1 max-w-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Total Modules</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{overallProgress.totalModules}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{overallProgress.completedModules}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Target className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{overallProgress.completionRate}%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Average Score</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        {overallProgress.averageScore > 0 ? `${overallProgress.averageScore}%` : "--"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        {/* Logo and Grace Kennett Foundation Text */}
        <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 flex items-center space-x-2 bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-xl">
          <img
            src="/logo.png"
            alt="Grace Kennett Foundation Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            onError={(e) => (e.currentTarget.src = "/fallback-logo.png")} // Fallback if logo.png fails
          />
          <p className="text-xs sm:text-sm font-medium text-gray-900">Grace Kennett Foundation</p>
        </div>
      </div>
    </div>
  )
}
