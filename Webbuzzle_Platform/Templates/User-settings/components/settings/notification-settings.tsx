"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationSettings() {
  function handleSaveChanges() {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    })
  }

  return (
    <Card id="notification-settings" className="mb-8">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Control how and when you receive notifications from the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="inapp">In-App</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-new-features" className="flex flex-col space-y-1">
                    <span>New Features</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive updates about new platform features and improvements.
                    </span>
                  </Label>
                  <Switch id="email-new-features" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-billing-alerts" className="flex flex-col space-y-1">
                    <span>Billing Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get notified about upcoming charges and billing issues.
                    </span>
                  </Label>
                  <Switch id="email-billing-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-site-performance" className="flex flex-col space-y-1">
                    <span>Site Performance</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive alerts about your site's performance and uptime.
                    </span>
                  </Label>
                  <Switch id="email-site-performance" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-newsletters" className="flex flex-col space-y-1">
                    <span>Newsletters</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive our monthly newsletter with tips and best practices.
                    </span>
                  </Label>
                  <Switch id="email-newsletters" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">SMS Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sms-security-alerts" className="flex flex-col space-y-1">
                    <span>Security Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get SMS alerts for suspicious login attempts.
                    </span>
                  </Label>
                  <Switch id="sms-security-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sms-billing-alerts" className="flex flex-col space-y-1">
                    <span>Billing Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get SMS notifications for payment failures.
                    </span>
                  </Label>
                  <Switch id="sms-billing-alerts" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sms-site-down" className="flex flex-col space-y-1">
                    <span>Site Down Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get SMS notifications when your site goes down.
                    </span>
                  </Label>
                  <Switch id="sms-site-down" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inapp" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">In-App Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="inapp-comments" className="flex flex-col space-y-1">
                    <span>Comments & Mentions</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get notified when someone comments or mentions you.
                    </span>
                  </Label>
                  <Switch id="inapp-comments" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="inapp-updates" className="flex flex-col space-y-1">
                    <span>Platform Updates</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get notified about new features and improvements.
                    </span>
                  </Label>
                  <Switch id="inapp-updates" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="inapp-reminders" className="flex flex-col space-y-1">
                    <span>Task Reminders</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get reminders about upcoming tasks and deadlines.
                    </span>
                  </Label>
                  <Switch id="inapp-reminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="inapp-team" className="flex flex-col space-y-1">
                    <span>Team Activity</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Get notified about team member actions.
                    </span>
                  </Label>
                  <Switch id="inapp-team" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium">Marketing Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing-email" className="flex flex-col space-y-1">
                <span>Marketing Emails</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive emails about new products, features, and offers.
                </span>
              </Label>
              <Switch id="marketing-email" />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="marketing-partners" className="flex flex-col space-y-1">
                <span>Partner Offers</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive offers from our trusted partners.
                </span>
              </Label>
              <Switch id="marketing-partners" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
