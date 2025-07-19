"use client"

// Invoices page template - displays invoice data with filtering and actions.
// In the functional version, this would fetch real invoice data from an API.

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
import { Search, Filter, Download, CheckCircle, Eye, FileText, Plus } from "lucide-react"
import { EmptyState } from "../components/empty-state"
import { PermissionTooltip } from "../components/permission-tooltip"
import { useToast } from "../components/ui/use-toast"

export default function InvoicesPage() {
  // State for invoice preview modal - would be connected to real data in functional version
  const [previewInvoice, setPreviewInvoice] = useState<boolean>(false)
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null)
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const { toast } = useToast()

  // Mock invoice data - would be fetched from an API in the functional version
  const invoices = showEmptyState
    ? []
    : [
        {
          id: "INV-2023-001",
          customer: "Acme Corp",
          plan: "Enterprise",
          amount: "$1,299.00",
          status: "Paid",
          date: "2023-05-01",
        },
        {
          id: "INV-2023-002",
          customer: "Globex Inc",
          plan: "Pro",
          amount: "$499.00",
          status: "Pending",
          date: "2023-05-05",
        },
        {
          id: "INV-2023-003",
          customer: "Wayne Enterprises",
          plan: "Enterprise",
          amount: "$1,299.00",
          status: "Paid",
          date: "2023-05-10",
        },
        {
          id: "INV-2023-004",
          customer: "Stark Industries",
          plan: "Basic",
          amount: "$99.00",
          status: "Overdue",
          date: "2023-04-15",
        },
        {
          id: "INV-2023-005",
          customer: "Umbrella Corp",
          plan: "Pro",
          amount: "$499.00",
          status: "Paid",
          date: "2023-05-12",
        },
        {
          id: "INV-2023-006",
          customer: "Cyberdyne Systems",
          plan: "Enterprise",
          amount: "$1,299.00",
          status: "Pending",
          date: "2023-05-15",
        },
        {
          id: "INV-2023-007",
          customer: "Initech",
          plan: "Basic",
          amount: "$99.00",
          status: "Paid",
          date: "2023-05-18",
        },
      ]

  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Function to handle viewing an invoice
  const handleViewInvoice = (invoiceIndex: number) => {
    setSelectedInvoice(invoiceIndex)
    setPreviewInvoice(true)
  }

  // Function to handle creating an invoice
  const handleCreateInvoice = () => {
    setCreateInvoiceOpen(false)
    toast({
      variant: "success",
      title: "Invoice created",
      description: "The invoice has been created successfully.",
    })
  }

  // Function to handle marking an invoice as paid
  const handleMarkAsPaid = () => {
    setPreviewInvoice(false)
    toast({
      variant: "success",
      title: "Invoice updated",
      description: "The invoice has been marked as paid.",
    })
  }

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage customer invoices and payments</p>
        </div>
        <Dialog open={createInvoiceOpen} onOpenChange={setCreateInvoiceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Invoice</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Create a new invoice for a customer. Fill out the details below.</DialogDescription>
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
                <Label htmlFor="plan" className="text-right">
                  Plan
                </Label>
                <Select defaultValue="enterprise">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic ($99.00)</SelectItem>
                    <SelectItem value="pro">Pro ($499.00)</SelectItem>
                    <SelectItem value="enterprise">Enterprise ($1,299.00)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input id="amount" defaultValue="$1,299.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Due Date
                </Label>
                <Input id="dueDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Notes
                </Label>
                <Input id="notes" placeholder="Additional notes" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateInvoiceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateInvoice}>Create Invoice</Button>
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
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        {/* Plan filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Plan Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>

        {/* Date filter */}
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search invoices..." className="pl-8" />
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

      {/* Invoices table or empty state */}
      <div className="mt-6 rounded-md border">
        {invoices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.plan}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)} variant="outline">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewInvoice(index)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      {invoice.status !== "Paid" ? (
                        <PermissionTooltip
                          permission="mark invoices as paid"
                          description="Only Finance team members can mark invoices as paid"
                        >
                          <Button variant="ghost" size="icon" disabled>
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Mark as Paid</span>
                          </Button>
                        </PermissionTooltip>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={FileText}
            title="No invoices found"
            description="There are no invoices matching your filters. Try adjusting your search or create a new invoice."
            action={{
              label: "Create Invoice",
              onClick: () => setCreateInvoiceOpen(true),
            }}
          />
        )}
      </div>

      {/* Invoice preview modal */}
      <Dialog open={previewInvoice} onOpenChange={setPreviewInvoice}>
        <DialogContent className="max-w-3xl">
          {selectedInvoice !== null && invoices.length > 0 && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>Invoice {invoices[selectedInvoice].id}</span>
                  <Badge className={getStatusColor(invoices[selectedInvoice].status)} variant="outline">
                    {invoices[selectedInvoice].status}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Invoice header */}
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">TechSolutions, Inc.</h3>
                    <p className="text-sm text-gray-500">123 Tech Street</p>
                    <p className="text-sm text-gray-500">San Francisco, CA 94107</p>
                    <p className="text-sm text-gray-500">billing@techsolutions.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Invoice Date: {invoices[selectedInvoice].date}</p>
                    <p className="text-sm text-gray-500">Due Date: {invoices[selectedInvoice].date}</p>
                  </div>
                </div>

                {/* Customer info */}
                <div className="rounded-md border p-4">
                  <h4 className="font-medium mb-2">Bill To:</h4>
                  <p>{invoices[selectedInvoice].customer}</p>
                  <p className="text-sm text-gray-500">123 Customer Street</p>
                  <p className="text-sm text-gray-500">New York, NY 10001</p>
                  <p className="text-sm text-gray-500">
                    billing@{invoices[selectedInvoice].customer.toLowerCase().replace(" ", "")}.com
                  </p>
                </div>

                {/* Invoice items */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div>
                            <p className="font-medium">{invoices[selectedInvoice].plan} Plan</p>
                            <p className="text-sm text-gray-500">Monthly subscription</p>
                          </div>
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>{invoices[selectedInvoice].amount}</TableCell>
                        <TableCell className="text-right">{invoices[selectedInvoice].amount}</TableCell>
                      </TableRow>
                      {invoices[selectedInvoice].plan === "Enterprise" && (
                        <TableRow>
                          <TableCell>
                            <div>
                              <p className="font-medium">Premium Support</p>
                              <p className="text-sm text-gray-500">24/7 priority support</p>
                            </div>
                          </TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>Included</TableCell>
                          <TableCell className="text-right">$0.00</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Invoice summary */}
                <div className="flex justify-end">
                  <div className="w-72 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Subtotal:</p>
                      <p>{invoices[selectedInvoice].amount}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Tax (0%):</p>
                      <p>$0.00</p>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <p className="font-medium">Total:</p>
                      <p className="font-bold">{invoices[selectedInvoice].amount}</p>
                    </div>
                  </div>
                </div>

                {/* Payment info */}
                <div className="rounded-md border p-4 text-sm">
                  <h4 className="font-medium mb-2">Payment Information:</h4>
                  <p>Please make payment to:</p>
                  <p>Bank: TechBank</p>
                  <p>Account: 1234567890</p>
                  <p>Routing: 987654321</p>
                  <p className="mt-2">Payment Terms: Net 30</p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setPreviewInvoice(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                {invoices[selectedInvoice].status !== "Paid" && (
                  <Button variant="default" onClick={handleMarkAsPaid}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
