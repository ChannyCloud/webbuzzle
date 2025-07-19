"use client"

// Dashboard page template - displays summary information and quick access buttons.
// In the functional version, these cards would display real-time data from APIs.

import { DashboardLayout } from "../DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketCheck, FileText, FolderKanban, Code, ArrowUpRight, TrendingUp, TrendingDown, Minus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // This would be fetched from an API in the functional version
  const summaryData = {
    tickets: {
      count: 24,
      trend: "up",
      percentage: 12,
    },
    invoices: {
      count: 156,
      trend: "down",
      percentage: 8,
    },
    projects: {
      count: 38,
      trend: "up",
      percentage: 24,
    },
    deploys: {
      count: 92,
      trend: "neutral",
      percentage: 0,
    },
  }

  // Helper function to render trend indicator
  const renderTrend = (trend: string, percentage: number) => {
    if (trend === "up") {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="mr-1 h-4 w-4" />
          <span>{percentage}%</span>
        </div>
      )
    } else if (trend === "down") {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="mr-1 h-4 w-4" />
          <span>{percentage}%</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-gray-600">
          <Minus className="mr-1 h-4 w-4" />
          <span>{percentage}%</span>
        </div>
      )
    }
  }

  return (
    <DashboardLayout>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John Doe</h1>
        <p className="text-gray-500 dark:text-gray-400">Here's what's happening with your projects today.</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Tickets card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <TicketCheck className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.tickets.count}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {renderTrend(summaryData.tickets.trend, summaryData.tickets.percentage)}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Invoices card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.invoices.count}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {renderTrend(summaryData.invoices.trend, summaryData.invoices.percentage)}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Projects card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.projects.count}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {renderTrend(summaryData.projects.trend, summaryData.projects.percentage)}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Deploys card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Deploys</CardTitle>
            <Code className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.deploys.count}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {renderTrend(summaryData.deploys.trend, summaryData.deploys.percentage)}
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick access buttons */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Button className="flex items-center justify-between" variant="outline" asChild>
          <Link href="/tickets">
            <div className="flex items-center">
              <TicketCheck className="mr-2 h-4 w-4" />
              <span>Go to Tickets</span>
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button className="flex items-center justify-between" variant="outline" asChild>
          <Link href="/projects">
            <div className="flex items-center">
              <FolderKanban className="mr-2 h-4 w-4" />
              <span>View Projects</span>
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button className="flex items-center justify-between" variant="outline" asChild>
          <Link href="/code">
            <div className="flex items-center">
              <Code className="mr-2 h-4 w-4" />
              <span>Engineering Tools</span>
            </div>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Recent activity section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {/* Activity items would be dynamically generated in the functional version */}
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center p-4">
                  <div className="mr-4 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {item % 3 === 0 ? (
                      <TicketCheck className="h-4 w-4" />
                    ) : item % 3 === 1 ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <FolderKanban className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item % 3 === 0 ? "New ticket created" : item % 3 === 1 ? "Invoice paid" : "Project updated"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{`${Math.floor(item * 10)} minutes ago`}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
