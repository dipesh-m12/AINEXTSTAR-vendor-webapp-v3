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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header with download buttons - Responsive */}
      <div className="bg-white border-b px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Reports & Analytics
            </h1>
            <p className="text-gray-600 text-sm mt-1 hidden sm:block">
              Comprehensive business insights and performance metrics
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs h-8 px-3">
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">Excel</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs h-8 px-3">
              <FileText className="h-3 w-3" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Responsive */}
      <div className="bg-white border-b px-3 sm:px-4 lg:px-6 py-3">
        <div className="inline-flex rounded-lg bg-gray-100 p-1 gap-1 overflow-x-auto max-w-full">
          {tabs.map((tab) => (
            <Link key={tab.key} href={tab.path}>
              <Button
                variant="ghost"
                size="sm"
                className={`${pathname === tab.path || (pathname === "/reports" && tab.key === "sales")
                    ? "bg-white text-gray-900 shadow-sm hover:bg-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } text-sm h-8 whitespace-nowrap shrink-0 rounded-md px-3 transition-colors font-medium`}
              >
                {tab.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Filters Section - Optimized for all screen sizes */}
      <div className="bg-white border-b px-3 sm:px-4 lg:px-6 py-3">
        {/* Desktop View (1200px+) */}
        <div className="hidden xl:flex gap-3 items-end justify-between">
          <div className="flex gap-3 flex-1 min-w-0">
            <div className="flex flex-col gap-1.5 min-w-0">
              <label className="text-xs font-medium text-gray-700">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-32 h-8 text-sm rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="sales-list">Sales List</SelectItem>
                  <SelectItem value="services-list">Services List</SelectItem>
                  <SelectItem value="staff-list">Staff List</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <label className="text-xs font-medium text-gray-700">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32 h-8 text-sm rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <label className="text-xs font-medium text-gray-700">Payment</label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger className="w-24 h-8 text-sm rounded-lg bg-gray-100 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5 min-w-0 flex-1 max-w-48">
              <label className="text-xs font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                <Input
                  placeholder="Search Invoice ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-8 text-sm rounded-lg bg-gray-100 border-gray-200 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button className="bg-lime-500 hover:bg-lime-600 text-white px-4 rounded-lg h-8 text-sm flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              View Report
            </Button>
            <Button variant="outline" className="px-3 rounded-lg h-8 text-sm flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Large Tablet View (1024px - 1199px) */}
        <div className="hidden lg:block xl:hidden">
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full h-8 text-sm rounded-lg bg-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales-list">Sales List</SelectItem>
                    <SelectItem value="services-list">Services</SelectItem>
                    <SelectItem value="staff-list">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full h-8 text-sm rounded-lg bg-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Payment</label>
                <Select value={paymentMode} onValueChange={setPaymentMode}>
                  <SelectTrigger className="w-full h-8 text-sm rounded-lg bg-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                  <Input
                    placeholder="Invoice ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-8 text-sm rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-lime-500 hover:bg-lime-600 text-white rounded-lg h-8 text-sm flex items-center gap-1.5 flex-1">
                <Eye className="h-3.5 w-3.5" />
                View Report
              </Button>
              <Button variant="outline" className="rounded-lg h-8 text-sm flex items-center gap-1.5 px-4">
                <Filter className="h-3.5 w-3.5" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile/Small Tablet View */}
        <div className="block lg:hidden space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full h-9 rounded-lg bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales-list">Sales List</SelectItem>
                  <SelectItem value="services-list">Services List</SelectItem>
                  <SelectItem value="staff-list">Staff List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full h-9 rounded-lg bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">Payment Mode</label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger className="w-full h-9 rounded-lg bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by Invoice ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-lime-500 hover:bg-lime-600 text-white rounded-lg h-9 flex items-center justify-center gap-2 flex-1">
              <Eye className="h-4 w-4" />
              View Report
            </Button>
            <Button variant="outline" className="rounded-lg h-9 flex items-center justify-center gap-2 sm:px-4">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="p-3 sm:p-4 lg:p-6">
        {children}
      </main>
    </div>
  )
}
