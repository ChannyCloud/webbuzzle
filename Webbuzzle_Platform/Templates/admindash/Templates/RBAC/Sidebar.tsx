"use client"

// This is the Sidebar template — actual links will be conditionally rendered by permissions in final app.
// In the functional version, menu items would be filtered based on user roles and permissions.

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TicketCheck, FileText, FolderKanban, Code, Users, Settings, LogOut } from "lucide-react"
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()

  // Navigation items with paths
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Tickets", path: "/tickets", icon: TicketCheck },
    { name: "Invoices", path: "/invoices", icon: FileText },
    { name: "Projects", path: "/projects", icon: FolderKanban },
    { name: "Engineering", path: "/code", icon: Code },
    { name: "Users", path: "/users", icon: Users },
  ]

  // Footer items
  const footerItems = [
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Logout", path: "/logout", icon: LogOut },
  ]

  return (
    <UISidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            TS
          </div>
          <span className="text-xl font-bold">TechSolutions</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={pathname === item.path}>
                <Link href={item.path}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={pathname === item.path}>
                <Link href={item.path}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </UISidebar>
  )
}
