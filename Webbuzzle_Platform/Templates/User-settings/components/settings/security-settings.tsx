"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, AlertTriangle } from "lucide-react"
import { useState } from "react"

const activityLog = [
  {
    action: "Password changed",
    date: "May 18, 2025",
    ip: "192.168.1.1",
    location: "New York, USA",
  },
  {
    action: "Profile updated",
    date: "May 15, 2025",
    ip: "192.168.1.2",
    location: "New York, USA",
  },
  {
    action: "Login successful",
    date: "May 10, 2025",
    ip: "192.168.1.3",
    location: "Boston, USA",
  },
]

export function SecuritySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    analyticsOptOut: false,
    adPersonalization: false,
  })

  function handleExportData() {
    toast({
      title: "Data export requested",
      description: "Your data export has been initiated. You'll receive an email when it's ready.",
    })
  }

  function handleDeleteAccount() {
    toast({
      title: "Account deletion initiated",
      description:
        "Your account will be permanently deleted in 30 days. You can cancel this action anytime before then.",
      variant: "destructive",
    })
  }

  function handlePrivacyToggle(setting: keyof typeof privacySettings) {
    setPrivacySettings((prev) => {
      const newSettings = { ...prev, [setting]: !prev[setting] }

      toast({
        title: "Privacy setting updated",
        description: `${setting} has been ${newSettings[setting] ? "enabled" : "disabled"}.`,
      })

      return newSettings
    })
  }

  return (
    <Card id="security-settings" className="mb-8">
      <CardHeader>
        <CardTitle>Security & Privacy</CardTitle>
        <CardDescription>Manage your security preferences and privacy settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Management</h3>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Request Data Export
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <p className="text-sm text-muted-foreground">
            Deleting your account will remove all your data from our platform. This action cannot be undone.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Activity Log</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.ip}</TableCell>
                  <TableCell>{activity.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" size="sm">
            View Full Activity Log
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Privacy Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="profile-visibility" className="flex flex-col space-y-1">
                <span>Profile Visibility</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Make your profile visible to other users on the platform.
                </span>
              </Label>
              <Switch
                id="profile-visibility"
                checked={privacySettings.profileVisibility}
                onCheckedChange={() => handlePrivacyToggle("profileVisibility")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="analytics-opt-out" className="flex flex-col space-y-1">
                <span>Analytics Opt-Out</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Opt out of analytics tracking on our platform.
                </span>
              </Label>
              <Switch
                id="analytics-opt-out"
                checked={privacySettings.analyticsOptOut}
                onCheckedChange={() => handlePrivacyToggle("analyticsOptOut")}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="ad-personalization" className="flex flex-col space-y-1">
                <span>Ad Personalization</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Allow us to personalize ads based on your activity.
                </span>
              </Label>
              <Switch
                id="ad-personalization"
                checked={privacySettings.adPersonalization}
                onCheckedChange={() => handlePrivacyToggle("adPersonalization")}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
