"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MoodSubmission } from "@/components/mood-submission"
import { AdminDashboard } from "@/components/admin-dashboard"
import { BarChart3, Heart, Users } from "lucide-react"

export default function MoodTracker() {
  const [currentView, setCurrentView] = useState<"employee" | "admin">("employee")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">MoodTracker</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Track team wellness and build a happier workplace
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={currentView === "employee" ? "default" : "outline"}
              onClick={() => setCurrentView("employee")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Users className="h-4 w-4" />
              Employee View
            </Button>
            <Button
              variant={currentView === "admin" ? "default" : "outline"}
              onClick={() => setCurrentView("admin")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <BarChart3 className="h-4 w-4" />
              Admin Dashboard
            </Button>
          </div>
        </div>

        {currentView === "employee" ? <MoodSubmission /> : <AdminDashboard />}
      </div>
    </div>
  )
}
