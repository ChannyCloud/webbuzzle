"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PermissionTooltipProps {
  children: ReactNode
  permission: string
  description?: string
}

export function PermissionTooltip({ children, permission, description }: PermissionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-block">{children}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description || `You don't have permission to ${permission}`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface PermissionButtonProps {
  children: ReactNode
  permission: string
  description?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onClick?: () => void
}

export function PermissionButton({
  children,
  permission,
  description,
  variant = "default",
  size,
  className,
  onClick,
}: PermissionButtonProps) {
  return (
    <PermissionTooltip permission={permission} description={description}>
      <Button variant={variant} size={size} className={className} disabled onClick={onClick}>
        {children}
      </Button>
    </PermissionTooltip>
  )
}
