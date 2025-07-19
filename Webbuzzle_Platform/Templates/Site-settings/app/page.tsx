"use client"

import { useState } from "react"
import { Beaker, Check, Code2, FileText, Globe, Home, Lock, Plus, Search, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SiteSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [metaTags, setMetaTags] = useState([{ key: "", value: "" }])
  const [enableCustomCode, setEnableCustomCode] = useState(false)
  const [codeTab, setCodeTab] = useState("html")
  const [domainModalOpen, setDomainModalOpen] = useState(false)
  const [domainSearch, setDomainSearch] = useState("")
  const [searchResults, setSearchResults] = useState<{ domain: string; available: boolean; price: string }[]>([])
  const [selectedDomain, setSelectedDomain] = useState("")

  const addMetaTag = () => {
    setMetaTags([...metaTags, { key: "", value: "" }])
  }

  const removeMetaTag = (index: number) => {
    const newTags = [...metaTags]
    newTags.splice(index, 1)
    setMetaTags(newTags)
  }

  const updateMetaTag = (index: number, field: "key" | "value", value: string) => {
    const newTags = [...metaTags]
    newTags[index][field] = value
    setMetaTags(newTags)
  }

  const handleDomainSearch = () => {
    // Simulate domain search results
    const domain = domainSearch.toLowerCase().trim()
    if (!domain) return

    const tlds = [".com", ".net", ".org", ".io", ".tech"]
    const results = tlds.map((tld) => ({
      domain: `${domain}${tld}`,
      available: Math.random() > 0.3, // Randomly determine availability
      price: `$${Math.floor(Math.random() * 20) + 10}.99/year`, // Random price between $10.99 and $29.99
    }))

    setSearchResults(results)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold tracking-tight">New Site Settings</h1>
      <p className="text-muted-foreground">Configure your new site before launching the visual builder.</p>

      <Separator className="my-6" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 space-y-1">
          <Button
            variant={activeTab === "general" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("general")}
          >
            <Home className="mr-2 h-4 w-4" />
            General Settings
          </Button>
          <Button
            variant={activeTab === "content" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("content")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Content & Design
          </Button>
          <Button
            variant={activeTab === "advanced" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("advanced")}
          >
            <Code2 className="mr-2 h-4 w-4" />
            Advanced Settings
          </Button>
          <Button
            variant={activeTab === "experimental" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("experimental")}
          >
            <Beaker className="mr-2 h-4 w-4" />
            Experimental Features
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>These settings are required to create your site.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">
                    Site Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="siteName" placeholder="My Awesome Site" />
                  <p className="text-sm text-muted-foreground">Used to identify your site internally and externally.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteType">
                    Site Type <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger id="siteType">
                      <SelectValue placeholder="Select a site type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Used to suggest templates and features.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">
                    Template <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="blank">
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blank">Blank Template</SelectItem>
                      <SelectItem value="modern">Modern Business</SelectItem>
                      <SelectItem value="minimal">Minimal Portfolio</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce Store</SelectItem>
                      <SelectItem value="blog">Blog Standard</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Start with a template or a blank canvas.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subdomain">
                      Default Subdomain <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex">
                      <Input id="subdomain" placeholder="sitename" />
                      <div className="flex items-center bg-muted px-3 text-sm">.techsolutions.site</div>
                    </div>
                    <p className="text-sm text-muted-foreground">Your site will be available at this address.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customDomain">Custom Domain</Label>
                    <div className="flex gap-2">
                      <Input id="customDomain" placeholder="example.com" />
                      <div className="flex gap-1">
                        <Button type="button" variant="outline" size="sm" className="whitespace-nowrap">
                          Connect
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="whitespace-nowrap"
                          onClick={() => setDomainModalOpen(true)}
                        >
                          Buy Domain
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Connect an existing domain or purchase a new one.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded border bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Icon</span>
                    </div>
                    <Input id="favicon" type="file" accept="image/*" />
                  </div>
                  <p className="text-sm text-muted-foreground">Upload a favicon for your site (optional).</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label>
                      Site Visibility <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup defaultValue="public">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="visibility-public" />
                        <Label htmlFor="visibility-public" className="font-normal flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <span>Public</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="visibility-private" />
                        <Label htmlFor="visibility-private" className="font-normal flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          <span>Private</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground">Control who can access your site.</p>
                  </div>

                  <div className="space-y-3">
                    <Label>
                      Launch Mode <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup defaultValue="draft">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="draft" id="mode-draft" />
                        <Label htmlFor="mode-draft" className="font-normal">
                          Draft
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="live" id="mode-live" />
                        <Label htmlFor="mode-live" className="font-normal">
                          Live
                        </Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground">Draft mode allows you to build without publishing.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "content" && (
            <Card>
              <CardHeader>
                <CardTitle>Content & Design Settings</CardTitle>
                <CardDescription>Optional settings to customize your site's appearance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    placeholder="Enter a description of your site..."
                    className="resize-none min-h-[100px]"
                  />
                  <p className="text-sm text-muted-foreground">Used for SEO and internal reference.</p>
                </div>

                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["#0ea5e9", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"].map((color) => (
                      <div
                        key={color}
                        className="h-10 w-full cursor-pointer rounded-md border-2 border-transparent"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Input type="color" className="h-10 w-full" />
                  </div>
                  <p className="text-sm text-muted-foreground">Choose a primary color for your site.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fontStyle">Font Style</Label>
                    <Select>
                      <SelectTrigger id="fontStyle">
                        <SelectValue placeholder="Select a font style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System Default</SelectItem>
                        <SelectItem value="sans">Sans Serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                        <SelectItem value="display">Display</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Choose a font style for your site.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="navigationStyle">Navigation Style</Label>
                    <Select>
                      <SelectTrigger id="navigationStyle">
                        <SelectValue placeholder="Select a navigation style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="topbar">Top Bar</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="hamburger">Hamburger Menu</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Choose how navigation appears on your site.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "advanced" && (
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Optional settings for users with specific technical needs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Custom Code Injection</Label>
                    <p className="text-sm text-muted-foreground">Enable custom HTML, CSS, and JavaScript code.</p>
                  </div>
                  <Switch checked={enableCustomCode} onCheckedChange={setEnableCustomCode} />
                </div>

                {enableCustomCode && (
                  <div className="space-y-4 rounded-lg border p-4">
                    <Tabs value={codeTab} onValueChange={setCodeTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="html">HTML</TabsTrigger>
                        <TabsTrigger value="css">CSS</TabsTrigger>
                        <TabsTrigger value="js">JavaScript</TabsTrigger>
                      </TabsList>
                      <TabsContent value="html">
                        <Textarea placeholder="<!-- Add custom HTML here -->" className="font-mono h-40 resize-none" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Custom HTML will be injected into the <code>{"<head>"}</code> of your site.
                        </p>
                      </TabsContent>
                      <TabsContent value="css">
                        <Textarea placeholder="/* Add custom CSS here */" className="font-mono h-40 resize-none" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Custom CSS will be appended to your site's styles.
                        </p>
                      </TabsContent>
                      <TabsContent value="js">
                        <Textarea placeholder="// Add custom JavaScript here" className="font-mono h-40 resize-none" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Custom JavaScript will be executed on your site.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="preloadContent">Preload Content From Previous Project</Label>
                  <Select>
                    <SelectTrigger id="preloadContent">
                      <SelectValue placeholder="Select a project (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="project1">My Portfolio</SelectItem>
                      <SelectItem value="project2">Company Website</SelectItem>
                      <SelectItem value="project3">E-commerce Store</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Import content and settings from an existing project.</p>
                </div>

                <div className="space-y-2">
                  <Label>Meta Tags</Label>
                  <p className="text-sm text-muted-foreground mb-2">Add custom meta tags for SEO or analytics.</p>
                  <div className="space-y-2">
                    {metaTags.map((tag, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Key"
                          value={tag.key}
                          onChange={(e) => updateMetaTag(index, "key", e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Value"
                          value={tag.value}
                          onChange={(e) => updateMetaTag(index, "value", e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon" type="button" onClick={() => removeMetaTag(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={addMetaTag}
                      className="flex w-full items-center justify-center"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Meta Tag
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input id="googleAnalyticsId" placeholder="G-XXXXXXXXXX" />
                    <p className="text-sm text-muted-foreground">Add your Google Analytics ID for tracking.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordProtect">Password Protect Site</Label>
                    <Input id="passwordProtect" type="password" placeholder="Set a password (optional)" />
                    <p className="text-sm text-muted-foreground">Require a password to access your site.</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone / Locale</Label>
                    <Select>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="america/new_york">America/New York</SelectItem>
                        <SelectItem value="america/los_angeles">America/Los Angeles</SelectItem>
                        <SelectItem value="europe/london">Europe/London</SelectItem>
                        <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Used for timestamp formatting and localization.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="environment">
                      Environment <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="production">
                      <SelectTrigger id="environment">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Used for feature toggles and flags.</p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate read/write API key for site-specific integrations.
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "experimental" && (
            <Card>
              <CardHeader>
                <CardTitle>Experimental Features</CardTitle>
                <CardDescription>
                  Enable beta features for your site. These features may change or be removed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI Assistant for Content</Label>
                    <p className="text-sm text-muted-foreground">
                      Auto-generates placeholder text and images for your site.
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Version Control</Label>
                    <p className="text-sm text-muted-foreground">Save and restore previous versions of your site.</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">CDN Distribution</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable global CDN for faster loading (auto-enabled on Pro plans).
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                  <h4 className="mb-2 font-medium">Beta Features Notice</h4>
                  <p className="text-sm">
                    These features are in beta and may change without notice. Some features may not work as expected. By
                    enabling these features, you acknowledge that they are experimental.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t mt-8 pt-6">
        <Button variant="outline">Back to Dashboard</Button>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Launch Site Builder</Button>
        </div>
      </div>

      {/* Domain Purchase Modal */}
      <Dialog open={domainModalOpen} onOpenChange={setDomainModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Search and Purchase a Domain</DialogTitle>
            <DialogDescription>
              Find the perfect domain name for your site. Prices start at $10.99/year.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a domain name"
                value={domainSearch}
                onChange={(e) => setDomainSearch(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={handleDomainSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Available Domains</h3>
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <div
                      key={result.domain}
                      className={`flex items-center justify-between p-3 rounded-md border ${
                        selectedDomain === result.domain ? "border-primary bg-primary/5" : ""
                      } ${!result.available ? "opacity-50" : "cursor-pointer"}`}
                      onClick={() => {
                        if (result.available) {
                          setSelectedDomain(result.domain)
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {result.available ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{result.domain}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{result.price}</span>
                        {selectedDomain === result.domain && <div className="h-4 w-4 rounded-full bg-primary"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {domainSearch && !searchResults.length && (
              <div className="text-center py-8 text-muted-foreground">
                Enter a domain name and click search to see available options.
              </div>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setDomainModalOpen(false)}>
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              {selectedDomain && (
                <div className="text-sm">
                  Selected: <span className="font-medium">{selectedDomain}</span>
                </div>
              )}
              <Button
                type="button"
                disabled={!selectedDomain}
                onClick={() => {
                  // In a real app, this would initiate the purchase process
                  alert(`Proceeding to purchase ${selectedDomain}`)
                  setDomainModalOpen(false)
                }}
              >
                Purchase Domain
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
