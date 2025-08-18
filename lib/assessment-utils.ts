export interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface AssessmentConfig {
  moduleId: string
  title: string
  subtitle: string
  description: string
  questions: Question[]
  passingScore: number
  estimatedTime: number
  topics: string[]
  colors: {
    primary: string
    background: string
    category: string
    button: string
  }
}

export function calculateScore(selectedAnswers: number[], questions: Question[]): number {
  let correct = 0
  selectedAnswers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correct++
    }
  })
  return Math.round((correct / questions.length) * 100)
}

export function getCorrectAnswersCount(selectedAnswers: number[], questions: Question[]): number {
  let correct = 0
  selectedAnswers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      correct++
    }
  })
  return correct
}

export function formatDate(dateString?: string): string | null {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
}
