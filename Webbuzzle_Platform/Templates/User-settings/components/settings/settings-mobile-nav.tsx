"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

export function SettingsMobileNav() {
  const [open, setOpen] = useState(false)

  const scrollToSection = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="grid gap-4 py-4">
          <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("profile-settings")}>
            Profile
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("account-settings")}>
            Account
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("billing-settings")}>
            Billing
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("notification-settings")}>
            Notifications
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("security-settings")}>
            Security
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("beta-settings")}>
            Beta Features
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
