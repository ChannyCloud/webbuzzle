"use client"

import type { UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ContentDefaultsProps {
  form: UseFormReturn<any>
}

export function ContentDefaults({ form }: ContentDefaultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Defaults</CardTitle>
        <CardDescription>Optional settings to customize your site's appearance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="siteDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a description of your site..."
                  className="resize-none"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>Used for SEO and internal reference.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colorScheme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color Scheme</FormLabel>
              <div className="grid grid-cols-5 gap-2">
                {["#0ea5e9", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"].map((color) => (
                  <div
                    key={color}
                    className={`h-10 w-full cursor-pointer rounded-md border-2 ${field.value === color ? "border-primary" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                    onClick={() => field.onChange(color)}
                  />
                ))}
              </div>
              <div className="mt-2">
                <Input type="color" {...field} className="h-10 w-full" />
              </div>
              <FormDescription>Choose a primary color for your site.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fontStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="sans">Sans Serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose a font style for your site.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="navigationStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Navigation Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a navigation style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="topbar">Top Bar</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="hamburger">Hamburger Menu</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose how navigation appears on your site.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
