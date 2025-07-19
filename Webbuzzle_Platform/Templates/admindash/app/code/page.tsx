"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import CodePage from "../../Templates/RBAC/pages/code"

export default function Page() {
  return (
    <SidebarProvider>
      <CodePage />
    </SidebarProvider>
  )
}
