"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useProgress } from "@/lib/progress-context"
import { getAllModules } from "@/lib/module-registry"

export function DashboardContent() {
  const { progress, getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()
  const modules = getAllModules()

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTotalEstimatedTime = () => {
    return modules.reduce((total, module) => total + Number.parseInt(module.estimatedTime), 0)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Training Modules</h2>
        <p className="text-lg text-gray-600">Select a module to begin your medical training</p>
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

        {modules.map((module) => {
          const moduleProgress = progress[module.id] || { completed: false, attempts: 0 }
          const progressPercentage = moduleProgress.completed ? 100 : 0

          return (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl text-gray-900">
                        {module.icon} {module.title}
                      </CardTitle>
                      {moduleProgress.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <CardDescription className="text-base">{module.description}</CardDescription>
                  </div>
                  <Badge className={module.color.badge}>{module.category.replace("-", " ").toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Progress:{" "}
                      {moduleProgress.completed
                        ? `${module.questionCount}/${module.questionCount}`
                        : `0/${module.questionCount}`}{" "}
                      questions
                    </span>
                    <span>~{module.estimatedTime}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />

                  {/* Progress Details */}
                  {moduleProgress.completed && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-green-800 font-medium">
                            Best Score: {moduleProgress.bestScore || 0}%
                          </span>
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
                      <span>• {module.category.replace("-", " ")} training</span>
                      <span>• {module.passingScore}% to pass</span>
                    </div>
                    <Link href={module.route}>
                      <Button className={module.color.primary}>
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
