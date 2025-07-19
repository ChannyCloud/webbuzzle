"use client"

// Code/Engineering page template - displays engineering tools and logs.
// In the functional version, this would fetch real deployment and error data from APIs.

import { useState } from "react"
import { DashboardLayout } from "../DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Filter, Terminal, AlertCircle, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { EmptyState } from "../components/empty-state"
import { PermissionButton } from "../components/permission-tooltip"
import { useToast } from "../components/ui/use-toast"

export default function CodePage() {
  const [createDeploymentOpen, setCreateDeploymentOpen] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { toast } = useToast()

  // Mock deployment data - would be fetched from an API in the functional version
  const deployments = showEmptyState
    ? []
    : [
        {
          id: "deploy-123456",
          project: "Corporate Website Redesign",
          environment: "Production",
          status: "Success",
          timestamp: "2023-05-15 14:32:10",
          duration: "1m 45s",
          commit: "a1b2c3d",
          triggeredBy: "John Doe",
        },
        {
          id: "deploy-123455",
          project: "E-commerce Platform",
          environment: "Staging",
          status: "Success",
          timestamp: "2023-05-15 12:15:22",
          duration: "2m 12s",
          commit: "e4f5g6h",
          triggeredBy: "Jane Smith",
        },
        {
          id: "deploy-123454",
          project: "Internal Dashboard",
          environment: "Development",
          status: "Failed",
          timestamp: "2023-05-15 10:05:45",
          duration: "0m 32s",
          commit: "i7j8k9l",
          triggeredBy: "Alex Johnson",
        },
        {
          id: "deploy-123453",
          project: "Mobile App Landing Page",
          environment: "Production",
          status: "Success",
          timestamp: "2023-05-14 16:45:30",
          duration: "1m 10s",
          commit: "m1n2o3p",
          triggeredBy: "Sarah Williams",
        },
        {
          id: "deploy-123452",
          project: "Product Documentation",
          environment: "Staging",
          status: "In Progress",
          timestamp: "2023-05-14 15:30:12",
          duration: "Running...",
          commit: "q4r5s6t",
          triggeredBy: "Michael Brown",
        },
      ]

  // Mock error logs - would be fetched from an API in the functional version
  const errorLogs = [
    {
      id: "error-789012",
      project: "E-commerce Platform",
      environment: "Production",
      type: "Server Error",
      message: "Database connection timeout",
      timestamp: "2023-05-15 13:45:22",
      count: 3,
      status: "Open",
    },
    {
      id: "error-789011",
      project: "Internal Dashboard",
      environment: "Staging",
      type: "Client Error",
      message: "Failed to load user data",
      timestamp: "2023-05-15 11:32:15",
      count: 12,
      status: "Open",
    },
    {
      id: "error-789010",
      project: "Mobile App Landing Page",
      environment: "Development",
      type: "Build Error",
      message: "Missing dependency in package.json",
      timestamp: "2023-05-15 09:15:30",
      count: 1,
      status: "Resolved",
    },
    {
      id: "error-789009",
      project: "Corporate Website Redesign",
      environment: "Production",
      type: "Server Error",
      message: "API rate limit exceeded",
      timestamp: "2023-05-14 22:10:45",
      count: 8,
      status: "Open",
    },
    {
      id: "error-789008",
      project: "Product Documentation",
      environment: "Staging",
      type: "Client Error",
      message: "404 Not Found: /api/docs/v2",
      timestamp: "2023-05-14 18:05:12",
      count: 5,
      status: "Resolved",
    },
  ]

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Open":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "In Progress":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      case "Open":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return null
    }
  }

  // Function to handle creating a deployment
  const handleCreateDeployment = () => {
    setCreateDeploymentOpen(false)
    toast({
      variant: "success",
      title: "Deployment started",
      description: "Your deployment has been initiated successfully.",
    })
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Engineering Tools</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor deployments, logs, and system status</p>
        </div>
        <Dialog open={createDeploymentOpen} onOpenChange={setCreateDeploymentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Terminal className="mr-2 h-4 w-4" />
              <span>New Deployment</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Deployment</DialogTitle>
              <DialogDescription>Deploy your code to the selected environment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Project
                </Label>
                <Select defaultValue="corporate">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate Website Redesign</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                    <SelectItem value="dashboard">Internal Dashboard</SelectItem>
                    <SelectItem value="mobile">Mobile App Landing Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="environment" className="text-right">
                  Environment
                </Label>
                <Select defaultValue="staging">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="branch" className="text-right">
                  Branch
                </Label>
                <Select defaultValue="main">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                    <SelectItem value="feature">feature/new-homepage</SelectItem>
                    <SelectItem value="hotfix">hotfix/login-issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="commit" className="text-right">
                  Commit
                </Label>
                <Input id="commit" defaultValue="latest" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Notes
                </Label>
                <Input id="notes" placeholder="Deployment notes (optional)" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDeploymentOpen(false)}>
                Cancel
              </Button>
              <PermissionButton
                permission="deploy to production"
                description="Only DevOps team members can deploy to production"
                variant="default"
              >
                Deploy to Production
              </PermissionButton>
              <Button onClick={handleCreateDeployment}>Deploy to Staging</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* System status cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operational</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">100% uptime in last 30 days</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operational</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">99.9% uptime in last 30 days</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">CDN Status</CardTitle>
            <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Degraded</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Performance issues in EU region</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Auth Service</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operational</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">100% uptime in last 30 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for deployments and errors */}
      <div className="mt-6">
        <Tabs defaultValue="deployments">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="errors">Error Logs</TabsTrigger>
          </TabsList>

          {/* Deployments tab */}
          <TabsContent value="deployments" className="space-y-4 pt-4">
            {/* Filters and search */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>

              {/* Project filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="corporate">Corporate Website</SelectItem>
                  <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                  <SelectItem value="dashboard">Internal Dashboard</SelectItem>
                </SelectContent>
              </Select>

              {/* Environment filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>

              {/* Status filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>

              {/* Search */}
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search deployments..." className="pl-8" />
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

            {/* Deployments table or empty state */}
            <div className="rounded-md border">
              {deployments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Commit</TableHead>
                      <TableHead>Triggered By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deployments.map((deployment) => (
                      <TableRow key={deployment.id}>
                        <TableCell>
                          <div className="flex items-center">{getStatusIcon(deployment.status)}</div>
                        </TableCell>
                        <TableCell className="font-medium">{deployment.id}</TableCell>
                        <TableCell>{deployment.project}</TableCell>
                        <TableCell>{deployment.environment}</TableCell>
                        <TableCell>{deployment.timestamp}</TableCell>
                        <TableCell>{deployment.duration}</TableCell>
                        <TableCell>
                          <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-800">
                            {deployment.commit}
                          </code>
                        </TableCell>
                        <TableCell>{deployment.triggeredBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <EmptyState
                  icon={Terminal}
                  title="No deployments found"
                  description="There are no deployments matching your filters. Try adjusting your search or create a new deployment."
                  action={{
                    label: "New Deployment",
                    onClick: () => setCreateDeploymentOpen(true),
                  }}
                />
              )}
            </div>
          </TabsContent>

          {/* Error logs tab */}
          <TabsContent value="errors" className="space-y-4 pt-4">
            {/* Filters and search */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>

              {/* Project filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="corporate">Corporate Website</SelectItem>
                  <SelectItem value="ecommerce">E-commerce Platform</SelectItem>
                  <SelectItem value="dashboard">Internal Dashboard</SelectItem>
                </SelectContent>
              </Select>

              {/* Environment filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>

              {/* Status filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              {/* Search */}
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search errors..." className="pl-8" />
              </div>
            </div>

            {/* Error logs table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorLogs.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell>
                        <div className="flex items-center">{getStatusIcon(error.status)}</div>
                      </TableCell>
                      <TableCell className="font-medium">{error.id}</TableCell>
                      <TableCell>{error.project}</TableCell>
                      <TableCell>{error.environment}</TableCell>
                      <TableCell>{error.type}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{error.message}</div>
                      </TableCell>
                      <TableCell>{error.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{error.count}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Terminal output section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Terminal Output</h2>
        <div className="rounded-md border bg-black p-4 font-mono text-xs text-green-400">
          <div className="space-y-1">
            <p>$ git pull origin main</p>
            <p>From github.com:techsolutions/project</p>
            <p> * branch main -&gt; FETCH_HEAD</p>
            <p>Already up to date.</p>
            <p>$ npm run build</p>
            <p>&gt; project@1.0.0 build</p>
            <p>&gt; next build</p>
            <p>info - Loaded env from .env</p>
            <p>info - Checking validity of types...</p>
            <p>info - Creating an optimized production build...</p>
            <p>info - Compiled successfully</p>
            <p>info - Collecting page data...</p>
            <p>info - Generating static pages (0/24)</p>
            <p>info - Generating static pages (12/24)</p>
            <p>info - Generating static pages (24/24)</p>
            <p>info - Finalizing page optimization...</p>
            <p>Route (pages) Size First Load JS</p>
            <p>┌ ○ / 5.8 kB 88.3 kB</p>
            <p>├ ○ /404 3.1 kB 85.6 kB</p>
            <p>└ ○ /about 4.2 kB 86.7 kB</p>
            <p>+ First Load JS shared by all 82.5 kB</p>
            <p> ├ chunks/framework-2c79e2a64abdb08b.js 45.2 kB</p>
            <p> ├ chunks/main-0ecb9ccfcb6c9b24.js 32.2 kB</p>
            <p> ├ chunks/pages/_app-3c9f6b4a6194a3b8.js 4.2 kB</p>
            <p> └ chunks/webpack-8fa1640cc84ba8fe.js 814 B</p>
            <p>$ npm run start</p>
            <p>&gt; project@1.0.0 start</p>
            <p>&gt; next start</p>
            <p>ready - started server on 0.0.0.0:3000, url: http://localhost:3000</p>
            <p className="animate-pulse">_</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
