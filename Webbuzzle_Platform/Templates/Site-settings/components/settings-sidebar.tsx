"use client"

import { Beaker, Code2, FileText, Home, PanelLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface SettingsSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export function SettingsSidebar({ activeTab, setActiveTab, open, setOpen }: SettingsSidebarProps) {
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar>
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
              <SidebarTrigger />
            </Button>
            <h2 className="text-lg font-semibold">Site Settings</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "general"} onClick={() => setActiveTab("general")}>
                <Home />
                <span>General Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "content"} onClick={() => setActiveTab("content")}>
                <FileText />
                <span>Content Defaults</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "advanced"} onClick={() => setActiveTab("advanced")}>
                <Code2 />
                <span>Advanced Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "experimental"} onClick={() => setActiveTab("experimental")}>
                <Beaker />
                <span>Experimental Features</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex items-center border-b p-4 md:hidden">
        <Button variant="outline" size="icon" className="mr-2">
          <PanelLeft className="h-4 w-4" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="text-lg font-semibold">Site Settings</h1>
      </div>
    </SidebarProvider>
  )
}
