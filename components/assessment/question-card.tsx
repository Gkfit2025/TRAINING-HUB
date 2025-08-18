"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
}

interface QuestionCardProps {
  question: Question
  selectedAnswer?: number
  onAnswerSelect: (answerIndex: number) => void
  categoryColor?: string
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  categoryColor = "bg-gray-100 text-gray-800",
}: QuestionCardProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <Badge className={`w-fit ${categoryColor} mb-4`}>{question.category}</Badge>
        <CardTitle className="text-xl text-gray-900">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer !== undefined ? selectedAnswer.toString() : ""}
          onValueChange={(value) => {
            if (value) {
              onAnswerSelect(Number.parseInt(value))
            }
          }}
          className="space-y-4"
        >
          {question.options.map((option, index) => (
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
  )
}
