import { Plus } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"

export function SiteCreateButton({ className, variant, ...props }: ButtonProps) {
  return (
    <Button variant={variant} size="sm" className={className} {...props}>
      <Plus className="mr-2 h-4 w-4" />
      Create New Site
    </Button>
  )
}
