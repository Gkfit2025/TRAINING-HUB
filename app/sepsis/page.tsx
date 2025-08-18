"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Clock, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/navigation/header"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useProgress } from "@/lib/progress-context"

const questions = [
  {
    id: 1,
    category: "Recognition",
    question: "What is the qSOFA score threshold that suggests sepsis?",
    options: ["≥1", "≥2", "≥3", "≥4"],
    correctAnswer: 1,
  },
  {
    id: 2,
    category: "Fluid Resuscitation",
    question: "What is the recommended initial fluid bolus for sepsis-induced hypoperfusion?",
    options: ["10 ml/kg", "20 ml/kg", "30 ml/kg", "40 ml/kg"],
    correctAnswer: 2,
  },
  {
    id: 3,
    category: "Antibiotic Protocols",
    question: "Within what timeframe should antibiotics be administered for sepsis?",
    options: ["Within 30 minutes", "Within 1 hour", "Within 3 hours", "Within 6 hours"],
    correctAnswer: 1,
  },
  {
    id: 4,
    category: "Vasopressors",
    question: "What is the first-line vasopressor for septic shock?",
    options: ["Dopamine", "Epinephrine", "Norepinephrine", "Vasopressin"],
    correctAnswer: 2,
  },
  {
    id: 5,
    category: "Blood Cultures",
    question: "When should blood cultures be obtained in suspected sepsis?",
    options: [
      "After antibiotic administration",
      "Before antibiotic administration",
      "Only if fever is present",
      "Within 24 hours of admission",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    category: "Lactate Monitoring",
    question: "What lactate level indicates tissue hypoperfusion in sepsis?",
    options: [">1 mmol/L", ">2 mmol/L", ">3 mmol/L", ">4 mmol/L"],
    correctAnswer: 1,
  },
  {
    id: 7,
    category: "Source Control",
    question: "How quickly should source control be achieved when feasible?",
    options: ["Within 6 hours", "Within 12 hours", "Within 24 hours", "Within 48 hours"],
    correctAnswer: 1,
  },
  {
    id: 8,
    category: "Steroid Therapy",
    question: "When is hydrocortisone recommended in septic shock?",
    options: [
      "All septic shock patients",
      "Only if vasopressors are ineffective",
      "Only with concurrent ARDS",
      "Never recommended",
    ],
    correctAnswer: 1,
  },
]

export default function SepsisTraining() {
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

    updateProgress("sepsis", {
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <Header moduleType="sepsis" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Sepsis Guidelines" }, { label: "Results" }]} />
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
                    ? "Congratulations! You have passed the Sepsis Guidelines 2024 Assessment."
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        <Header moduleType="sepsis" />
        {/* Hero Image */}
        <div className="relative h-96 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
          <img
            src="/hospital-room-care.png"
            alt="Healthcare professional attending to patient"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Sepsis Guidelines 2024</h1>
              <p className="text-2xl">Life-Saving Protocol Training</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Title Section */}
          <div className="text-center mb-8 -mt-32 relative z-10">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Comprehensive MCQ Assessment</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Test your knowledge of the latest sepsis management protocols based on Surviving Sepsis Campaign (SSC),
              CDC Core Elements, and WHO Updates
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">15 Questions</h3>
                <p className="text-gray-600">
                  Comprehensive coverage of 2024 sepsis guidelines including fluid resuscitation, vasopressors, and
                  antibiotic protocols
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">20 Minutes</h3>
                <p className="text-gray-600">
                  Estimated completion time with detailed rationales and evidence-based explanations for each answer
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Performance Feedback</h3>
                <p className="text-gray-600">
                  Detailed analysis of your performance with targeted recommendations for improvement and additional
                  study resources
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ready to Begin Section */}
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Begin?</h3>
              <p className="text-gray-700 mb-6">
                Test your sepsis management knowledge and receive personalized feedback
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>For Hospital Trainees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>~20 Minutes</span>
                </div>
              </div>
              <Button onClick={handleStartAssessment} className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg">
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>Based on Surviving Sepsis Campaign (SSC), CDC Core Elements, and WHO Updates</p>
            <p className="mt-1">© 2024 Hospital Training Platform. All rights reserved.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      <Header moduleType="sepsis" />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Sepsis Guidelines" }, { label: `Question ${currentQuestion + 1}` }]} />
        {/* Progress Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900">Sepsis Guidelines 2024</CardTitle>
                <p className="text-gray-600 mt-1">Comprehensive MCQ Assessment</p>
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

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <Badge className="w-fit bg-red-100 text-red-800 mb-4">{questions[currentQuestion].category}</Badge>
            <CardTitle className="text-xl text-gray-900">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion] !== undefined ? selectedAnswers[currentQuestion].toString() : ""}
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

        {/* Navigation */}
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
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
          >
            <span>{currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  )
}
