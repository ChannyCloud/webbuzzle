"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import UsersPage from "../../Templates/RBAC/pages/users"

export default function Page() {
  return (
    <SidebarProvider>
      <UsersPage />
    </SidebarProvider>
  )
}
