"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import InvoicesPage from "../../Templates/RBAC/pages/invoices"

export default function Page() {
  return (
    <SidebarProvider>
      <InvoicesPage />
    </SidebarProvider>
  )
}
