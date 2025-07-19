"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Sparkles, Code, Bot } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BetaSettings() {
  function handleToggleBeta(feature: string, enabled: boolean) {
    toast({
      title: `${feature} ${enabled ? "enabled" : "disabled"}`,
      description: `You have ${enabled ? "enabled" : "disabled"} the ${feature} beta feature.`,
    })
  }

  return (
    <Card id="beta-settings" className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Beta Features</CardTitle>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            <Sparkles className="mr-1 h-3 w-3" /> Experimental
          </Badge>
        </div>
        <CardDescription>Try out experimental features before they're officially released.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Beta features may be unstable and could change or be removed at any time. Use at your own risk.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="flex items-start justify-between space-x-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <Label htmlFor="ai-assistant" className="text-base font-medium">
                  AI Assistant
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Enable the AI assistant to help you navigate the dashboard and provide suggestions.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">New</Badge>
                <Badge variant="outline">Productivity</Badge>
              </div>
            </div>
            <Switch id="ai-assistant" onCheckedChange={(checked) => handleToggleBeta("AI Assistant", checked)} />
          </div>

          <div className="flex items-start justify-between space-x-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9H21M9 21V9M7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Label htmlFor="new-ui" className="text-base font-medium">
                  New UI Layout
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Try our redesigned user interface with improved navigation and visual design.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">Popular</Badge>
                <Badge variant="outline">UI/UX</Badge>
              </div>
            </div>
            <Switch id="new-ui" onCheckedChange={(checked) => handleToggleBeta("New UI Layout", checked)} />
          </div>

          <div className="flex items-start justify-between space-x-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <Label htmlFor="developer-mode" className="text-base font-medium">
                  Developer Mode
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Access advanced debugging tools, logs, and developer features.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">Technical</Badge>
                <Badge variant="outline">Advanced</Badge>
              </div>
            </div>
            <Switch id="developer-mode" onCheckedChange={(checked) => handleToggleBeta("Developer Mode", checked)} />
          </div>

          <div className="flex items-start justify-between space-x-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Label htmlFor="advanced-analytics" className="text-base font-medium">
                  Advanced Analytics
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get access to detailed analytics and insights about your site performance.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">Beta</Badge>
                <Badge variant="outline">Analytics</Badge>
              </div>
            </div>
            <Switch
              id="advanced-analytics"
              onCheckedChange={(checked) => handleToggleBeta("Advanced Analytics", checked)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Reset All</Button>
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}
