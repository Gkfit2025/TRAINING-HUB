"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface ModuleProgress {
  completed: boolean
  score?: number
  completedAt?: string
  attempts: number
  bestScore?: number
  timeSpent?: number
}

export interface ProgressData {
  "3zone": ModuleProgress
  noradrenaline: ModuleProgress
  sepsis: ModuleProgress
}

interface ProgressContextType {
  progress: ProgressData
  updateProgress: (moduleId: keyof ProgressData, data: Partial<ModuleProgress>) => void
  getOverallProgress: () => {
    completedModules: number
    totalModules: number
    averageScore: number
    completionRate: number
  }
  resetProgress: (moduleId?: keyof ProgressData) => void
}

const defaultProgress: ProgressData = {
  "3zone": { completed: false, attempts: 0 },
  noradrenaline: { completed: false, attempts: 0 },
  sepsis: { completed: false, attempts: 0 },
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("medical-training-progress")
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        setProgress({ ...defaultProgress, ...parsed })
      } catch (error) {
        console.error("Failed to parse saved progress:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("medical-training-progress", JSON.stringify(progress))
    }
  }, [progress, isLoaded])

  const updateProgress = (moduleId: keyof ProgressData, data: Partial<ModuleProgress>) => {
    setProgress((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        ...data,
        // Update best score if this score is better
        bestScore:
          data.score !== undefined ? Math.max(data.score, prev[moduleId].bestScore || 0) : prev[moduleId].bestScore,
        // Increment attempts if completing
        attempts: data.completed ? prev[moduleId].attempts + 1 : prev[moduleId].attempts,
        // Set completion timestamp if completing
        completedAt: data.completed ? new Date().toISOString() : prev[moduleId].completedAt,
      },
    }))
  }

  const getOverallProgress = () => {
    const modules = Object.values(progress)
    const completedModules = modules.filter((m) => m.completed).length
    const totalModules = modules.length
    const completionRate = totalModules > 0 ? (completedModules / totalModules) * 100 : 0

    const scoresWithValues = modules.filter((m) => m.bestScore !== undefined).map((m) => m.bestScore!)
    const averageScore =
      scoresWithValues.length > 0
        ? scoresWithValues.reduce((sum, score) => sum + score, 0) / scoresWithValues.length
        : 0

    return {
      completedModules,
      totalModules,
      averageScore: Math.round(averageScore),
      completionRate: Math.round(completionRate),
    }
  }

  const resetProgress = (moduleId?: keyof ProgressData) => {
    if (moduleId) {
      setProgress((prev) => ({
        ...prev,
        [moduleId]: { completed: false, attempts: 0 },
      }))
    } else {
      setProgress(defaultProgress)
    }
  }

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, getOverallProgress, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}
