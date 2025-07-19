"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ComputerIcon as Desktop,
  Eye,
  Menu,
  Save,
  Smartphone,
  Tablet,
  Undo,
  Redo,
  Copy,
  Trash,
  Download,
} from "lucide-react"

interface HeaderProps {
  viewMode: string
  setViewMode: (mode: string) => void
}

export function Header({ viewMode, setViewMode }: HeaderProps) {
  return (
    <header className="border-b bg-white p-2 flex items-center justify-between">
      <div className="flex items-center">
        <Menu className="h-5 w-5 mr-2" />
        <h1 className="text-xl font-semibold">Website Builder</h1>
      </div>

      <div className="flex items-center space-x-1">
        <div className="border rounded-md p-1 flex mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Duplicate</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="border rounded-md p-1 flex mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "mobile" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("mobile")}
                  className="h-8 w-8"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile View</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "tablet" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("tablet")}
                  className="h-8 w-8"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tablet View</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "desktop" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("desktop")}
                  className="h-8 w-8"
                >
                  <Desktop className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Desktop View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button variant="outline" size="sm" className="h-8">
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>

        <Button variant="outline" size="sm" className="h-8">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>

        <Button size="sm" className="h-8">
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
      </div>
    </header>
  )
}
