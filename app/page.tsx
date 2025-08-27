"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  Heart,
  Shield,
  Users,
  BookOpen,
  Award,
  Clock,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  AlertTriangle,
  Brain,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-emerald-50 to-white relative"
      style={{
        backgroundImage: "url('/medical-background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/60 pointer-events-none z-0"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-emerald-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Stethoscope className="h-8 w-8" />
                <span className="text-xl font-bold">Grace Kennett Foundation</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-emerald-200 transition-colors">
                  Dashboard
                </a>
                <a href="#" className="hover:text-emerald-200 transition-colors">
                  My Progress
                </a>
                <a href="#" className="hover:text-emerald-200 transition-colors">
                  Certificates
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4">
              H.T.H is an Open Source Framework for learning Heart by Our Doctors
            </Badge>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Empowering Healthcare Through <span className="text-emerald-600">Smarter Training</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience comprehensive medical training through interactive modules, assessments, and real-world scenarios
            designed for healthcare excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Play className="mr-2 h-5 w-5" />
              Start Training
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="mr-2 h-5 w-5" />
              Browse Modules
            </Button>
          </div>
        </section>

        {/* Featured Training Modules */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Star className="mr-3 h-8 w-8 text-emerald-600" />
              Featured Training Modules
            </h2>
            <Button variant="outline">
              See all modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 3Zone Training */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <Badge className="bg-blue-100 text-blue-800">Fundamentals</Badge>
                </div>
                <CardTitle className="text-lg">3Zone Deep Clean Assessment</CardTitle>
                <CardDescription>
                  Master the essential 3-zone cleaning protocols for hospital infection control.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    15 min
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    All Staff
                  </span>
                </div>
                <Link href="https://v0-training-hub.vercel.app/3zone">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Training</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Noradrenaline Training */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Heart className="h-8 w-8 text-purple-600" />
                  <Badge className="bg-purple-100 text-purple-800">Critical Care</Badge>
                </div>
                <CardTitle className="text-lg">Noradrenaline Administration</CardTitle>
                <CardDescription>
                  Critical medication protocols and safety guidelines for noradrenaline use.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    25 min
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    ICU Staff
                  </span>
                </div>
                <Link href="https://v0-training-hub.vercel.app/noradrenaline">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Start Training</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sepsis Guidelines */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <Badge className="bg-red-100 text-red-800">Emergency</Badge>
                </div>
                <CardTitle className="text-lg">Sepsis Guidelines 2024</CardTitle>
                <CardDescription>Latest protocols for sepsis recognition, assessment, and management.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    30 min
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    Medical Staff
                  </span>
                </div>
                <Link href="https://v0-training-hub.vercel.app/sepsis">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Start Training</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Burns Management */}
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Activity className="h-8 w-8 text-orange-600" />
                  <Badge className="bg-orange-100 text-orange-800">Specialized</Badge>
                </div>
                <CardTitle className="text-lg">Burns Fluid Management</CardTitle>
                <CardDescription>Comprehensive burn care protocols and fluid resuscitation strategies.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    35 min
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    Burn Unit
                  </span>
                </div>
                <Link href="https://v0-burns.vercel.app/">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">Start Training</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Assessment Quizzes */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Brain className="mr-3 h-8 w-8 text-emerald-600" />
              Assessment Quizzes
            </h2>
            <Button variant="outline">
              See All Quizzes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
                  General Medical Quiz
                </CardTitle>
                <CardDescription>
                  Comprehensive assessment covering basic medical knowledge and procedures.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Take Quiz</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
                  Infection Control Quiz
                </CardTitle>
                <CardDescription>
                  Test your knowledge of hospital infection prevention and control measures.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Take Quiz</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-purple-600" />
                  Emergency Protocols
                </CardTitle>
                <CardDescription>Assess your understanding of critical emergency response procedures.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Take Quiz</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-orange-600" />
                  Patient Safety Quiz
                </CardTitle>
                <CardDescription>Evaluate your knowledge of patient safety protocols and best practices.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Take Quiz</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Learning Pathways */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Structured Learning Pathways</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow guided learning paths designed for different roles and specializations in healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle>New Staff Orientation</CardTitle>
                <CardDescription>Essential training modules for new healthcare team members.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Journey
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Critical Care Pathway</CardTitle>
                <CardDescription>Advanced training for intensive care and emergency medicine.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Journey
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Safety & Compliance</CardTitle>
                <CardDescription>Comprehensive safety protocols and regulatory compliance training.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Journey
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Leadership Development</CardTitle>
                <CardDescription>Management and leadership skills for healthcare supervisors.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Journey
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Stethoscope className="h-8 w-8 text-emerald-600 mr-3" />
                <span className="text-xl font-bold text-gray-900">Grace Kennett Foundation</span>
              </div>
              <p className="text-gray-600 mb-4">For suggestions WhatsApp GKF-IT Team at +91 9842194442</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Stethoscope className="h-4 w-4 text-emerald-600" />
                <span>License 4.0 • Grace Kennett Foundation Hospital, 8, Kennett Road Madurai, Tamil Nadu, India</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                © 2025 Grace Kennett Foundation Training Modules. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
