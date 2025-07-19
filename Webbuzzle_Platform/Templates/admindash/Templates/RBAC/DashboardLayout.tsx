// This is the main layout template that wraps all dashboard pages.
// It provides the consistent structure with sidebar and header.
// Actual authentication and permission checks would be implemented separately.

import type React from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Toaster } from "./components/toaster"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // Note: SidebarProvider is now in the parent component (app/page.tsx)
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar component - fixed on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header component - fixed at the top */}
        <Header />

        {/* Page content - scrollable */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Toast notifications */}
        <Toaster />
      </div>
    </div>
  )
}
