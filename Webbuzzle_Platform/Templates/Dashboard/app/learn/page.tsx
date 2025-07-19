"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, Play, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SiteLayout } from "@/components/site-layout"

// Mock data for tutorials
const tutorials = [
  {
    id: "tutorial-1",
    title: "Getting Started with TechSolutions",
    description: "Learn the basics of creating your first website",
    image: "/placeholder.svg?height=150&width=300",
    duration: "5 min",
    type: "video",
  },
  {
    id: "tutorial-2",
    title: "Using Templates Effectively",
    description: "How to customize templates to match your brand",
    image: "/placeholder.svg?height=150&width=300",
    duration: "8 min",
    type: "video",
  },
  {
    id: "tutorial-3",
    title: "Working with the AI Assistant",
    description: "Generate professional content with our AI tools",
    image: "/placeholder.svg?height=150&width=300",
    duration: "6 min",
    type: "video",
  },
  {
    id: "tutorial-4",
    title: "SEO Best Practices",
    description: "Optimize your site to rank higher in search results",
    image: "/placeholder.svg?height=150&width=300",
    duration: "10 min",
    type: "video",
  },
]

// Mock data for guides
const guides = [
  {
    id: "guide-1",
    title: "Complete Website Building Guide",
    description: "A comprehensive guide to creating professional websites",
    image: "/placeholder.svg?height=150&width=300",
    readTime: "15 min read",
  },
  {
    id: "guide-2",
    title: "E-commerce Setup Guide",
    description: "How to set up an online store with TechSolutions",
    image: "/placeholder.svg?height=150&width=300",
    readTime: "12 min read",
  },
  {
    id: "guide-3",
    title: "Content Strategy for Beginners",
    description: "Learn how to plan and create engaging content",
    image: "/placeholder.svg?height=150&width=300",
    readTime: "10 min read",
  },
  {
    id: "guide-4",
    title: "Mobile Optimization Tips",
    description: "Ensure your website looks great on all devices",
    image: "/placeholder.svg?height=150&width=300",
    readTime: "8 min read",
  },
]

export default function LearnPage() {
  return (
    <SiteLayout>
      <DashboardShell>
        <DashboardHeader
          heading="Learn"
          description="Tutorials, guides, and resources to help you build better websites."
        >
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </DashboardHeader>

        <div className="flex flex-col space-y-5">
          <div className="flex items-center space-x-2">
            <Input placeholder="Search tutorials and guides..." className="h-9 w-full sm:w-[300px]" />
            <Button size="sm" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="tutorials" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tutorials">
                <Play className="mr-2 h-4 w-4" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="guides">
                <FileText className="mr-2 h-4 w-4" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="faq">
                <BookOpen className="mr-2 h-4 w-4" />
                FAQs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tutorials" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img
                          src={tutorial.image || "/placeholder.svg"}
                          alt={tutorial.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
                          {tutorial.duration}
                        </div>
                      </div>
                    </CardContent>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" className="w-full">
                        Watch Tutorial
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {guides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={guide.image || "/placeholder.svg"}
                          alt={guide.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CardContent>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <div className="text-sm text-muted-foreground">{guide.readTime}</div>
                      <Button variant="outline">Read Guide</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about TechSolutions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">How do I publish my website?</h3>
                    <p className="text-sm text-muted-foreground">
                      To publish your website, go to your dashboard, select the site you want to publish, and click the
                      "Publish" toggle. Your site will be live at your custom URL instantly.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Can I use my own domain name?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! You can connect your own domain name to your TechSolutions website. Go to your site settings,
                      select "Custom Domain" and follow the instructions.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">How does the AI content generator work?</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI content generator uses advanced language models to create professional content for your
                      website. Simply describe what you need, and the AI will generate text that you can review and edit
                      before publishing.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Can I edit the HTML/CSS directly?</h3>
                    <p className="text-sm text-muted-foreground">
                      While TechSolutions is designed to be no-code, advanced users can access and edit the HTML/CSS of
                      their sites through the "Advanced" tab in the editor.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">How do I get help if I'm stuck?</h3>
                    <p className="text-sm text-muted-foreground">
                      We offer multiple support channels. You can contact our support team via the "Help & Support"
                      section, browse our documentation, or watch tutorial videos.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All FAQs
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardShell>
    </SiteLayout>
  )
}
