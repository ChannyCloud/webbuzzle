"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import ProjectsPage from "../../Templates/RBAC/pages/projects"

export default function Page() {
  return (
    <SidebarProvider>
      <ProjectsPage />
    </SidebarProvider>
  )
}
