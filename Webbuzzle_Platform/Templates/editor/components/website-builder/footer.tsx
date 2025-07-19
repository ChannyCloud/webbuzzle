import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white p-2 flex items-center justify-between text-sm text-gray-500">
      <div>
        <span>Untitled Website</span>
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Page
        </Button>
        <Select defaultValue="home">
          <SelectTrigger className="w-[180px] h-8 text-xs">
            <SelectValue placeholder="Select page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="about">About</SelectItem>
            <SelectItem value="contact">Contact</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </footer>
  )
}
