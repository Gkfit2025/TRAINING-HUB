"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, ChevronRight, CheckCircle, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/lib/progress-context"

const moduleConfig = {
  "3zone": {
    title: "3Zone Deep Clean Assessment",
    description:
      "Hospital Cleaning Protocol Training - Learn the essential 3-zone cleaning methodology to reduce infection risk and maintain professional standards.",
    badge: "Fundamentals",
    badgeClass: "bg-blue-100 text-blue-800",
    buttonClass: "bg-blue-600 hover:bg-blue-700",
    topics: ["Infection Control", "Safety Protocols", "Best Practices"],
    questions: 5,
    estimatedTime: 15,
    href: "/3zone",
  },
  noradrenaline: {
    title: "Noradrenaline Training",
    description:
      "Critical medication administration training covering dosing, safety protocols, and clinical guidelines for noradrenaline administration.",
    badge: "Critical Care",
    badgeClass: "bg-purple-100 text-purple-800",
    buttonClass: "bg-purple-600 hover:bg-purple-700",
    topics: ["Dosage Calculations", "Safety Protocols", "Administration Routes"],
    questions: 6,
    estimatedTime: 15,
    href: "/noradrenaline",
  },
  sepsis: {
    title: "Sepsis Guidelines 2024",
    description:
      "Comprehensive assessment on the latest sepsis management protocols based on Surviving Sepsis Campaign, CDC Core Elements, and WHO Updates.",
    badge: "Emergency Care",
    badgeClass: "bg-red-100 text-red-800",
    buttonClass: "bg-red-600 hover:bg-red-700",
    topics: ["Fluid Resuscitation", "Antibiotic Protocols", "WHO Guidelines"],
    questions: 8,
    estimatedTime: 20,
    href: "/sepsis",
  },
}

export function DashboardContent() {
  const { progress, getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTotalEstimatedTime = () => {
    return Object.values(moduleConfig).reduce((total, config) => total + config.estimatedTime, 0)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Training Dashboard</h2>
        <p className="text-lg text-gray-600">Complete your required medical training modules and track your progress</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Modules</p>
                <p className="text-3xl font-bold text-gray-900">{overallProgress.totalModules}</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{overallProgress.completedModules}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{overallProgress.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">
                  {overallProgress.averageScore > 0 ? `${overallProgress.averageScore}%` : "--"}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress Bar */}
      {overallProgress.completionRate > 0 && (
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
                <p className="text-sm text-gray-600">
                  {overallProgress.completedModules} of {overallProgress.totalModules} modules completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{overallProgress.completionRate}%</p>
              </div>
            </div>
            <Progress value={overallProgress.completionRate} className="h-3" />
          </CardContent>
        </Card>
      )}

      {/* Training Modules */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Available Training Modules</h3>

        {Object.entries(moduleConfig).map(([moduleId, config]) => {
          const moduleProgress = progress[moduleId as keyof typeof progress]
          const progressPercentage = moduleProgress.completed ? 100 : 0

          return (
            <Card key={moduleId} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-gray-900">{config.title}</CardTitle>
                      {moduleProgress.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <CardDescription className="text-base">{config.description}</CardDescription>
                  </div>
                  <Badge className={config.badgeClass}>{config.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Progress:{" "}
                      {moduleProgress.completed ? `${config.questions}/${config.questions}` : `0/${config.questions}`}{" "}
                      questions
                    </span>
                    <span>~{config.estimatedTime} minutes</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />

                  {/* Progress Details */}
                  {moduleProgress.completed && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-green-800 font-medium">Best Score: {moduleProgress.bestScore}%</span>
                          <span className="text-green-700">Attempts: {moduleProgress.attempts}</span>
                          {moduleProgress.completedAt && (
                            <span className="text-green-700">Completed: {formatDate(moduleProgress.completedAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      {config.topics.map((topic, index) => (
                        <span key={index}>• {topic}</span>
                      ))}
                    </div>
                    <Link href={config.href}>
                      <Button className={config.buttonClass}>
                        {moduleProgress.completed ? "Review Training" : "Start Training"}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Important Notice */}
      <Card className="mt-8 bg-orange-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-orange-900 mb-1">Important Notice</h4>
              <p className="text-orange-800">
                These assessments cover critical safety information for hospital staff. Please review all questions
                carefully and consult hospital protocols for clinical practice. All modules must be completed for
                certification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
