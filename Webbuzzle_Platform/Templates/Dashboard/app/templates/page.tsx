"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SiteLayout } from "@/components/site-layout"

// Mock data for templates
const templates = [
  {
    id: "template-1",
    name: "Professional",
    description: "Perfect for portfolios and professional websites",
    image: "/placeholder.svg?height=200&width=300",
    category: "Portfolio",
  },
  {
    id: "template-2",
    name: "Business",
    description: "Ideal for small businesses and stores",
    image: "/placeholder.svg?height=200&width=300",
    category: "Business",
  },
  {
    id: "template-3",
    name: "Blog",
    description: "Designed for content creators and bloggers",
    image: "/placeholder.svg?height=200&width=300",
    category: "Blog",
  },
  {
    id: "template-4",
    name: "Portfolio",
    description: "Showcase your work with this elegant template",
    image: "/placeholder.svg?height=200&width=300",
    category: "Portfolio",
  },
  {
    id: "template-5",
    name: "Restaurant",
    description: "Perfect for restaurants and food services",
    image: "/placeholder.svg?height=200&width=300",
    category: "Business",
  },
  {
    id: "template-6",
    name: "Event",
    description: "Promote your events with this template",
    image: "/placeholder.svg?height=200&width=300",
    category: "Event",
  },
  {
    id: "template-7",
    name: "Photography",
    description: "Display your photography in a beautiful gallery",
    image: "/placeholder.svg?height=200&width=300",
    category: "Portfolio",
  },
  {
    id: "template-8",
    name: "E-commerce",
    description: "Sell products online with this store template",
    image: "/placeholder.svg?height=200&width=300",
    category: "Business",
  },
]

// Get unique categories
const categories = ["All", ...Array.from(new Set(templates.map((template) => template.category)))]

export default function TemplatesPage() {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleUseTemplate = (templateId: string) => {
    toast({
      title: "Template selected",
      description: "Starting new site with this template.",
    })
    // Here you would redirect to the site creation page with the template pre-selected
  }

  return (
    <SiteLayout>
      <DashboardShell>
        <DashboardHeader
          heading="Templates"
          description="Browse and select from our professionally designed templates."
        >
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </DashboardHeader>

        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <Input
                placeholder="Search templates..."
                className="h-9 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                </CardContent>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => handleUseTemplate(template.id)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Use This Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </DashboardShell>
    </SiteLayout>
  )
}
