"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ResultsCardProps {
  score: number
  correctAnswers: number
  totalQuestions: number
  passed: boolean
  moduleName: string
  onRetake?: () => void
}

export function ResultsCard({ score, correctAnswers, totalQuestions, passed, moduleName, onRetake }: ResultsCardProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900">Assessment Complete!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-6xl font-bold mb-2 ${passed ? "text-green-600" : "text-red-600"}`}>{score}%</div>
          <p className="text-lg text-gray-600">
            You scored {correctAnswers} out of {totalQuestions} questions correctly
          </p>
        </div>

        <div
          className={`p-4 rounded-lg ${
            passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          <p className={`font-semibold ${passed ? "text-green-800" : "text-red-800"}`}>
            {passed
              ? `Congratulations! You have passed the ${moduleName}.`
              : "You need 80% or higher to pass. Please review the material and try again."}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/">
            <Button variant="outline">Return to Dashboard</Button>
          </Link>
          {!passed && onRetake && <Button onClick={onRetake}>Retake Assessment</Button>}
        </div>
      </CardContent>
    </Card>
  )
}
