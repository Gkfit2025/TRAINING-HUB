"use client"

import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle, Trophy, Target, ArrowRight, LogOut } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/lib/progress-context"

// Custom Header component with updated styles and logout button
const CustomHeader = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-transparent">
      <nav className="flex items-center space-x-6">
        <Link href="/dashboard" className="text-white text-[13px] font-medium" style={{ fontFamily: "Arial" }}>
          Dashboard
        </Link>
        <Link href="/3zone-training" className="text-white text-[13px] font-medium" style={{ fontFamily: "Arial" }}>
          3Zone Training
        </Link>
        <Link href="/noradrenaline" className="text-white text-[13px] font-medium" style={{ fontFamily: "Arial" }}>
          Noradrenaline
        </Link>
        <Link href="/sepsis-guidelines" className="text-white text-[13px] font-medium" style={{ fontFamily: "Arial" }}>
          Sepsis Guidelines
        </Link>
      </nav>
      <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => console.log("Logout clicked")}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </header>
  )
}

export default function HomePage() {
  const { getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hospital1.png')",
        }}
      />

      <div className="relative z-10">
        {/* Replace the old Header component with the new CustomHeader */}
        <CustomHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Title and Button */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in" style={{ color: "#004030" }}>
                Medical Training Hub
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mb-8 drop-shadow">
                Complete your required medical training modules and track your progress
              </p>
              <Link href="/modules">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg shadow-lg">
                  View Training Modules
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Right side - Stats Cards */}
            <div className="flex-1 max-w-md">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Total Modules</p>
                      <p className="text-2xl font-bold text-gray-900">{overallProgress.totalModules}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{overallProgress.completedModules}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{overallProgress.completionRate}%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {overallProgress.averageScore > 0 ? `${overallProgress.averageScore}%` : "--"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
