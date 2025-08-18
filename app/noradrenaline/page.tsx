"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/navigation/header"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useProgress } from "@/lib/progress-context"

const questions = [
  {
    id: 1,
    category: "Concentration & Dilution",
    question: "What is the standard concentration of noradrenaline for IV infusion?",
    options: ["1 mg/ml", "4 mg/ml", "8 mg/ml", "16 mg/ml"],
    correctAnswer: 1,
  },
  {
    id: 2,
    category: "Dosage Calculations",
    question: "For a 70kg patient, what is the typical starting dose of noradrenaline?",
    options: ["0.01-0.03 mcg/kg/min", "0.05-0.1 mcg/kg/min", "0.1-0.3 mcg/kg/min", "0.5-1 mcg/kg/min"],
    correctAnswer: 0,
  },
  {
    id: 3,
    category: "Administration Routes",
    question: "Which route is preferred for noradrenaline administration?",
    options: ["Peripheral IV", "Central venous catheter", "Intramuscular", "Subcutaneous"],
    correctAnswer: 1,
  },
  {
    id: 4,
    category: "Safety Protocols",
    question: "What is the most serious complication of noradrenaline extravasation?",
    options: ["Mild irritation", "Temporary discoloration", "Tissue necrosis", "Allergic reaction"],
    correctAnswer: 2,
  },
  {
    id: 5,
    category: "Maximum Doses",
    question: "What is considered the maximum safe dose of noradrenaline?",
    options: ["1-2 mcg/kg/min", "2-3 mcg/kg/min", "3-5 mcg/kg/min", "No established maximum"],
    correctAnswer: 0,
  },
  {
    id: 6,
    category: "Clinical Guidelines",
    question: "How frequently should blood pressure be monitored during noradrenaline infusion?",
    options: ["Every 30 minutes", "Every 15 minutes", "Every 5-10 minutes", "Continuously"],
    correctAnswer: 3,
  },
]

export default function NoradrenalineTraining() {
  const [showOverview, setShowOverview] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const { updateProgress } = useProgress()

  const handleStartAssessment = () => {
    setShowOverview(false)
  }

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

    updateProgress("noradrenaline", {
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Header moduleType="noradrenaline" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Noradrenaline Training" }, { label: "Results" }]} />
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
                    ? "Congratulations! You have passed the Noradrenaline Training Assessment."
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
                      setShowOverview(true)
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

  if (showOverview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Header moduleType="noradrenaline" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Noradrenaline Training" }, { label: "Overview" }]} />
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Noradrenaline Training</h1>
            <p className="text-xl text-gray-600">Hospital Staff Education Program</p>
          </div>

          <Card className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Assessment Overview</CardTitle>
              <p className="text-gray-600 mt-2">
                Test your knowledge on Noradrenaline administration, dosing, and safety protocols
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border border-teal-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">15</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-teal-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">80%</div>
                  <div className="text-sm text-gray-600">Passing Score</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-teal-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">~15</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics Covered:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Badge className="bg-purple-100 text-purple-800 justify-center py-2">Concentration & Dilution</Badge>
                  <Badge className="bg-purple-100 text-purple-800 justify-center py-2">Dosage Calculations</Badge>
                  <Badge className="bg-purple-100 text-purple-800 justify-center py-2">Administration Routes</Badge>
                  <Badge className="bg-purple-100 text-purple-800 justify-center py-2">Safety Protocols</Badge>
                  <Badge className="bg-purple-100 text-purple-800 justify-center py-2">Maximum Doses</Badge>
                  <Badge className="bg-purple-100 text-purple-800 justify-center py-2">Clinical Guidelines</Badge>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-900 mb-1">Important Notice</h4>
                    <p className="text-orange-800 text-sm">
                      This assessment covers critical safety information for Noradrenaline administration. Please review
                      all questions carefully and consult hospital protocols for clinical practice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={handleStartAssessment} className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-lg">
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Header moduleType="noradrenaline" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Noradrenaline Training" }, { label: `Question ${currentQuestion + 1}` }]} />
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900">Noradrenaline Training Assessment</CardTitle>
                <p className="text-gray-600 mt-1">Critical Medication Administration</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Question</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentQuestion + 1} / {questions.length}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <Badge className="w-fit bg-purple-100 text-purple-800 mb-4">{questions[currentQuestion].category}</Badge>
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
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
          >
            <span>{currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
