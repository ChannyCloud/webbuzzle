"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Github, ChromeIcon as Google, Laptop, LogOut, Smartphone, Tablet, Check } from "lucide-react"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type PasswordFormValues = z.infer<typeof passwordFormSchema>

const defaultValues: Partial<PasswordFormValues> = {}

const loginHistory = [
  { date: "May 18, 2025", ip: "192.168.1.1", device: "laptop", location: "New York, USA" },
  { date: "May 15, 2025", ip: "192.168.1.2", device: "smartphone", location: "New York, USA" },
  { date: "May 10, 2025", ip: "192.168.1.3", device: "tablet", location: "Boston, USA" },
]

const connectedAccounts = [
  { name: "Google", connected: true, icon: Google },
  { name: "GitHub", connected: false, icon: Github },
]

const activeSessions = [
  { device: "Chrome on Windows", lastActive: "Now", current: true },
  { device: "Firefox on macOS", lastActive: "2 hours ago", current: false },
  { device: "Safari on iPhone", lastActive: "1 day ago", current: false },
]

export function AccountSettings() {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: PasswordFormValues) {
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })
    console.log(data)
    form.reset()
  }

  function getDeviceIcon(device: string) {
    switch (device) {
      case "laptop":
        return <Laptop className="h-4 w-4" />
      case "smartphone":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Laptop className="h-4 w-4" />
    }
  }

  function handleToggle2FA(checked: boolean) {
    toast({
      title: checked ? "2FA Enabled" : "2FA Disabled",
      description: checked
        ? "Two-factor authentication has been enabled."
        : "Two-factor authentication has been disabled.",
    })
  }

  function handleConnectAccount(account: string) {
    toast({
      title: `Connect ${account}`,
      description: `Redirecting to ${account} for authentication...`,
    })
  }

  function handleDisconnectAccount(account: string) {
    toast({
      title: `Disconnect ${account}`,
      description: `${account} account has been disconnected.`,
    })
  }

  function handleLogoutSession(device: string) {
    toast({
      title: "Session Terminated",
      description: `${device} session has been logged out.`,
    })
  }

  function handleLogoutAll() {
    toast({
      title: "All Sessions Terminated",
      description: "You have been logged out from all devices except this one.",
    })
  }

  return (
    <Card id="account-settings" className="mb-8">
      <CardHeader>
        <CardTitle>Account & Authentication</CardTitle>
        <CardDescription>Manage your account credentials and security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Address</h3>
          <div className="flex items-center gap-2">
            <Input value="john.doe@example.com" readOnly className="max-w-md" />
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
              <Check className="mr-1 h-3 w-3" /> Verified
            </Badge>
          </div>
          <Button variant="outline" className="mt-2">
            Change Email
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Change Password</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Update Password</Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <div className="flex items-center space-x-2">
            <Switch onCheckedChange={handleToggle2FA} id="2fa" />
            <label
              htmlFor="2fa"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Enable Two-Factor Authentication
            </label>
          </div>
          <p className="text-sm text-muted-foreground">
            Protect your account with an additional layer of security. When enabled, you'll be required to enter a code
            from your authenticator app when logging in.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Login History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginHistory.map((login, index) => (
                <TableRow key={index}>
                  <TableCell>{login.date}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {getDeviceIcon(login.device)}
                    <span className="capitalize">{login.device}</span>
                  </TableCell>
                  <TableCell>{login.ip}</TableCell>
                  <TableCell>{login.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Connected Accounts</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {connectedAccounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <account.icon className="h-5 w-5" />
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.connected ? "Connected" : "Not connected"}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    account.connected ? handleDisconnectAccount(account.name) : handleConnectAccount(account.name)
                  }
                >
                  {account.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Active Sessions</h3>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleLogoutAll}>
              <LogOut className="h-4 w-4" />
              Log out all other sessions
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session, index) => (
                <TableRow key={index}>
                  <TableCell>{session.device}</TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell>
                    {session.current ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Current
                      </Badge>
                    ) : (
                      <Badge variant="outline">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleLogoutSession(session.device)}
                      >
                        Log out
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
