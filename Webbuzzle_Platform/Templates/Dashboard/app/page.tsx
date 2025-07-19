"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Bell, Eye, HelpCircle, Plus, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SiteCard } from "@/components/site-card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { SiteCreateButton } from "@/components/site-create-button"
import { TemplateCard } from "@/components/template-card"

// Mock data for sites
const sites = [
  {
    id: "1",
    name: "My Portfolio",
    template: "Professional",
    lastUpdated: "2 hours ago",
    status: "Published",
    url: "johndoe.techsolutions.site",
  },
  {
    id: "2",
    name: "Coffee Shop",
    template: "Business",
    lastUpdated: "Yesterday",
    status: "Draft",
    url: "johndoe-coffee.techsolutions.site",
  },
  {
    id: "3",
    name: "Travel Blog",
    template: "Blog",
    lastUpdated: "3 days ago",
    status: "Published",
    url: "johndoe-travels.techsolutions.site",
  },
]

// Mock data for templates
const templates = [
  {
    id: "template-1",
    name: "Professional",
    description: "Perfect for portfolios and professional websites",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "template-2",
    name: "Business",
    description: "Ideal for small businesses and stores",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "template-3",
    name: "Blog",
    description: "Designed for content creators and bloggers",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "template-4",
    name: "Portfolio",
    description: "Showcase your work with this elegant template",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "template-5",
    name: "Restaurant",
    description: "Perfect for restaurants and food services",
    image: "/placeholder.svg?height=120&width=240",
  },
  {
    id: "template-6",
    name: "Event",
    description: "Promote your events with this template",
    image: "/placeholder.svg?height=120&width=240",
  },
]

export default function DashboardPage() {
  const { toast } = useToast()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [newSiteName, setNewSiteName] = useState("")

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`)
    toast({
      title: "Link copied",
      description: `${url} has been copied to clipboard.`,
    })
  }

  const handleCreateSite = () => {
    // Here you would typically create the site and redirect to the editor
    toast({
      title: "Site created",
      description: `${newSiteName} has been created successfully.`,
    })
    setIsCreateDialogOpen(false)
    setNewSiteName("")
    setSelectedTemplate("")
  }

  const handleGenerateAI = () => {
    toast({
      title: "AI Assistant",
      description: "Generating content suggestions for your site...",
    })
  }

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    })
    // Reset form here
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
              <UserNav />
            </div>
          </div>
        </header>
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
            <DashboardShell className="pr-8 pt-6">
              <div className="space-y-4">
                <div className="px-4 py-2">
                  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Dashboard</h2>
                  <div className="space-y-1">
                    <Button variant="secondary" className="w-full justify-start">
                      <Eye className="mr-2 h-4 w-4" />
                      My Sites
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/help">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Help & Support
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </DashboardShell>
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <DashboardShell>
              <DashboardHeader
                heading="Welcome, John!"
                description="Manage your websites and create new ones with ease."
              />

              <Tabs defaultValue="sites" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="sites">My Sites</TabsTrigger>
                  <TabsTrigger value="settings" asChild>
                    <Link href="/settings">Account Settings</Link>
                  </TabsTrigger>
                  <TabsTrigger value="feedback" asChild>
                    <Link href="/help">Feedback & Support</Link>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sites" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Your Websites</h2>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Create New Site
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Create a new website</DialogTitle>
                          <DialogDescription>Choose a template and name for your new website.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="site-name">Site Name</Label>
                            <Input
                              id="site-name"
                              placeholder="My Awesome Website"
                              value={newSiteName}
                              onChange={(e) => setNewSiteName(e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Choose a Template</Label>
                            <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[300px] p-1">
                              {templates.map((template) => (
                                <TemplateCard
                                  key={template.id}
                                  template={template}
                                  isSelected={selectedTemplate === template.id}
                                  onSelect={() => setSelectedTemplate(template.id)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateSite} disabled={!newSiteName || !selectedTemplate}>
                            Create & Edit
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {sites.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {sites.map((site) => (
                        <SiteCard key={site.id} site={site} onCopyLink={() => handleCopyLink(site.url)} />
                      ))}
                    </div>
                  ) : (
                    <EmptyPlaceholder>
                      <EmptyPlaceholder.Icon name="post" />
                      <EmptyPlaceholder.Title>No sites created</EmptyPlaceholder.Title>
                      <EmptyPlaceholder.Description>
                        You haven&apos;t created any websites yet. Start by creating your first site.
                      </EmptyPlaceholder.Description>
                      <SiteCreateButton variant="outline" />
                    </EmptyPlaceholder>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>AI Content Assistant</CardTitle>
                      <CardDescription>
                        Let our AI help you generate professional content for your websites.
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button onClick={handleGenerateAI}>Generate Content with AI</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </DashboardShell>
          </main>
        </div>
      </div>
    </>
  )
}
