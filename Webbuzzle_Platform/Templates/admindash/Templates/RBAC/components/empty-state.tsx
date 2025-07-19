"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  iconClassName?: string
}

export function EmptyState({ icon: Icon, title, description, action, className, iconClassName }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className={cn("mb-4 rounded-full bg-gray-100 p-6 dark:bg-gray-800", iconClassName)}>
        <Icon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}
