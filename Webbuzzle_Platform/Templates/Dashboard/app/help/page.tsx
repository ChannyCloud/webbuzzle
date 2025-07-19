"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, BookOpen, HelpCircle, Mail, MessageSquare, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SiteLayout } from "@/components/site-layout"

export default function HelpPage() {
  const { toast } = useToast()

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you as soon as possible.",
    })
    // Reset form here
  }

  return (
    <SiteLayout>
      <DashboardShell>
        <DashboardHeader
          heading="Help & Support"
          description="Get help with TechSolutions and find answers to your questions."
        >
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </DashboardHeader>

        <div className="flex flex-col space-y-5">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4 text-center sm:px-16">
                <HelpCircle className="h-12 w-12 text-primary" />
                <CardTitle className="text-2xl">How can we help you today?</CardTitle>
                <CardDescription className="text-base">
                  Search our knowledge base or browse common topics below
                </CardDescription>
                <div className="flex w-full max-w-md items-center space-x-2">
                  <Input placeholder="Search for help..." className="h-10" />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>Browse our comprehensive documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline">
                    <Link href="#">Getting Started Guide</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Template Customization</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Publishing Your Website</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Using Custom Domains</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">SEO Best Practices</Link>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View All Documentation
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Video Tutorials</CardTitle>
                <CardDescription>Learn with step-by-step video guides</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline">
                    <Link href="#">Building Your First Website</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Working with the Editor</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Adding Custom Elements</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Mobile Optimization Tips</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Using the AI Assistant</Link>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn">View All Tutorials</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Community Forum</CardTitle>
                <CardDescription>Connect with other TechSolutions users</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="text-primary hover:underline">
                    <Link href="#">Tips & Tricks</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Showcase Your Site</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Feature Requests</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">Troubleshooting</Link>
                  </li>
                  <li className="text-primary hover:underline">
                    <Link href="#">General Discussion</Link>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Visit Community Forum
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="contact" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>
                    Submit a support ticket and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Brief description of your issue" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a category</option>
                        <option value="account">Account Issues</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="editor">Website Editor</option>
                        <option value="publishing">Publishing & Domains</option>
                        <option value="technical">Technical Problems</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-sm font-medium">
                        Priority
                      </label>
                      <select
                        id="priority"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="low">Low - General question</option>
                        <option value="medium">Medium - Need help soon</option>
                        <option value="high">High - Urgent issue</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Please describe your issue in detail"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="attachment" className="text-sm font-medium">
                        Attachment (optional)
                      </label>
                      <Input id="attachment" type="file" />
                      <p className="text-xs text-muted-foreground">
                        You can attach screenshots or other files to help us understand your issue.
                      </p>
                    </div>
                    <Button type="submit">
                      <Mail className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find quick answers to common questions.</CardDescription>
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
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">What payment methods do you accept?</h3>
                    <p className="text-sm text-muted-foreground">
                      We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and in some
                      regions, we support bank transfers and other local payment methods.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Can I cancel my subscription at any time?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes, you can cancel your subscription at any time from your account settings. Your service will
                      continue until the end of your current billing period.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Is there a limit to how many websites I can create?</h3>
                    <p className="text-sm text-muted-foreground">
                      The number of websites you can create depends on your subscription plan. Free accounts can create
                      1 website, while paid plans offer different limits.
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
