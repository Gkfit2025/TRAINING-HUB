import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressHeaderProps {
  title: string
  subtitle: string
  currentQuestion: number
  totalQuestions: number
  progress: number
}

export function ProgressHeader({ title, subtitle, currentQuestion, totalQuestions, progress }: ProgressHeaderProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-gray-900">{title}</CardTitle>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Question</p>
            <p className="text-2xl font-bold text-gray-900">
              {currentQuestion} / {totalQuestions}
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
  )
}
