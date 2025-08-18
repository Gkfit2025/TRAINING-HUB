"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationButtonsProps {
  currentQuestion: number
  totalQuestions: number
  selectedAnswer?: number
  onPrevious: () => void
  onNext: () => void
  buttonColor?: string
  disabled?: boolean
}

export function NavigationButtons({
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onPrevious,
  onNext,
  buttonColor = "bg-gray-600 hover:bg-gray-700",
  disabled = false,
}: NavigationButtonsProps) {
  const isLastQuestion = currentQuestion === totalQuestions - 1
  const canGoBack = currentQuestion > 0
  const canGoForward = selectedAnswer !== undefined && !disabled

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoBack}
        className="flex items-center space-x-2 bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      <Button onClick={onNext} disabled={!canGoForward} className={`flex items-center space-x-2 ${buttonColor}`}>
        <span>{isLastQuestion ? "Complete Assessment" : "Next Question"}</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
