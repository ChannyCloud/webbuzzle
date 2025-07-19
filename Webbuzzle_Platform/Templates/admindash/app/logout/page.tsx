"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would handle logout logic
    // For now, we'll just redirect to the dashboard after a brief delay
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Logging out...</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Please wait while we sign you out.</p>
        <div className="mt-4 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      </div>
    </div>
  )
}
