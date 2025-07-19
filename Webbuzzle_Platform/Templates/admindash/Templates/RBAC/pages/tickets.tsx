"use client"

// Tickets page template - displays support tickets with filtering and search.
// In the functional version, this would fetch real ticket data from an API.

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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Search, Filter, Eye, MessageSquare, Plus, AlertCircle } from "lucide-react"
import { EmptyState } from "../components/empty-state"
import { PermissionButton } from "../components/permission-tooltip"
import { useToast } from "../components/ui/use-toast"

export default function TicketsPage() {
  // State for ticket view modal - would be connected to real data in functional version
  const [viewTicket, setViewTicket] = useState<boolean>(false)
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [createTicketOpen, setCreateTicketOpen] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { toast } = useToast()

  // Mock ticket data - would be fetched from an API in the functional version
  const tickets = showEmptyState
    ? []
    : [
        {
          id: "TK-1001",
          subject: "Cannot access admin dashboard",
          status: "Open",
          customer: "Acme Corp",
          assignedTo: "John Doe",
          priority: "High",
          created: "2023-05-15",
        },
        {
          id: "TK-1002",
          subject: "Payment processing error",
          status: "In Progress",
          customer: "Globex Inc",
          assignedTo: "Jane Smith",
          priority: "Medium",
          created: "2023-05-14",
        },
        {
          id: "TK-1003",
          subject: "Feature request: Export to PDF",
          status: "Open",
          customer: "Wayne Enterprises",
          assignedTo: "Unassigned",
          priority: "Low",
          created: "2023-05-13",
        },
        {
          id: "TK-1004",
          subject: "Login issues after password reset",
          status: "Closed",
          customer: "Stark Industries",
          assignedTo: "John Doe",
          priority: "High",
          created: "2023-05-12",
        },
        {
          id: "TK-1005",
          subject: "Data migration assistance needed",
          status: "In Progress",
          customer: "Umbrella Corp",
          assignedTo: "Jane Smith",
          priority: "Medium",
          created: "2023-05-11",
        },
        {
          id: "TK-1006",
          subject: "API integration documentation unclear",
          status: "Open",
          customer: "Cyberdyne Systems",
          assignedTo: "Unassigned",
          priority: "Medium",
          created: "2023-05-10",
        },
      ]

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Closed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Helper function to get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Function to handle viewing a ticket
  const handleViewTicket = (ticketIndex: number) => {
    setSelectedTicket(ticketIndex)
    setViewTicket(true)
  }

  // Function to handle creating a ticket
  const handleCreateTicket = () => {
    setCreateTicketOpen(false)
    toast({
      variant: "success",
      title: "Ticket created",
      description: "Your ticket has been created successfully.",
    })
  }

  // Function to handle replying to a ticket
  const handleReplyToTicket = () => {
    setViewTicket(false)
    toast({
      variant: "success",
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
    })
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and respond to customer support tickets</p>
        </div>
        <Dialog open={createTicketOpen} onOpenChange={setCreateTicketOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Ticket</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>
                Create a new support ticket for a customer. Fill out the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Select defaultValue="acme">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Corp</SelectItem>
                    <SelectItem value="globex">Globex Inc</SelectItem>
                    <SelectItem value="wayne">Wayne Enterprises</SelectItem>
                    <SelectItem value="stark">Stark Industries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input id="subject" placeholder="Enter ticket subject" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignedTo" className="text-right">
                  Assign To
                </Label>
                <Select defaultValue="unassigned">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter ticket description"
                  className="col-span-3 min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateTicketOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTicket}>Create Ticket</Button>
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
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        {/* Assigned filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assigned To" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="john-doe">John Doe</SelectItem>
            <SelectItem value="jane-smith">Jane Smith</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search tickets..." className="pl-8" />
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

      {/* Tickets table or empty state */}
      <div className="mt-6 rounded-md border">
        {tickets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)} variant="outline">
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.assignedTo}</TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewTicket(index)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      {ticket.status !== "Closed" ? (
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Reply</span>
                        </Button>
                      ) : (
                        <PermissionButton
                          permission="reply to closed tickets"
                          description="Only managers can reply to closed tickets"
                          variant="ghost"
                          size="icon"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Reply</span>
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
            icon={AlertCircle}
            title="No tickets found"
            description="There are no support tickets matching your filters. Try adjusting your search or create a new ticket."
            action={{
              label: "Create Ticket",
              onClick: () => setCreateTicketOpen(true),
            }}
          />
        )}
      </div>

      {/* Ticket view modal */}
      <Dialog open={viewTicket} onOpenChange={setViewTicket}>
        <DialogContent className="max-w-4xl">
          {selectedTicket !== null && tickets.length > 0 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{tickets[selectedTicket].id}</span>
                  <Badge className={getStatusColor(tickets[selectedTicket].status)} variant="outline">
                    {tickets[selectedTicket].status}
                  </Badge>
                  <Badge className={getPriorityColor(tickets[selectedTicket].priority)} variant="outline">
                    {tickets[selectedTicket].priority}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-base font-medium">
                  {tickets[selectedTicket].subject}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="conversation" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="conversation">Conversation</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="internal-notes">Internal Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="conversation" className="space-y-4 pt-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Acme Corp (Customer)</p>
                      <p className="text-xs text-gray-500">2023-05-15 13:45</p>
                    </div>
                    <p className="text-sm">
                      I'm having trouble accessing the admin dashboard after the recent update. When I try to log in, I
                      get a "403 Forbidden" error message. I've tried clearing my cache and using a different browser,
                      but the issue persists.
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">John Doe (Support)</p>
                      <p className="text-xs text-gray-500">2023-05-15 14:32</p>
                    </div>
                    <p className="text-sm">
                      Hi there, I'll look into this issue for you. Could you please provide your username and the exact
                      error message you're seeing?
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Acme Corp (Customer)</p>
                      <p className="text-xs text-gray-500">2023-05-15 15:10</p>
                    </div>
                    <p className="text-sm">
                      My username is admin@acmecorp.com. The exact error is "403 Forbidden: You don't have permission to
                      access this resource."
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reply">Reply</Label>
                    <Textarea id="reply" placeholder="Type your reply here..." className="min-h-[100px]" />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="status" className="text-sm">
                          Change Status:
                        </Label>
                        <Select defaultValue={tickets[selectedTicket].status.toLowerCase().replace(" ", "-")}>
                          <SelectTrigger className="w-[140px] h-8">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setViewTicket(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleReplyToTicket}>Send Reply</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer</p>
                      <p>{tickets[selectedTicket].customer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</p>
                      <div className="flex items-center justify-between">
                        <p>{tickets[selectedTicket].assignedTo}</p>
                        <Button variant="outline" size="sm">
                          Reassign
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</p>
                      <p>{tickets[selectedTicket].created}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
                      <p>2023-05-16</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                      <Badge className={getStatusColor(tickets[selectedTicket].status)} variant="outline">
                        {tickets[selectedTicket].status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</p>
                      <Badge className={getPriorityColor(tickets[selectedTicket].priority)} variant="outline">
                        {tickets[selectedTicket].priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</p>
                    <p>
                      I'm having trouble accessing the admin dashboard after the recent update. When I try to log in, I
                      get a "403 Forbidden" error message. I've tried clearing my cache and using a different browser,
                      but the issue persists.
                    </p>
                  </div>

                  <div className="rounded-md border p-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Related Information</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm">Customer Plan</p>
                        <p className="text-sm font-medium">Enterprise</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Account Manager</p>
                        <p className="text-sm font-medium">Sarah Williams</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Previous Tickets</p>
                        <p className="text-sm font-medium">3</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="internal-notes" className="space-y-4 pt-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-gray-500">2023-05-15 14:40</p>
                    </div>
                    <p className="text-sm">
                      I've checked the user's permissions in the admin panel. It looks like their role was changed
                      during the last update. Will need to restore proper access level.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="internal-note">Add Internal Note</Label>
                    <Textarea
                      id="internal-note"
                      placeholder="Add a note visible only to staff..."
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button>Add Note</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
