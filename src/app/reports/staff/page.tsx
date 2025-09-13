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
    User,
    Briefcase,
    Star,
    TrendingUp
} from "lucide-react"

// Sample staff performance data
const staffData = [
    {
        staffMember: "Sarah Johnson",
        services: 89,
        revenue: "₹12,650",
        avgRating: 4.5,
        efficiency: "90%",
        punctuality: 92
    },
    {
        staffMember: "David Chen",
        services: 76,
        revenue: "₹10,230",
        avgRating: 4.8,
        efficiency: "92%",
        punctuality: 88
    },
    {
        staffMember: "Ana Rodriguez",
        services: 82,
        revenue: "₹11,890",
        avgRating: 4.7,
        efficiency: "88%",
        punctuality: 95
    },
    {
        staffMember: "Michael Brown",
        services: 71,
        revenue: "₹9,560",
        avgRating: 4.6,
        efficiency: "85%",
        punctuality: 90
    },
]

const getPunctualityBar = (percentage: number) => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className="h-2 rounded-full bg-green-500 transition-all"
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}

const getRatingStars = (rating: number) => {
    return (
        <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{rating}</span>
        </div>
    )
}

// Mobile Staff Card Component
const StaffCard = ({ staff }: { staff: typeof staffData[0] }) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="space-y-4">
                    {/* Staff Member Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm leading-tight">{staff.staffMember}</h3>
                            <p className="text-xs text-gray-500 mt-1">{staff.services} services completed</p>
                        </div>
                        <div className="ml-2 shrink-0">
                            {getRatingStars(staff.avgRating)}
                        </div>
                    </div>

                    {/* Revenue and Efficiency */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-600 block text-xs">Revenue</span>
                            <span className="font-medium text-gray-900">{staff.revenue}</span>
                        </div>
                        <div>
                            <span className="text-gray-600 block text-xs">Efficiency</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {staff.efficiency}
                            </span>
                        </div>
                    </div>

                    {/* Punctuality */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Punctuality</span>
                            <span className="text-xs text-gray-500">{staff.punctuality}%</span>
                        </div>
                        {getPunctualityBar(staff.punctuality)}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function StaffReportsPage() {
    return (
        <div className="space-y-6">
            {/* Stats Cards - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Top Performer */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Top Performer
                        </CardTitle>
                        <User className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-base sm:text-lg font-bold text-gray-900">Sarah Johnson</div>
                        <p className="text-xs text-gray-500 mt-1">
                            89 services completed
                        </p>
                    </CardContent>
                </Card>

                {/* Total Services */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Services
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">318</div>
                        <p className="text-xs text-gray-500 mt-1">
                            This month
                        </p>
                    </CardContent>
                </Card>

                {/* Avg Rating */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Avg Rating
                        </CardTitle>
                        <Star className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">4.6</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Customer satisfaction
                        </p>
                    </CardContent>
                </Card>

                {/* Team Efficiency */}
                <Card className="hover:shadow-sm transition-shadow bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Team Efficiency
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900">90%</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Overall performance
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Responsive Staff Performance Display */}
            
            {/* Desktop View: Table */}
            <div className="hidden lg:block">
                <Card className="bg-white">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            Staff Performance Metrics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-gray-200">
                                        <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Staff Member</TableHead>
                                        <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Services</TableHead>
                                        <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Revenue</TableHead>
                                        <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Avg Rating</TableHead>
                                        <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Efficiency</TableHead>
                                        <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Punctuality</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {staffData.map((staff, index) => (
                                        <TableRow key={index} className="hover:bg-gray-50 border-b border-gray-100">
                                            <TableCell className="py-4">
                                                <div className="font-medium text-gray-900 text-sm">{staff.staffMember}</div>
                                            </TableCell>
                                            <TableCell className="text-gray-700 py-4 text-sm">{staff.services}</TableCell>
                                            <TableCell className="font-medium text-gray-900 py-4 text-sm">{staff.revenue}</TableCell>
                                            <TableCell className="py-4">
                                                {getRatingStars(staff.avgRating)}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                    {staff.efficiency}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="space-y-2 min-w-[120px]">
                                                    {getPunctualityBar(staff.punctuality)}
                                                    <div className="text-xs text-gray-500 text-right">{staff.punctuality}%</div>
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

            {/* Tablet View: Horizontal Scroll Table */}
            <div className="hidden md:block lg:hidden">
                <Card className="bg-white">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            Staff Performance Metrics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="overflow-x-auto">
                            <div className="min-w-[700px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-gray-200">
                                            <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Staff Member</TableHead>
                                            <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Services</TableHead>
                                            <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Revenue</TableHead>
                                            <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Rating</TableHead>
                                            <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Efficiency</TableHead>
                                            <TableHead className="font-semibold text-gray-800 bg-white h-12 text-sm">Punctuality</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {staffData.map((staff, index) => (
                                            <TableRow key={index} className="hover:bg-gray-50 border-b border-gray-100">
                                                <TableCell className="py-3">
                                                    <div className="font-medium text-gray-900 text-sm">{staff.staffMember}</div>
                                                </TableCell>
                                                <TableCell className="text-gray-700 py-3 text-sm">{staff.services}</TableCell>
                                                <TableCell className="font-medium text-gray-900 py-3 text-sm">{staff.revenue}</TableCell>
                                                <TableCell className="py-3">
                                                    {getRatingStars(staff.avgRating)}
                                                </TableCell>
                                                <TableCell className="py-3">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                        {staff.efficiency}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="py-3">
                                                    <div className="space-y-1 min-w-[100px]">
                                                        {getPunctualityBar(staff.punctuality)}
                                                        <div className="text-xs text-gray-500 text-right">{staff.punctuality}%</div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Mobile View: Staff Cards */}
            <div className="block md:hidden">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 px-2">
                        Staff Performance Metrics
                    </h3>
                    <div className="space-y-4">
                        {staffData.map((staff, index) => (
                            <StaffCard key={index} staff={staff} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
