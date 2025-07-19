import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-xl font-bold transition-colors hover:text-primary">
        TechSolutions
      </Link>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/templates"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Templates
      </Link>
      <Link href="/learn" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Learn
      </Link>
    </nav>
  )
}
