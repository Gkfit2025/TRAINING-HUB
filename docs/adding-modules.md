# Adding New Training Modules

This guide explains how to add new training modules to the Medical Training Platform.

## Quick Start

1. **Define your module** in `lib/module-registry.ts`
2. **Create the page** in `app/[module-id]/page.tsx`
3. **Add questions** and assessment logic
4. **Test and deploy**

## Step 1: Register Your Module

Add your module configuration to `lib/module-registry.ts`:

\`\`\`typescript
{
  id: 'your-module-id',
  title: 'Your Module Title',
  description: 'Brief description of what this module covers',
  category: 'fundamentals' | 'critical-care' | 'emergency' | 'specialty',
  estimatedTime: '15 minutes',
  questionCount: 5,
  passingScore: 80,
  color: {
    primary: 'bg-green-600 hover:bg-green-700',
    secondary: 'from-green-50 to-emerald-100',
    badge: 'bg-green-100 text-green-800'
  },
  route: '/your-module-id',
  icon: '🩺'
}
\`\`\`

## Step 2: Create the Page

Create `app/your-module-id/page.tsx` following this structure:

\`\`\`typescript
"use client"

import { useState } from "react"
import { useProgress } from "@/lib/progress-context"
// Import other necessary components

const questions = [
  {
    id: 1,
    category: "Category Name",
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0, // Index of correct answer
  },
  // Add more questions...
]

export default function YourModulePage() {
  // Use the same state management pattern as existing modules
  const [showOverview, setShowOverview] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const { updateProgress } = useProgress()

  // Implement the same assessment flow as existing modules
  // ... rest of component logic
}
\`\`\`

## Step 3: Categories

Available categories:
- `fundamentals`: Basic training modules
- `critical-care`: Advanced medical procedures
- `emergency`: Emergency response protocols
- `specialty`: Specialized medical areas

## Step 4: Color Schemes

Choose appropriate colors for your module:
- **Blue**: General medical, fundamentals
- **Purple**: Critical care, advanced procedures
- **Red**: Emergency, urgent care
- **Green**: Safety, protocols
- **Orange**: Specialty areas

## Example: Adding a "Hand Hygiene" Module

\`\`\`typescript
// In lib/module-registry.ts
{
  id: 'hand-hygiene',
  title: 'Hand Hygiene Protocols',
  description: 'WHO hand hygiene guidelines and infection prevention',
  category: 'fundamentals',
  estimatedTime: '10 minutes',
  questionCount: 4,
  passingScore: 75,
  color: {
    primary: 'bg-green-600 hover:bg-green-700',
    secondary: 'from-green-50 to-emerald-100',
    badge: 'bg-green-100 text-green-800'
  },
  route: '/hand-hygiene',
  icon: '🧼'
}
\`\`\`

Then create `app/hand-hygiene/page.tsx` with your questions and assessment logic.

## Features Included

All modules automatically get:
- ✅ Progress tracking
- ✅ Score persistence
- ✅ Responsive design
- ✅ Navigation breadcrumbs
- ✅ Results page with pass/fail
- ✅ Retake functionality
- ✅ Dashboard integration

## Testing Your Module

1. Add the module to the registry
2. Create the page file
3. Run `npm run dev`
4. Navigate to your module from the dashboard
5. Complete the assessment to test all functionality

Your new module will automatically appear on the dashboard and integrate with the progress tracking system!
