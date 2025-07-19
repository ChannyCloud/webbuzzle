"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import TicketsPage from "../../Templates/RBAC/pages/tickets"

export default function Page() {
  return (
    <SidebarProvider>
      <TicketsPage />
    </SidebarProvider>
  )
}
