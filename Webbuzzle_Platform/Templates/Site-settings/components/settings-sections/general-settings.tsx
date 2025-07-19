"use client"

import type { UseFormReturn } from "react-hook-form"
import { Globe, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GeneralSettingsProps {
  form: UseFormReturn<any>
}

export function GeneralSettings({ form }: GeneralSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>These settings are required to create your site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Site Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Site" {...field} />
              </FormControl>
              <FormDescription>Used to identify your site internally and externally.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siteType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Site Type <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a site type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="store">Store</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Used to suggest templates and features.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Template <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="blank">Blank Template</SelectItem>
                  <SelectItem value="modern">Modern Business</SelectItem>
                  <SelectItem value="minimal">Minimal Portfolio</SelectItem>
                  <SelectItem value="ecommerce">E-Commerce Store</SelectItem>
                  <SelectItem value="blog">Blog Standard</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Start with a template or a blank canvas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="subdomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Default Subdomain <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input {...field} />
                    <div className="flex items-center bg-muted px-3 text-sm">.techsolutions.site</div>
                  </div>
                </FormControl>
                <FormDescription>Your site will be available at this address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customDomain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Domain</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="example.com" {...field} />
                  </FormControl>
                  <Button type="button" variant="outline" size="sm" className="mt-0">
                    Connect
                  </Button>
                </div>
                <FormDescription>Optional: Connect your own domain.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="favicon"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Favicon</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 overflow-hidden rounded border bg-muted">
                    {value ? (
                      <img
                        src={typeof value === "string" ? value : URL.createObjectURL(value)}
                        alt="Favicon preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        Icon
                      </div>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onChange(file)
                      }
                    }}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>Upload a favicon for your site (optional).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Site Visibility <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="public" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>Public</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="private" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <span>Private</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>Control who can access your site.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="launchMode"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Launch Mode <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="draft" />
                      </FormControl>
                      <FormLabel className="font-normal">Draft</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="live" />
                      </FormControl>
                      <FormLabel className="font-normal">Live</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>Draft mode allows you to build without publishing.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
