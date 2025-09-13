"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Clock,
    UserX,
    Calendar,
    TrendingUp,
    DollarSign,
    Users,
    Activity,
    BarChart3
} from "lucide-react"

// Sample daily performance data
const dailyPerformanceData = [
    {
        period: "Today",
        appointments: 12,
        noShows: 2,
        revenue: "₹2,840",
        avgTicket: "₹237"
    },
    {
        period: "Yesterday",
        appointments: 15,
        noShows: 1,
        revenue: "₹3,460",
        avgTicket: "₹231"
    },
    {
        period: "This Week",
        appointments: 94,
        noShows: 8,
        revenue: "₹22,480",
        avgTicket: "₹239"
    },
    {
        period: "Last Week",
        appointments: 87,
        noShows: 12,
        revenue: "₹19,760",
        avgTicket: "₹227"
    }
]

// Sample key business metrics
const businessMetrics = [
    {
        title: "Customer Lifetime Value",
        value: "₹2,840",
        subtitle: "Average client worth",
        change: "+12%",
        positive: true
    },
    {
        title: "Service Utilization",
        value: "87%",
        subtitle: "Capacity efficiency",
        change: "Optimal",
        positive: true
    },
    {
        title: "Revenue Per Hour",
        value: "₹145",
        subtitle: "Operational efficiency",
        change: "+8%",
        positive: true
    }
]

// Mobile Performance Card Component
const PerformanceCard = ({ item }: { item: typeof dailyPerformanceData[0] }) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 text-sm">{item.period}</h3>
                        <span className="text-lg font-bold text-gray-900">{item.revenue}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600 block text-xs">Appointments</span>
                            <span className="font-medium text-gray-900">{item.appointments}</span>
                        </div>
                        <div>
                            <span className="text-gray-600 block text-xs">No Shows</span>
                            <span className="font-medium text-gray-900">{item.noShows}</span>
                        </div>
                    </div>

                    <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-xs">Avg Ticket</span>
                            <span className="font-medium text-gray-900">{item.avgTicket}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Mobile Metrics Card Component - Fixed
const MetricsCard = ({ item }: { item: typeof businessMetrics[0] }) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                        <div className="text-xl font-bold text-gray-900">{item.value}</div>
                        <div className={`text-xs font-medium mt-1 ${item.change === 'Optimal' ? 'text-blue-600' :
                                item.positive ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {item.change}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function InsightsReportsPage() {
    return (
        <div className="space-y-6">
            {/* Stats Cards - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Peak Hours */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Peak Hours
                        </CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">2PM - 5PM</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Busiest time
                        </p>
                    </CardContent>
                </Card>

                {/* No-Show Rate */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            No-Show Rate
                        </CardTitle>
                        <UserX className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">5.6%</div>
                        <p className="text-xs text-gray-500 mt-1">
                            +1.2% from last month
                        </p>
                    </CardContent>
                </Card>

                {/* Booking Lead Time */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Booking Lead Time
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">3.2 days</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Average advance booking
                        </p>
                    </CardContent>
                </Card>

                {/* Profit Margin */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Profit Margin
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">68%</div>
                        <p className="text-xs text-gray-500 mt-1">
                            September 2025
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Desktop View: Side by Side Layout */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daily Performance Summary */}
                    <Card className="bg-white">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Daily Performance Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            {dailyPerformanceData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{item.period}</div>
                                        <div className="text-sm text-gray-500">
                                            {item.appointments} appointments • {item.noShows} no shows
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">{item.revenue}</div>
                                        <div className="text-sm text-gray-500">{item.avgTicket}</div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Key Business Metrics - Fixed Layout */}
                    <Card className="bg-white">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Key Business Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            {businessMetrics.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                                        <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className="text-xl font-bold text-gray-900">{item.value}</div>
                                        <div className={`text-xs font-medium mt-1 ${item.change === 'Optimal' ? 'text-blue-600' :
                                                item.positive ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {item.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile/Tablet View: Simplified approach - same cards for both */}
            <div className="block lg:hidden">
                <div className="space-y-6">
                    {/* Daily Performance Summary */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 px-2">
                            Daily Performance Summary
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {dailyPerformanceData.map((item, index) => (
                                <PerformanceCard key={index} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* Key Business Metrics */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 px-2">
                            Key Business Metrics
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {businessMetrics.map((item, index) => (
                                <MetricsCard key={index} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
