"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { CreditCard, Download, CheckCircle2, ArrowRight, Database, HardDrive, Wifi } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const billingHistory = [
  {
    id: "INV-001",
    date: "May 1, 2025",
    amount: "$49.00",
    status: "Paid",
    plan: "Pro Plan",
  },
  {
    id: "INV-002",
    date: "Apr 1, 2025",
    amount: "$49.00",
    status: "Paid",
    plan: "Pro Plan",
  },
  {
    id: "INV-003",
    date: "Mar 1, 2025",
    amount: "$49.00",
    status: "Paid",
    plan: "Pro Plan",
  },
]

const usageData = [
  {
    name: "Sites",
    used: 3,
    total: 10,
    percentage: 30,
    icon: Database,
  },
  {
    name: "Bandwidth",
    used: 45,
    total: 100,
    percentage: 45,
    unit: "GB",
    icon: Wifi,
  },
  {
    name: "Storage",
    used: 15,
    total: 50,
    percentage: 30,
    unit: "GB",
    icon: HardDrive,
  },
]

export function BillingSettings() {
  function handleUpgrade() {
    toast({
      title: "Upgrade initiated",
      description: "You'll be redirected to complete your upgrade.",
    })
  }

  function handleUpdatePayment() {
    toast({
      title: "Payment method updated",
      description: "Your payment method has been updated successfully.",
    })
  }

  function handleDownloadInvoice(id: string) {
    toast({
      title: "Downloading invoice",
      description: `Invoice ${id} is being downloaded.`,
    })
  }

  return (
    <Card id="billing-settings" className="mb-8">
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>Manage your subscription plan, payment methods, and billing history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Current Plan</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-primary">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  Pro Plan
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $49<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>10 websites</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>100GB bandwidth</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>50GB storage</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Business Plan</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $99<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Unlimited websites</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>500GB bandwidth</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>200GB storage</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>24/7 support</span>
                  </li>
                </ul>
                <Button className="mt-4 w-full" onClick={handleUpgrade}>
                  Upgrade <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Enterprise Plan</CardTitle>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Custom</div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Unlimited everything</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>SLA guarantee</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-4 w-full">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Payment Method</h3>
          <RadioGroup defaultValue="card" className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 font-normal">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p>Credit Card</p>
                  <p className="text-sm text-muted-foreground">•••• •••• •••• 4242</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex items-center gap-2 font-normal">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.0711 7.42855C19.0711 5.25455 17.2931 3.42855 15.0711 3.42855H8.07109C7.51909 3.42855 7.07109 3.87655 7.07109 4.42855V19.4285C7.07109 19.9805 7.51909 20.4285 8.07109 20.4285H15.0711C17.2931 20.4285 19.0711 18.6025 19.0711 16.4285V7.42855Z"
                    fill="#003087"
                  />
                  <path
                    d="M7.07109 11.4285C7.07109 12.5335 7.96609 13.4285 9.07109 13.4285H17.0711C17.6231 13.4285 18.0711 12.9805 18.0711 12.4285V7.42855C18.0711 6.32355 17.1761 5.42855 16.0711 5.42855H8.07109C7.51909 5.42855 7.07109 5.87655 7.07109 6.42855V11.4285Z"
                    fill="#0070E0"
                  />
                  <path
                    d="M16.0711 15.4285C16.0711 16.5335 15.1761 17.4285 14.0711 17.4285H6.07109C5.51909 17.4285 5.07109 16.9805 5.07109 16.4285V11.4285C5.07109 10.3235 5.96609 9.42855 7.07109 9.42855H15.0711C15.6231 9.42855 16.0711 9.87655 16.0711 10.4285V15.4285Z"
                    fill="#001C64"
                  />
                </svg>
                <div>
                  <p>PayPal</p>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          <Button variant="outline" onClick={handleUpdatePayment}>
            Update Payment Method
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Billing Email</h3>
          <div className="flex gap-3 max-w-md">
            <Input defaultValue="john.doe@example.com" />
            <Button variant="outline">Update</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            This email will be used for sending invoices and billing-related communications.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Billing History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.plan}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 flex items-center gap-1"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Usage Overview</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {usageData.map((item) => (
              <Card key={item.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">{item.name}</h4>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.used}
                      {item.unit ? item.unit : ""} / {item.total}
                      {item.unit ? item.unit : ""}
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
