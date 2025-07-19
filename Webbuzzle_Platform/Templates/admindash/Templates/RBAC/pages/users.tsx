"use client"

// Users page template - displays user management interface with role assignment.
// In the functional version, this would fetch real user data from an API.

import { useState } from "react"
import { DashboardLayout } from "../DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, Edit, UserPlus, UserX, User } from "lucide-react"
import { EmptyState } from "../components/empty-state"
import { PermissionButton } from "../components/permission-tooltip"
import { useToast } from "../components/ui/use-toast"

export default function UsersPage() {
  // State for user edit modal - would be connected to real data in functional version
  const [editUser, setEditUser] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [createUserOpen, setCreateUserOpen] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { toast } = useToast()

  // Mock user data - would be fetched from an API in the functional version
  const users = showEmptyState
    ? []
    : [
        {
          id: "user-001",
          name: "John Doe",
          email: "john.doe@techsolutions.com",
          role: "Admin",
          status: "Active",
          lastLogin: "2023-05-15 14:32:10",
        },
        {
          id: "user-002",
          name: "Jane Smith",
          email: "jane.smith@techsolutions.com",
          role: "Developer",
          status: "Active",
          lastLogin: "2023-05-15 10:15:22",
        },
        {
          id: "user-003",
          name: "Alex Johnson",
          email: "alex.johnson@techsolutions.com",
          role: "Manager",
          status: "Active",
          lastLogin: "2023-05-14 16:45:30",
        },
        {
          id: "user-004",
          name: "Sarah Williams",
          email: "sarah.williams@techsolutions.com",
          role: "Support",
          status: "Active",
          lastLogin: "2023-05-14 09:20:15",
        },
        {
          id: "user-005",
          name: "Michael Brown",
          email: "michael.brown@techsolutions.com",
          role: "Developer",
          status: "Inactive",
          lastLogin: "2023-05-10 11:30:45",
        },
        {
          id: "user-006",
          name: "Emily Davis",
          email: "emily.davis@techsolutions.com",
          role: "Support",
          status: "Active",
          lastLogin: "2023-05-13 13:25:18",
        },
        {
          id: "user-007",
          name: "David Wilson",
          email: "david.wilson@techsolutions.com",
          role: "Manager",
          status: "Active",
          lastLogin: "2023-05-12 15:10:33",
        },
      ]

  // Mock permissions data - would be fetched from an API in the functional version
  const permissions = {
    dashboard: {
      view: true,
      edit: false,
    },
    tickets: {
      view: true,
      create: true,
      edit: true,
      delete: false,
      assign: true,
    },
    invoices: {
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    projects: {
      view: true,
      create: false,
      edit: false,
      delete: false,
    },
    code: {
      view: true,
      deploy: false,
    },
    users: {
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  }

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Helper function to get role badge color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Manager":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Developer":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Support":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Function to handle editing a user
  const handleEditUser = (userIndex: number) => {
    setSelectedUser(userIndex)
    setEditUser(true)
  }

  // Function to handle creating a user
  const handleCreateUser = () => {
    setCreateUserOpen(false)
    toast({
      variant: "success",
      title: "User created",
      description: "The user has been created successfully.",
    })
  }

  // Function to handle saving user changes
  const handleSaveUserChanges = () => {
    setEditUser(false)
    toast({
      variant: "success",
      title: "User updated",
      description: "The user has been updated successfully.",
    })
  }

  // Function to handle deactivating a user
  const handleDeactivateUser = () => {
    toast({
      variant: "success",
      title: "User deactivated",
      description: "The user has been deactivated successfully.",
    })
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage users and their permissions</p>
        </div>
        <Dialog open={createUserOpen} onOpenChange={setCreateUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Add User</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account. Fill out the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input id="name" placeholder="Enter full name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Enter email address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select defaultValue="developer">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue="active">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" placeholder="Enter password" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirm-password" className="text-right">
                  Confirm Password
                </Label>
                <Input id="confirm-password" type="password" placeholder="Confirm password" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4 flex items-center space-x-2">
                  <Checkbox id="send-invite" />
                  <Label htmlFor="send-invite">Send welcome email with login instructions</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>Create User</Button>
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

        {/* Role filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="support">Support</SelectItem>
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search users..." className="pl-8" />
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

      {/* Users table or empty state */}
      <div className="mt-6 rounded-md border">
        {users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)} variant="outline">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)} variant="outline">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditUser(index)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      {user.status === "Active" ? (
                        <Button variant="ghost" size="icon" onClick={handleDeactivateUser}>
                          <UserX className="h-4 w-4" />
                          <span className="sr-only">Deactivate</span>
                        </Button>
                      ) : (
                        <PermissionButton
                          permission="activate users"
                          description="Only admins can activate users"
                          variant="ghost"
                          size="icon"
                        >
                          <User className="h-4 w-4" />
                          <span className="sr-only">Activate</span>
                        </PermissionButton>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={User}
            title="No users found"
            description="There are no users matching your filters. Try adjusting your search or add a new user."
            action={{
              label: "Add User",
              onClick: () => setCreateUserOpen(true),
            }}
          />
        )}
      </div>

      {/* User edit modal */}
      <Dialog open={editUser} onOpenChange={setEditUser}>
        <DialogContent className="max-w-3xl">
          {selectedUser !== null && users.length > 0 && (
            <>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update user information and permissions for {users[selectedUser].name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6">
                {/* User info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input id="name" defaultValue={users[selectedUser].name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input id="email" defaultValue={users[selectedUser].email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-medium">
                      Role
                    </Label>
                    <Select defaultValue={users[selectedUser].role.toLowerCase()}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status
                    </Label>
                    <Select defaultValue={users[selectedUser].status.toLowerCase()}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Permissions section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Permissions</h3>

                  {/* Dashboard permissions */}
                  <div className="rounded-md border p-4 mb-4">
                    <h4 className="font-medium mb-2">Dashboard</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dashboard-view" defaultChecked={permissions.dashboard.view} />
                        <Label htmlFor="dashboard-view" className="text-sm">
                          View Dashboard
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dashboard-edit" defaultChecked={permissions.dashboard.edit} />
                        <Label htmlFor="dashboard-edit" className="text-sm">
                          Edit Dashboard
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Tickets permissions */}
                  <div className="rounded-md border p-4 mb-4">
                    <h4 className="font-medium mb-2">Tickets</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tickets-view" defaultChecked={permissions.tickets.view} />
                        <Label htmlFor="tickets-view" className="text-sm">
                          View Tickets
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tickets-create" defaultChecked={permissions.tickets.create} />
                        <Label htmlFor="tickets-create" className="text-sm">
                          Create Tickets
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tickets-edit" defaultChecked={permissions.tickets.edit} />
                        <Label htmlFor="tickets-edit" className="text-sm">
                          Edit Tickets
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tickets-delete" defaultChecked={permissions.tickets.delete} />
                        <Label htmlFor="tickets-delete" className="text-sm">
                          Delete Tickets
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tickets-assign" defaultChecked={permissions.tickets.assign} />
                        <Label htmlFor="tickets-assign" className="text-sm">
                          Assign Tickets
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Invoices permissions */}
                  <div className="rounded-md border p-4 mb-4">
                    <h4 className="font-medium mb-2">Invoices</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="invoices-view" defaultChecked={permissions.invoices.view} />
                        <Label htmlFor="invoices-view" className="text-sm">
                          View Invoices
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="invoices-create" defaultChecked={permissions.invoices.create} />
                        <Label htmlFor="invoices-create" className="text-sm">
                          Create Invoices
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="invoices-edit" defaultChecked={permissions.invoices.edit} />
                        <Label htmlFor="invoices-edit" className="text-sm">
                          Edit Invoices
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="invoices-delete" defaultChecked={permissions.invoices.delete} />
                        <Label htmlFor="invoices-delete" className="text-sm">
                          Delete Invoices
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Projects permissions */}
                  <div className="rounded-md border p-4 mb-4">
                    <h4 className="font-medium mb-2">Projects</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="projects-view" defaultChecked={permissions.projects.view} />
                        <Label htmlFor="projects-view" className="text-sm">
                          View Projects
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="projects-create" defaultChecked={permissions.projects.create} />
                        <Label htmlFor="projects-create" className="text-sm">
                          Create Projects
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="projects-edit" defaultChecked={permissions.projects.edit} />
                        <Label htmlFor="projects-edit" className="text-sm">
                          Edit Projects
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="projects-delete" defaultChecked={permissions.projects.delete} />
                        <Label htmlFor="projects-delete" className="text-sm">
                          Delete Projects
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Code permissions */}
                  <div className="rounded-md border p-4 mb-4">
                    <h4 className="font-medium mb-2">Engineering Tools</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="code-view" defaultChecked={permissions.code.view} />
                        <Label htmlFor="code-view" className="text-sm">
                          View Engineering Tools
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="code-deploy" defaultChecked={permissions.code.deploy} />
                        <Label htmlFor="code-deploy" className="text-sm">
                          Deploy Code
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Users permissions */}
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium mb-2">User Management</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="users-view" defaultChecked={permissions.users.view} />
                        <Label htmlFor="users-view" className="text-sm">
                          View Users
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="users-create" defaultChecked={permissions.users.create} />
                        <Label htmlFor="users-create" className="text-sm">
                          Create Users
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="users-edit" defaultChecked={permissions.users.edit} />
                        <Label htmlFor="users-edit" className="text-sm">
                          Edit Users
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="users-delete" defaultChecked={permissions.users.delete} />
                        <Label htmlFor="users-delete" className="text-sm">
                          Delete Users
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setEditUser(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveUserChanges}>Save Changes</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
