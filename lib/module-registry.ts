export interface ModuleConfig {
  id: string
  title: string
  description: string
  category: "fundamentals" | "critical-care" | "emergency" | "specialty"
  estimatedTime: string
  questionCount: number
  passingScore: number
  color: {
    primary: string
    secondary: string
    badge: string
  }
  route: string
  icon?: string
}

export const moduleRegistry: ModuleConfig[] = [
  {
    id: "3zone",
    title: "3Zone Deep Clean Assessment",
    description: "Hospital cleaning protocols and infection control procedures",
    category: "fundamentals",
    estimatedTime: "15 minutes",
    questionCount: 5,
    passingScore: 80,
    color: {
      primary: "bg-blue-600 hover:bg-blue-700",
      secondary: "from-blue-50 to-indigo-100",
      badge: "bg-blue-100 text-blue-800",
    },
    route: "/3zone",
    icon: "🧽",
  },
  {
    id: "noradrenaline",
    title: "Noradrenaline Training",
    description: "Critical medication administration and safety protocols",
    category: "critical-care",
    estimatedTime: "20 minutes",
    questionCount: 6,
    passingScore: 80,
    color: {
      primary: "bg-purple-600 hover:bg-purple-700",
      secondary: "from-purple-50 to-pink-100",
      badge: "bg-purple-100 text-purple-800",
    },
    route: "/noradrenaline",
    icon: "💉",
  },
  {
    id: "sepsis",
    title: "Sepsis Guidelines 2024",
    description: "Latest sepsis management protocols and emergency procedures",
    category: "emergency",
    estimatedTime: "25 minutes",
    questionCount: 8,
    passingScore: 80,
    color: {
      primary: "bg-red-600 hover:bg-red-700",
      secondary: "from-red-50 to-orange-100",
      badge: "bg-red-100 text-red-800",
    },
    route: "/sepsis",
    icon: "🚨",
  },
]

export function getModuleById(id: string): ModuleConfig | undefined {
  return moduleRegistry.find((module) => module.id === id)
}

export function getModulesByCategory(category: ModuleConfig["category"]): ModuleConfig[] {
  return moduleRegistry.filter((module) => module.category === category)
}

export function getAllModules(): ModuleConfig[] {
  return moduleRegistry
}

// Helper function to add new modules dynamically
export function addModule(module: ModuleConfig): void {
  const existingIndex = moduleRegistry.findIndex((m) => m.id === module.id)
  if (existingIndex >= 0) {
    moduleRegistry[existingIndex] = module
  } else {
    moduleRegistry.push(module)
  }
}
