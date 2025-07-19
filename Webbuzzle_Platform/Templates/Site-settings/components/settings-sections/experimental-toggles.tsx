"use client"

import type { UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

interface ExperimentalTogglesProps {
  form: UseFormReturn<any>
}

export function ExperimentalToggles({ form }: ExperimentalTogglesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experimental Features</CardTitle>
        <CardDescription>Enable beta features for your site. These features may change or be removed.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="enableAiAssistant"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">AI Assistant for Content</FormLabel>
                <FormDescription>Auto-generates placeholder text and images for your site.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enableVersionControl"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Version Control</FormLabel>
                <FormDescription>Save and restore previous versions of your site.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enableCdn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">CDN Distribution</FormLabel>
                <FormDescription>Enable global CDN for faster loading (auto-enabled on Pro plans).</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
          <h4 className="mb-2 font-medium">Beta Features Notice</h4>
          <p className="text-sm">
            These features are in beta and may change without notice. Some features may not work as expected. By
            enabling these features, you acknowledge that they are experimental.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
