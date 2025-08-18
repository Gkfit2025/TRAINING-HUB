import type React from "react"
import { Header } from "@/components/navigation/header"
import { Breadcrumb } from "@/components/navigation/breadcrumb"

interface AssessmentLayoutProps {
  children: React.ReactNode
  moduleType: "3zone" | "noradrenaline" | "sepsis"
  breadcrumbItems: Array<{ label: string; href?: string }>
  backgroundClass?: string
}

export function AssessmentLayout({
  children,
  moduleType,
  breadcrumbItems,
  backgroundClass = "bg-gradient-to-br from-gray-50 to-gray-100",
}: AssessmentLayoutProps) {
  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <Header moduleType={moduleType} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        {children}
      </main>
    </div>
  )
}
