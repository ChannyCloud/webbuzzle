"use client"

// Projects page template - displays project data with filtering and actions.
// In the functional version, this would fetch real project data from an API.

import { useState } from "react"
import { DashboardLayout } from "../DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ExternalLink, Edit, Eye, FolderKanban, Plus } from "lucide-react"
import { EmptyState } from "../components/empty-state"
import { PermissionButton } from "../components/permission-tooltip"
import { useToast } from "../components/ui/use-toast"

export default function ProjectsPage() {
  // State for project view modal - would be connected to real data in functional version
  const [viewProject, setViewProject] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [createProjectOpen, setCreateProjectOpen] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { toast } = useToast()

  // Mock project data - would be fetched from an API in the functional version
  const projects = showEmptyState
    ? []
    : [
        {
          id: "PRJ-2023-001",
          name: "Corporate Website Redesign",
          owner: "John Doe",
          domain: "acmecorp.com",
          pages: 24,
          status: "Active",
          lastUpdated: "2023-05-15",
        },
        {
          id: "PRJ-2023-002",
          name: "E-commerce Platform",
          owner: "Jane Smith",
          domain: "globexshop.com",
          pages: 56,
          status: "Active",
          lastUpdated: "2023-05-14",
        },
        {
          id: "PRJ-2023-003",
          name: "Internal Dashboard",
          owner: "Alex Johnson",
          domain: "dashboard.wayne.com",
          pages: 18,
          status: "In Development",
          lastUpdated: "2023-05-12",
        },
        {
          id: "PRJ-2023-004",
          name: "Mobile App Landing Page",
          owner: "Sarah Williams",
          domain: "starkapp.com",
          pages: 5,
          status: "Active",
          lastUpdated: "2023-05-10",
        },
        {
          id: "PRJ-2023-005",
          name: "Product Documentation",
          owner: "Michael Brown",
          domain: "docs.umbrella.com",
          pages: 42,
          status: "Maintenance",
          lastUpdated: "2023-05-08",
        },
        {
          id: "PRJ-2023-006",
          name: "Marketing Campaign Site",
          owner: "Emily Davis",
          domain: "newproduct.cyberdyne.com",
          pages: 12,
          status: "Active",
          lastUpdated: "2023-05-05",
        },
      ]

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Development":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Function to handle viewing a project
  const handleViewProject = (projectIndex: number) => {
    setSelectedProject(projectIndex)
    setViewProject(true)
  }

  // Function to handle creating a project
  const handleCreateProject = () => {
    setCreateProjectOpen(false)
    toast({
      variant: "success",
      title: "Project created",
      description: "Your project has been created successfully.",
    })
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and monitor your web projects</p>
        </div>
        <Dialog open={createProjectOpen} onOpenChange={setCreateProjectOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Create a new web project. Fill out the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Project Name
                </Label>
                <Input id="name" placeholder="Enter project name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="owner" className="text-right">
                  Owner
                </Label>
                <Select defaultValue="john">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="domain" className="text-right">
                  Domain
                </Label>
                <Input id="domain" placeholder="example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue="development">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">In Development</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Input id="description" placeholder="Brief project description" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateProjectOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and search */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filter:</span>
        </div>

        {/* Status filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="in-development">In Development</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        {/* Owner filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Owners</SelectItem>
            <SelectItem value="john-doe">John Doe</SelectItem>
            <SelectItem value="jane-smith">Jane Smith</SelectItem>
            <SelectItem value="alex-johnson">Alex Johnson</SelectItem>
            <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search projects..." className="pl-8" />
        </div>

        {/* Toggle empty state (for demo purposes) */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="ml-auto md:ml-0"
        >
          Toggle Empty State
        </Button>
      </div>

      {/* Projects table or empty state */}
      <div className="mt-6 rounded-md border">
        {projects.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>{project.domain}</TableCell>
                  <TableCell>{project.pages}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)} variant="outline">
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewProject(index)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      {project.status === "In Development" ? (
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      ) : (
                        <PermissionButton
                          permission="edit active projects"
                          description="Only developers can edit projects that are not in development"
                          variant="ghost"
                          size="icon"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </PermissionButton>
                      )}
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            description="There are no projects matching your filters. Try adjusting your search or create a new project."
            action={{
              label: "Create Project",
              onClick: () => setCreateProjectOpen(true),
            }}
          />
        )}
      </div>

      {/* Project view modal */}
      <Dialog open={viewProject} onOpenChange={setViewProject}>
        <DialogContent className="max-w-4xl">
          {selectedProject !== null && projects.length > 0 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{projects[selectedProject].name}</span>
                  <Badge className={getStatusColor(projects[selectedProject].status)} variant="outline">
                    {projects[selectedProject].status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Project info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Project ID</p>
                    <p>{projects[selectedProject].id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Owner</p>
                    <p>{projects[selectedProject].owner}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Domain</p>
                    <p>{projects[selectedProject].domain}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pages</p>
                    <p>{projects[selectedProject].pages}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p>{projects[selectedProject].lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</p>
                    <p>2023-01-15</p>
                  </div>
                </div>

                {/* Project tabs */}
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 pt-4">
                    <div className="rounded-md border p-4">
                      <h3 className="text-lg font-medium mb-2">Project Description</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {projects[selectedProject].name} is a web project for {projects[selectedProject].domain}. It
                        consists of {projects[selectedProject].pages} pages and is currently{" "}
                        {projects[selectedProject].status.toLowerCase()}. The project was last updated on{" "}
                        {projects[selectedProject].lastUpdated}.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-md border p-4">
                        <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <p>Page updated: Home</p>
                            <p className="text-gray-500">2023-05-15</p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <p>New page added: Products</p>
                            <p className="text-gray-500">2023-05-14</p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <p>Domain verified</p>
                            <p className="text-gray-500">2023-05-12</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border p-4">
                        <h3 className="text-lg font-medium mb-2">Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <p>Uptime</p>
                            <p className="text-green-600">99.9%</p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <p>Page Load Time</p>
                            <p className="text-yellow-600">1.2s</p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <p>Mobile Score</p>
                            <p className="text-green-600">92/100</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="pt-4">
                    <div className="rounded-md border p-4 text-center py-8">
                      <p className="text-gray-500">Analytics data would be displayed here in the functional version.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="team" className="pt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Last Active</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{projects[selectedProject].owner}</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>
                              {projects[selectedProject].owner.toLowerCase().replace(" ", ".")}@techsolutions.com
                            </TableCell>
                            <TableCell>Today</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Sarah Williams</TableCell>
                            <TableCell>Developer</TableCell>
                            <TableCell>sarah.williams@techsolutions.com</TableCell>
                            <TableCell>Yesterday</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Michael Brown</TableCell>
                            <TableCell>Designer</TableCell>
                            <TableCell>michael.brown@techsolutions.com</TableCell>
                            <TableCell>2 days ago</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="pt-4">
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <h3 className="text-lg font-medium mb-4">Project Settings</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project-name" className="text-right">
                              Project Name
                            </Label>
                            <Input
                              id="project-name"
                              defaultValue={projects[selectedProject].name}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project-domain" className="text-right">
                              Domain
                            </Label>
                            <Input
                              id="project-domain"
                              defaultValue={projects[selectedProject].domain}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project-status" className="text-right">
                              Status
                            </Label>
                            <Select defaultValue={projects[selectedProject].status.toLowerCase().replace(" ", "-")}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="in-development">In Development</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Save Settings</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setViewProject(false)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </Button>
                <Button>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Builder
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
