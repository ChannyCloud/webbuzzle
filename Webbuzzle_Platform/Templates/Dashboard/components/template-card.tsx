"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateCardProps {
  template: {
    id: string
    name: string
    description: string
    image: string
  }
  isSelected: boolean
  onSelect: () => void
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <Card
      className={cn("cursor-pointer transition-all hover:border-primary", isSelected ? "border-2 border-primary" : "")}
      onClick={onSelect}
    >
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="overflow-hidden rounded-md">
          <img
            src={template.image || "/placeholder.svg"}
            alt={template.name}
            className="h-auto w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <CardDescription className="mt-2 text-xs">{template.description}</CardDescription>
      </CardContent>
    </Card>
  )
}
