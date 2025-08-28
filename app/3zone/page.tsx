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
  {
    id: 6,
    category: "High-Risk Zone",
    question: "Which areas are classified as high-risk zones?",
    options: ["Patient bathrooms and isolation rooms", "Staff break rooms", "Hospital corridors", "Waiting areas"],
    correctAnswer: 0,
  },
  {
    id: 7,
    category: "High-Risk Zone",
    question: "What color equipment should be used in high-risk zones?",
    options: ["Green", "Yellow", "Red", "Blue"],
    correctAnswer: 2,
  },
  {
    id: 8,
    category: "Medium-Risk Zone",
    question: "Which areas are typically classified as medium-risk zones?",
    options: [
      "Operating theaters",
      "General patient rooms and nursing stations",
      "Hospital entrances",
      "Administrative offices",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    category: "Medium-Risk Zone",
    question: "What color equipment should be used in medium-risk zones?",
    options: ["Red", "Yellow", "Green", "Blue"],
    correctAnswer: 1,
  },
  {
    id: 10,
    category: "Low-Risk Zone",
    question: "Which areas are classified as low-risk zones?",
    options: ["Patient isolation rooms", "Operating theaters", "Public areas and corridors", "Intensive care units"],
    correctAnswer: 2,
  },
  {
    id: 11,
    category: "Low-Risk Zone",
    question: "What color equipment should be used in low-risk zones?",
    options: ["Red", "Yellow", "Green", "Blue"],
    correctAnswer: 2,
  },
  {
    id: 12,
    category: "Cleaning Sequence",
    question: "In what order should zones be cleaned?",
    options: [
      "High-risk, Medium-risk, Low-risk",
      "Low-risk, Medium-risk, High-risk",
      "Medium-risk, Low-risk, High-risk",
      "Any order is acceptable",
    ],
    correctAnswer: 1,
  },
  {
    id: 13,
    category: "PPE Requirements",
    question: "What PPE is required when cleaning high-risk zones?",
    options: ["Gloves only", "Gloves and apron", "Gloves, apron, and eye protection", "No PPE required"],
    correctAnswer: 2,
  },
  {
    id: 14,
    category: "Disinfection",
    question: "How long should disinfectant remain on surfaces in high-risk zones?",
    options: ["30 seconds", "1 minute", "2-5 minutes (contact time)", "10 minutes"],
    correctAnswer: 2,
  },
  {
    id: 15,
    category: "Equipment Storage",
    question: "How should color-coded equipment be stored?",
    options: [
      "All together in one storage area",
      "Separately in designated areas for each zone",
      "In patient rooms",
      "In staff break rooms",
    ],
    correctAnswer: 1,
  },
  {
    id: 16,
    category: "Cross-Contamination",
    question: "What is the main risk of not following the 3-zone method?",
    options: ["Equipment damage", "Cross-contamination between zones", "Increased cleaning time", "Staff fatigue"],
    correctAnswer: 1,
  },
  {
    id: 17,
    category: "Documentation",
    question: "What should be documented after cleaning each zone?",
    options: ["Time started only", "Time completed and areas cleaned", "Staff member name only", "Equipment used only"],
    correctAnswer: 1,
  },
  {
    id: 18,
    category: "Emergency Procedures",
    question: "What should you do if you accidentally use wrong-colored equipment in a zone?",
    options: [
      "Continue cleaning",
      "Stop, disinfect equipment, and restart with correct equipment",
      "Switch to different zone",
      "Report to supervisor only",
    ],
    correctAnswer: 1,
  },
  {
    id: 19,
    category: "Quality Control",
    question: "How often should cleaning effectiveness be monitored?",
    options: [
      "Once per week",
      "Once per month",
      "Daily through visual inspection and periodic testing",
      "Only when problems occur",
    ],
    correctAnswer: 2,
  },
  {
    id: 20,
    category: "Best Practices",
    question: "What is the most important principle of the 3-zone cleaning method?",
    options: [
      "Speed of cleaning",
      "Cost effectiveness",
      "Preventing cross-contamination through systematic approach",
      "Using minimal equipment",
    ],
    correctAnswer: 2,
  },
]

export default function ThreeZoneTraining() {
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

  if (showOverview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header moduleType="3zone" />

        {/* Hero Image Section */}
        <div className="relative h-80 bg-gradient-to-r from-blue-800 to-indigo-900 overflow-hidden">
          <img
            src="/hospital-cleaning-zones.png"
            alt="Hospital cleaning zones with color-coded equipment"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">3Zone Deep Clean Assessment</h1>
              <p className="text-xl">Hospital Cleaning Protocol Training</p>
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-16 relative z-10">
          <Breadcrumb items={[{ label: "3Zone Training" }, { label: "Overview" }]} />

          {/* Equipment Image Card */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Color-Coded Cleaning System</h2>
                  <p className="text-gray-600 mb-4">
                    Learn the essential 3-zone cleaning method that reduces infection risk through systematic,
                    color-coded equipment management and proper cleaning protocols.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm font-medium">High-Risk Zone (Red)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="text-sm font-medium">Medium-Risk Zone (Yellow)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm font-medium">Low-Risk Zone (Green)</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/3zonepic.png"
                    alt="Medical equipment cleaning with color-coded supplies"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Overview */}
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Assessment Overview</CardTitle>
              <p className="text-gray-600 mt-2">
                Test your knowledge on the 3-zone cleaning method and infection control protocols
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">20</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">80%</div>
                  <div className="text-sm text-gray-600">Passing Score</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-blue-100">
                  <div className="text-3xl font-bold text-gray-900 mb-1">~25</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={handleStartAssessment} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
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
