"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    UserCheck,
    DollarSign,
    TrendingUp
} from "lucide-react"

// Sample client acquisition data
const acquisitionData = [
    {
        source: "Walk-ins",
        subtitle: "Direct visits",
        percentage: 45,
        change: "+3%"
    },
    {
        source: "Online Booking",
        subtitle: "Website & app",
        percentage: 32,
        change: "+2%"
    },
    {
        source: "Referrals",
        subtitle: "Word of mouth",
        percentage: 23,
        change: "-2%"
    }
]

// Sample demographics data
const demographicsData = [
    { ageGroup: "Age 18-25", percentage: 15 },
    { ageGroup: "Age 26-35", percentage: 35 },
    { ageGroup: "Age 36-50", percentage: 40 },
    { ageGroup: "Age 50+", percentage: 10 },
]

const getProgressBar = (percentage: number, color: string = "bg-lime-400") => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className={`h-2 rounded-full transition-all ${color}`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}

// Mobile Acquisition Card Component
const AcquisitionCard = ({ item }: { item: typeof acquisitionData[0] }) => {
    return (
        <Card className="hover:shadow-md transition-shadow bg-gray-100">
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-base">{item.source}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{item.percentage}%</div>
                        <div className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {item.change}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Mobile Demographics Card Component
const DemographicsCard = ({ item }: { item: typeof demographicsData[0] }) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm">{item.ageGroup}</h3>
                        </div>
                        <div className="ml-2 shrink-0">
                            <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {getProgressBar(item.percentage, "bg-lime-400")}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ClientsReportsPage() {
    return (
        <div className="space-y-6">
            {/* Stats Cards - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* New Clients */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            New Clients
                        </CardTitle>
                        <Users className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">24</div>
                        <p className="text-xs text-gray-500 mt-1">
                            This month
                        </p>
                    </CardContent>
                </Card>

                {/* Retention Rate */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Retention Rate
                        </CardTitle>
                        <UserCheck className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">78%</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Client return rate
                        </p>
                    </CardContent>
                </Card>

                {/* Avg Spend */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Avg Spend
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">₹1196</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Per visit
                        </p>
                    </CardContent>
                </Card>

                {/* VIP Clients */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            VIP Clients
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">45</div>
                        <p className="text-xs text-gray-500 mt-1">
                            High-value customers
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Desktop View: Side by Side Layout */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Client Acquisition Trends */}
                    <Card className="bg-white">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Client Acquisition Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            {acquisitionData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900 text-base">{item.source}</div>
                                        <div className="text-sm text-gray-500">{item.subtitle}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-gray-900">{item.percentage}%</div>
                                        <div className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {item.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Client Demographics */}
                    <Card className="bg-white">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Client Demographics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            {demographicsData.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">{item.ageGroup}</span>
                                        <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                                    </div>
                                    {getProgressBar(item.percentage, "bg-lime-400")}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Tablet View: Stacked Cards */}
            <div className="hidden md:block lg:hidden">
                <div className="space-y-6">
                    {/* Client Acquisition Trends */}
                    <Card className="bg-white">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Client Acquisition Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            {acquisitionData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-900 text-base">{item.source}</div>
                                        <div className="text-sm text-gray-500">{item.subtitle}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">{item.percentage}%</div>
                                        <div className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {item.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Client Demographics */}
                    <Card className="bg-white">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                                Client Demographics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {demographicsData.map((item, index) => (
                                    <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">{item.ageGroup}</span>
                                            <span className="text-xl font-bold text-gray-900">{item.percentage}%</span>
                                        </div>
                                        {getProgressBar(item.percentage, "bg-yellow-400")}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Mobile View: Individual Cards */}
            <div className="block md:hidden">
                <div className="space-y-6">
                    {/* Client Acquisition Trends - Mobile */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 px-2">
                            Client Acquisition Trends
                        </h3>
                        <div className="space-y-4">
                            {acquisitionData.map((item, index) => (
                                <AcquisitionCard key={index} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* Client Demographics - Mobile */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 px-2">
                            Client Demographics
                        </h3>
                        <div className="space-y-4">
                            {demographicsData.map((item, index) => (
                                <DemographicsCard key={index} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
