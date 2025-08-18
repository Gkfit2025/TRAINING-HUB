"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

interface ModuleOverviewProps {
  title: string
  subtitle: string
  description: string
  questionsCount: number
  passingScore: number
  estimatedTime: number
  topics: string[]
  onStart: () => void
  buttonColor?: string
  topicColor?: string
  icon?: React.ReactNode
}

export function ModuleOverview({
  title,
  subtitle,
  description,
  questionsCount,
  passingScore,
  estimatedTime,
  topics,
  onStart,
  buttonColor = "bg-teal-600 hover:bg-teal-700",
  topicColor = "bg-gray-100 text-gray-800",
  icon,
}: ModuleOverviewProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        {icon && (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">{icon}</div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>

      {/* Assessment Overview Card */}
      <Card className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900">Assessment Overview</CardTitle>
          <p className="text-gray-600 mt-2">{description}</p>
        </CardHeader>
        <CardContent>
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white rounded-lg border border-teal-100">
              <div className="text-3xl font-bold text-gray-900 mb-1">{questionsCount}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-100">
              <div className="text-3xl font-bold text-gray-900 mb-1">{passingScore}%</div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-teal-100">
              <div className="text-3xl font-bold text-gray-900 mb-1">~{estimatedTime}</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics Covered:</h3>
            <div className="grid grid-cols-2 gap-3">
              {topics.map((topic, index) => (
                <Badge key={index} className={`${topicColor} justify-center py-2`}>
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-orange-900 mb-1">Important Notice</h4>
                <p className="text-orange-800 text-sm">
                  This assessment covers critical safety information. Please review all questions carefully and consult
                  hospital protocols for clinical practice.
                </p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Button onClick={onStart} className={`${buttonColor} px-8 py-3 text-lg`}>
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
