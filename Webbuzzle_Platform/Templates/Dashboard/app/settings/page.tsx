"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Bell, CreditCard, Lock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SiteLayout } from "@/components/site-layout"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    })
  }

  const handleSaveBilling = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Billing information updated",
      description: "Your billing information has been saved.",
    })
  }

  return (
    <SiteLayout>
      <DashboardShell>
        <DashboardHeader heading="Settings" description="Manage your account settings and preferences.">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </DashboardHeader>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="password">
              <Lock className="mr-2 h-4 w-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account information and public profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="johndoe" />
                    <p className="text-xs text-muted-foreground">
                      This will be used for your site URLs: username.techsolutions.site
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about yourself"
                      defaultValue="Web designer and developer based in New York."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <img src="/placeholder.svg?height=64&width=64" alt="Profile" />
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        Change Picture
                      </Button>
                    </div>
                  </div>
                  <Button type="submit">Save Profile</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSavePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with an additional security layer.
                    </p>
                  </div>
                  <Toggle aria-label="Toggle two-factor authentication" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you want to be notified.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSaveNotifications} className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-updates">Product Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive emails about new features and improvements.
                        </p>
                      </div>
                      <Toggle id="email-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-marketing">Marketing Emails</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive promotional offers and marketing content.
                        </p>
                      </div>
                      <Toggle id="email-marketing" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-security">Security Alerts</Label>
                        <p className="text-xs text-muted-foreground">Get notified about important security events.</p>
                      </div>
                      <Toggle id="email-security" defaultChecked />
                    </div>
                  </div>

                  <h3 className="text-sm font-medium mt-6">In-App Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-comments">Comments</Label>
                        <p className="text-xs text-muted-foreground">Notify when someone comments on your site.</p>
                      </div>
                      <Toggle id="app-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-mentions">Mentions</Label>
                        <p className="text-xs text-muted-foreground">Notify when someone mentions you.</p>
                      </div>
                      <Toggle id="app-mentions" defaultChecked />
                    </div>
                  </div>

                  <Button type="submit">Save Preferences</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Manage your subscription and billing details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">$19.99/month</p>
                      <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                        <li>• Unlimited websites</li>
                        <li>• Custom domains</li>
                        <li>• Advanced analytics</li>
                        <li>• Priority support</li>
                      </ul>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Plan
                    </Button>
                  </div>
                  <div className="mt-4 text-sm">
                    <p>
                      Next billing date: <span className="font-medium">June 15, 2025</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Update your payment information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSaveBilling} className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-8 w-12 rounded bg-muted flex items-center justify-center">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Input id="billing-address" defaultValue="123 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-city">City</Label>
                      <Input id="billing-city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-state">State</Label>
                      <Input id="billing-state" defaultValue="NY" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing-zip">ZIP Code</Label>
                      <Input id="billing-zip" defaultValue="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-country">Country</Label>
                      <Input id="billing-country" defaultValue="United States" />
                    </div>
                  </div>

                  <Button type="submit">Save Billing Information</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices and payment history.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Invoice #12345</p>
                        <p className="text-xs text-muted-foreground">May 15, 2025</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-medium">$19.99</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Invoice #12344</p>
                        <p className="text-xs text-muted-foreground">April 15, 2025</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-medium">$19.99</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Invoice #12343</p>
                        <p className="text-xs text-muted-foreground">March 15, 2025</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm font-medium">$19.99</p>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Invoices
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </SiteLayout>
  )
}
