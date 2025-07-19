"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

import { AdvancedSettings } from "./settings-sections/advanced-settings"
import { ContentDefaults } from "./settings-sections/content-defaults"
import { ExperimentalToggles } from "./settings-sections/experimental-toggles"
import { GeneralSettings } from "./settings-sections/general-settings"
import { SettingsSidebar } from "./settings-sidebar"

const formSchema = z.object({
  // General Settings
  siteName: z.string().min(2, { message: "Site name is required" }),
  siteType: z.string().min(1, { message: "Site type is required" }),
  template: z.string().min(1, { message: "Template is required" }),
  subdomain: z.string().min(2, { message: "Subdomain is required" }),
  customDomain: z.string().optional(),
  favicon: z.any().optional(),
  visibility: z.enum(["public", "private"]),
  launchMode: z.enum(["draft", "live"]),

  // Content Defaults
  siteDescription: z.string().optional(),
  colorScheme: z.string().optional(),
  fontStyle: z.string().optional(),
  navigationStyle: z.string().optional(),

  // Advanced Settings
  enableCustomCode: z.boolean().default(false),
  customHtml: z.string().optional(),
  customCss: z.string().optional(),
  customJs: z.string().optional(),
  preloadContent: z.string().optional(),
  metaTags: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  googleAnalyticsId: z.string().optional(),
  passwordProtect: z.string().optional(),
  timezone: z.string().optional(),
  enableApiAccess: z.boolean().default(false),
  environment: z.enum(["development", "production"]),

  // Experimental Toggles
  enableAiAssistant: z.boolean().default(false),
  enableVersionControl: z.boolean().default(false),
  enableCdn: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export function SiteSettingsForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "",
      siteType: "",
      template: "blank",
      subdomain: "",
      customDomain: "",
      favicon: null,
      visibility: "public",
      launchMode: "draft",
      siteDescription: "",
      colorScheme: "",
      fontStyle: "",
      navigationStyle: "",
      enableCustomCode: false,
      customHtml: "",
      customCss: "",
      customJs: "",
      preloadContent: "",
      metaTags: [],
      googleAnalyticsId: "",
      passwordProtect: "",
      timezone: "",
      enableApiAccess: false,
      environment: "production",
      enableAiAssistant: false,
      enableVersionControl: false,
      enableCdn: false,
    },
  })

  function onSubmit(data: FormValues, action: "save" | "launch") {
    console.log(data)

    if (action === "save") {
      toast({
        title: "Settings saved as draft",
        description: "Your site settings have been saved.",
      })
    } else {
      toast({
        title: "Launching site builder",
        description: "Your site is being provisioned.",
      })
      // In a real app, we would redirect to the site builder after a delay
      setTimeout(() => {
        router.push("/builder")
      }, 1500)
    }
  }

  return (
    <div className="flex h-screen">
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 overflow-auto">
        <div className="container max-w-4xl py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">New Site Settings</h1>
              <p className="text-muted-foreground">Configure your new site before launching the visual builder.</p>
            </div>
          </div>

          <Separator className="my-6" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data, "launch"))}>
              <div className="space-y-8 pb-10">
                {activeTab === "general" && <GeneralSettings form={form} />}
                {activeTab === "content" && <ContentDefaults form={form} />}
                {activeTab === "advanced" && <AdvancedSettings form={form} />}
                {activeTab === "experimental" && <ExperimentalToggles form={form} />}
              </div>

              <div className="flex items-center justify-between border-t pt-6">
                <Button variant="outline" onClick={() => router.push("/dashboard")} type="button">
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onSubmit(form.getValues(), "save")} type="button">
                    Save as Draft
                  </Button>
                  <Button type="submit">Launch Site Builder</Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
