"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Download, FileText, Filter, Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const tabs = [
  { key: "sales", label: "Sales", path: "/reports/sales" },
  { key: "services", label: "Services", path: "/reports/services" },
  { key: "staff", label: "Staff", path: "/reports/staff" },
  { key: "clients", label: "Clients", path: "/reports/clients" },
  { key: "insights", label: "Insights", path: "/reports/insights" },
]

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [reportType, setReportType] = useState("sales-list")
  const [dateRange, setDateRange] = useState("yesterday")
  const [paymentMode, setPaymentMode] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with download buttons - Responsive */}
      <div className="bg-white border-b px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              Reports & Analytics
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Comprehensive business insights and performance metrics
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs h-8 flex-1 sm:flex-none">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:hidden">Excel</span>
              <span className="hidden sm:inline">Download Excel</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs h-8 flex-1 sm:flex-none">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline sm:hidden">PDF</span>
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Responsive with proper spacing */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        {/* Desktop/Tablet View - Horizontal tabs */}
        <div className="hidden sm:block">
          <div className="inline-flex rounded-lg bg-gray-100 p-1 gap-1">
            {tabs.map((tab) => (
              <Link key={tab.key} href={tab.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${pathname === tab.path || (pathname === "/reports" && tab.key === "sales")
                      ? "bg-white text-gray-900 shadow-sm hover:bg-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    } text-sm h-9 whitespace-nowrap shrink-0 rounded-md px-4 transition-colors font-medium`}
                >
                  {tab.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile View - Scrollable horizontal tabs */}
        <div className="block sm:hidden">
          <div className="flex rounded-lg bg-gray-100 p-1 gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <Link key={tab.key} href={tab.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${pathname === tab.path || (pathname === "/reports" && tab.key === "sales")
                      ? "bg-white text-gray-900 shadow-sm hover:bg-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    } text-sm h-9 whitespace-nowrap shrink-0 rounded-md px-6 transition-colors font-medium min-w-fit`}
                >
                  {tab.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section - Fully responsive */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        {/* Desktop/Tablet View */}
        <div className="hidden lg:flex gap-4 items-end justify-between">
          {/* Filter Controls */}
          <div className="flex gap-4 flex-1">
            {/* Report Type */}
            <div className="flex flex-col gap-2 min-w-0">
              <label className="text-sm font-medium text-gray-700">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-40 rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="sales-list" className="rounded-md">Sales List</SelectItem>
                  <SelectItem value="services-list" className="rounded-md">Services List</SelectItem>
                  <SelectItem value="staff-list" className="rounded-md">Staff List</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="flex flex-col gap-2 min-w-0">
              <label className="text-sm font-medium text-gray-700">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40 rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="yesterday" className="rounded-md">Yesterday</SelectItem>
                  <SelectItem value="today" className="rounded-md">Today</SelectItem>
                  <SelectItem value="this-week" className="rounded-md">This Week</SelectItem>
                  <SelectItem value="this-month" className="rounded-md">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Mode */}
            <div className="flex flex-col gap-2 min-w-0">
              <label className="text-sm font-medium text-gray-700">
                Payment Mode
              </label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger className="w-40 rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="all" className="rounded-md">All</SelectItem>
                  <SelectItem value="cash" className="rounded-md">Cash</SelectItem>
                  <SelectItem value="card" className="rounded-md">Card</SelectItem>
                  <SelectItem value="upi" className="rounded-md">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-2 min-w-0">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by Invoice ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48 rounded-lg bg-gray-100 border-gray-200 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 shrink-0">
            <Button className="bg-lime-500 hover:bg-lime-600 text-white px-6 rounded-lg h-10 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Report
            </Button>
            <Button variant="outline" className="px-4 rounded-lg h-10 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Mobile/Tablet View - Stacked layout */}
        <div className="block lg:hidden space-y-4">
          {/* Row 1: Report Type and Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="sales-list" className="rounded-md">Sales List</SelectItem>
                  <SelectItem value="services-list" className="rounded-md">Services List</SelectItem>
                  <SelectItem value="staff-list" className="rounded-md">Staff List</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="yesterday" className="rounded-md">Yesterday</SelectItem>
                  <SelectItem value="today" className="rounded-md">Today</SelectItem>
                  <SelectItem value="this-week" className="rounded-md">This Week</SelectItem>
                  <SelectItem value="this-month" className="rounded-md">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Payment Mode and Search */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Payment Mode
              </label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger className="w-full rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="all" className="rounded-md">All</SelectItem>
                  <SelectItem value="cash" className="rounded-md">Cash</SelectItem>
                  <SelectItem value="card" className="rounded-md">Card</SelectItem>
                  <SelectItem value="upi" className="rounded-md">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by Invoice ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full rounded-lg bg-gray-100 border-gray-200 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-lime-500 hover:bg-lime-600 text-white rounded-lg h-10 flex items-center justify-center gap-2 flex-1">
              <Eye className="h-4 w-4" />
              View Report
            </Button>
            <Button variant="outline" className="rounded-lg h-10 flex items-center justify-center gap-2 flex-1 sm:flex-none sm:px-6">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">More Filters</span>
              <span className="sm:hidden">Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="p-4 sm:p-6">
        {children}
      </main>
    </div>
  )
}
