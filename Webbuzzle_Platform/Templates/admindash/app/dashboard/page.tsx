"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardPage from "../../Templates/RBAC/pages/dashboard"

export default function Page() {
  return (
    <SidebarProvider>
      <DashboardPage />
    </SidebarProvider>
  )
}
