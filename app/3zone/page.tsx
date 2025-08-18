"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/navigation/header"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useProgress } from "@/lib/progress-context"

const questions = [
  {
    id: 1,
    category: "Fundamentals",
    question: "Why is it important to follow the 3-Zone Cleaning Method?",
    options: [
      "It saves time",
      "It reduces noise in the ward",
      "It lowers infection risk",
      "It looks more professional",
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    category: "Fundamentals",
    question: "What are the three zones in the 3-Zone Cleaning Method?",
    options: [
      "Clean, Dirty, Sterile",
      "High-risk, Medium-risk, Low-risk",
      "Patient area, Staff area, Public area",
      "Morning, Afternoon, Evening",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    category: "Application",
    question: "Which zone requires the most frequent cleaning?",
    options: ["Low-risk zone", "Medium-risk zone", "High-risk zone", "All zones equally"],
    correctAnswer: 2,
  },
  {
    id: 4,
    category: "Safety",
    question: "What should you do before moving from a high-risk to low-risk zone?",
    options: ["Change gloves and sanitize hands", "Take a break", "Document the cleaning", "Check the time"],
    correctAnswer: 0,
  },
  {
    id: 5,
    category: "Equipment",
    question: "How should cleaning equipment be managed between zones?",
    options: [
      "Use the same equipment for all zones",
      "Use separate color-coded equipment for each zone",
      "Clean equipment only at the end of shift",
      "Share equipment between staff members",
    ],
    correctAnswer: 1,
  },
]

export default function ThreeZoneTraining() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const { updateProgress } = useProgress()

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const handleComplete = () => {
    const score = calculateScore()
    const passed = score >= 80

    updateProgress("3zone", {
      completed: passed,
      score: score,
    })

    setShowResults(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    const score = calculateScore()
    const passed = score >= 80

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header moduleType="3zone" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "3Zone Training" }, { label: "Results" }]} />
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Assessment Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${passed ? "text-green-600" : "text-red-600"}`}>{score}%</div>
                <p className="text-lg text-gray-600">
                  You scored{" "}
                  {selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of{" "}
                  {questions.length} questions correctly
                </p>
              </div>

              <div
                className={`p-4 rounded-lg ${passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <p className={`font-semibold ${passed ? "text-green-800" : "text-red-800"}`}>
                  {passed
                    ? "Congratulations! You have passed the 3Zone Deep Clean Assessment."
                    : "You need 80% or higher to pass. Please review the material and try again."}
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Link href="/">
                  <Button variant="outline">Return to Dashboard</Button>
                </Link>
                {!passed && (
                  <Button
                    onClick={() => {
                      setCurrentQuestion(0)
                      setSelectedAnswers([])
                      setShowResults(false)
                    }}
                  >
                    Retake Assessment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header moduleType="3zone" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "3Zone Training" }, { label: `Question ${currentQuestion + 1}` }]} />
        <Card className="mb-8">
          <CardHeader>
            <Badge className="w-fit bg-blue-100 text-blue-800 mb-4">{questions[currentQuestion].category}</Badge>
            <CardTitle className="text-xl text-gray-900">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <span>{currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
