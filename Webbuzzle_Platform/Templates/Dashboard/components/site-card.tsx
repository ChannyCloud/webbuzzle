"use client"

import { Copy, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"

interface SiteCardProps {
  site: {
    id: string
    name: string
    template: string
    lastUpdated: string
    status: string
    url: string
  }
  onCopyLink: () => void
}

export function SiteCard({ site, onCopyLink }: SiteCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{site.name}</CardTitle>
            <CardDescription>
              {site.template} template • Updated {site.lastUpdated}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>Preview</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2">
          <Badge variant={site.status === "Published" ? "default" : "outline"}>{site.status}</Badge>
          {site.status === "Published" && (
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="truncate max-w-[180px]">{site.url}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={onCopyLink}>
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy URL</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/editor/${site.id}`}>
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/preview/${site.id}`}>
            <Eye className="mr-2 h-3 w-3" />
            Preview
          </Link>
        </Button>
        <Toggle
          aria-label={site.status === "Published" ? "Unpublish site" : "Publish site"}
          pressed={site.status === "Published"}
        >
          {site.status === "Published" ? "Unpublish" : "Publish"}
        </Toggle>
      </CardFooter>
    </Card>
  )
}
