"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Star,
  DollarSign,
  TrendingUp,
  Clock
} from "lucide-react"

// Sample service performance data
const serviceData = [
  {
    serviceName: "Hair Cut & Styling",
    bookings: 124,
    revenue: "₹8,620",
    avgPrice: "₹69",
    growth: "+9%",
    utilization: 85
  },
  {
    serviceName: "Hair Coloring",
    bookings: 78,
    revenue: "₹6,240",
    avgPrice: "₹80",
    growth: "+6%",
    utilization: 72
  },
  {
    serviceName: "Facial Treatment",
    bookings: 65,
    revenue: "₹4,160",
    avgPrice: "₹64",
    growth: "+5%",
    utilization: 68
  },
  {
    serviceName: "Manicure & Pedicure",
    bookings: 89,
    revenue: "₹3,560",
    avgPrice: "₹40",
    growth: "+3%",
    utilization: 61
  },
  {
    serviceName: "Massage Therapy",
    bookings: 45,
    revenue: "₹2,840",
    avgPrice: "₹63",
    growth: "+8%",
    utilization: 55
  },
]

const getUtilizationBar = (percentage: number) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="h-2 rounded-full bg-lime-400 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

// Mobile Service Card Component
const ServiceCard = ({ service }: { service: typeof serviceData[0] }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm leading-tight">{service.serviceName}</h3>
              <p className="text-xs text-gray-500 mt-1">{service.bookings} bookings</p>
            </div>
            <div className="ml-2 shrink-0">
              <span className="text-green-600 font-medium text-sm">{service.growth}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 block text-xs">Revenue</span>
              <span className="font-medium text-gray-900">{service.revenue}</span>
            </div>
            <div>
              <span className="text-gray-600 block text-xs">Avg Price</span>
              <span className="font-medium text-gray-900">{service.avgPrice}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Utilization</span>
              <span className="text-xs text-gray-500">{service.utilization}%</span>
            </div>
            {getUtilizationBar(service.utilization)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ServicesReportsPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Most Popular Service */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Most Popular Service
            </CardTitle>
            <Star className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg font-bold text-gray-900">Hair Cut & Styling</div>
            <p className="text-xs text-gray-500 mt-1">
              124 appointments this period
            </p>
          </CardContent>
        </Card>

        {/* Highest Revenue Service */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Highest Revenue Service
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">₹8,620</div>
            <p className="text-xs text-gray-500 mt-1">
              Hair Cut & Styling
            </p>
          </CardContent>
        </Card>

        {/* Fastest Growing */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Fastest Growing
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg font-bold text-gray-900">Massage Therapy</div>
            <p className="text-xs text-gray-500 mt-1">
              +8% growth this month
            </p>
          </CardContent>
        </Card>

        {/* Average Service Time */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Service Time
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">65 min</div>
            <p className="text-xs text-gray-500 mt-1">
              Across all services
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Responsive Table Display */}

      {/* Desktop View: Table */}
      <div className="hidden lg:block">
        <Card className="bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Service Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Service Name</TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Bookings</TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Revenue</TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Avg Price</TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Growth</TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceData.map((service, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 border-b border-gray-100">
                      <TableCell className="py-4">
                        <div className="font-medium text-gray-900 text-sm">{service.serviceName}</div>
                      </TableCell>
                      <TableCell className="text-gray-700 py-4 text-sm">{service.bookings}</TableCell>
                      <TableCell className="font-medium text-gray-900 py-4 text-sm">{service.revenue}</TableCell>
                      <TableCell className="font-medium text-gray-900 py-4 text-sm">{service.avgPrice}</TableCell>
                      <TableCell className="py-4">
                        <span className="text-green-600 font-medium text-sm">{service.growth}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="space-y-2 min-w-[120px]">
                          {getUtilizationBar(service.utilization)}
                          <div className="text-xs text-gray-500 text-right">{service.utilization}%</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile/Tablet View: Cards */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 px-2">
            Service Performance Analysis
          </h3>
          <div className="space-y-4">
            {serviceData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
