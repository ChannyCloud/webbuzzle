"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface AdvancedSettingsProps {
  form: UseFormReturn<any>
}

export function AdvancedSettings({ form }: AdvancedSettingsProps) {
  const [codeTab, setCodeTab] = useState("html")
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Optional settings for users with specific technical needs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="enableCustomCode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Custom Code Injection</FormLabel>
                <FormDescription>
                  Enable custom HTML, CSS, and JavaScript code.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("enableCustomCode") && (
          <div className="space-y-4 rounded-lg border p-4">
            <Tabs value={codeTab} onValueChange={setCodeTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>
              <TabsContent value="html">
                <FormField
                  control={form.control}
                  name="customHtml"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="<!-- Add custom HTML here -->"
                          className="font-mono h-40 resize-none"
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormDescription>
                        Custom HTML will be injected into the <head> of your site.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="css">
                <FormField
                  control={form.control}
                  name="customCss"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="/* Add custom CSS here */"
                          className="font-mono h-40 resize-none"
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormDescription>
                        Custom CSS will be appended to your site's styles.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="js">
                <FormField
                  control={form.control}
                  name="customJs"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="// Add custom JavaScript here"
                          className="font-mono h-40 resize-none"
                          value={field.value || ""}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormDescription>
                        Custom JavaScript will be executed on your site.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}

        <FormField
          control={form.control}
          name="preloadContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preload Content From Previous Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="project1">My Portfolio</SelectItem>
                  <SelectItem value="project2">Company Website</SelectItem>
                  <SelectItem value="project3">E-commerce Store</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Import content and settings from an existing project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Tags</FormLabel>
              <FormDescription className="mb-2">
                Add custom meta tags for SEO or analytics.
              </FormDescription>
              <div className="space-y-2">
                {field.value?.map((tag: any, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Key"
                      value={tag.key}
                      onChange={(e) => {
                        const newTags = [...field.value]
                        newTags[index].key = e.target.value
                        field.onChange(newTags)
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value"
                      value={tag.value}
                      onChange={(e) => {
                        const newTags = [...field.value]
                        newTags[index].value = e.target.value
                        field.onChange(newTags)
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      onClick={() => {
                        const newTags = [...field.value]
                        newTags.splice(index, 1)
                        field.onChange(newTags)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    const currentTags = field.value || []
                    field.onChange([...currentTags, { key: "", value: "" }])
                  }}
                  className="flex w-full items-center justify-center"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Meta Tag
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="googleAnalyticsId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Analytics ID</FormLabel>
                <FormControl>
                  <Input placeholder="G-XXXXXXXXXX" {...field} />
                </FormControl>
                <FormDescription>
                  Add your Google Analytics ID for tracking.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordProtect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Protect Site</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Set a password (optional)" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Require a password to access your site.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone / Locale</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="america/new_york">America/New York</SelectItem>
                    <SelectItem value="america/los_angeles">America/Los Angeles</SelectItem>
                    <SelectItem value="europe/london">Europe/London</SelectItem>
                    <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Used for timestamp formatting and localization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment <span className="text-red-500">*</span></FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Used for feature toggles and flags.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="enableApiAccess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable API Access</FormLabel>
                <FormDescription>
                  Generate read/write API key for site-specific integrations.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("enableApiAccess") && (
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium">API Key</div>
            <div className="flex gap-2">
              <Input 
                value="••••••••••••••••••••••••••••••" 
                readOnly 
                className="font-mono"
              />
              <Button variant="outline" size="sm" type="button">
                Generate
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              API keys will be generated when you save or launch your site.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
