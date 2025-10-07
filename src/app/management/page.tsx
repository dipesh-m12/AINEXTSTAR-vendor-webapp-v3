"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserCheck,
  UserPlus,
  DollarSign,
  Calendar,
  Star,
  Package,
  AlertTriangle,
  TrendingDown,
  Wallet,
  UsersRound,
  Briefcase,
  Search,
  Sparkles,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

type TabType = "customer" | "staff" | "inventory";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

function KPICard({ title, value, subtitle, icon }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden border-gray-200 bg-[#F9FFEE] p-6">
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#CCF656]">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-4xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </Card>
  );
}

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<TabType>("customer");
  const [customerSubTab, setCustomerSubTab] = useState<
    "all" | "membership" | "new"
  >("all");
  const [staffSubTab, setStaffSubTab] = useState<
    "all" | "service" | "commission"
  >("all");
  const [inventorySubTab, setInventorySubTab] = useState<"all" | "low" | "out">(
    "all"
  );

  // Sample data for Customer Management
  const pieData = [
    { name: "VIP", value: 57, color: "#A78BFA" },
    { name: "Regular", value: 31, color: "#60A5FA" },
    { name: "New", value: 12, color: "#34D399" },
  ];

  const lineData = [
    { month: "Jan", visits: 450, members: 20 },
    { month: "Feb", visits: 420, members: 25 },
    { month: "Mar", visits: 520, members: 30 },
    { month: "Apr", visits: 560, members: 28 },
    { month: "May", visits: 540, members: 32 },
    { month: "Jun", visits: 610, members: 38 },
  ];

  const servicePreferenceData = [
    { service: "Massage Therapy", count: 4 },
    { service: "Manicure", count: 3.5 },
    { service: "Facial Treatment", count: 3 },
    { service: "Hair Color", count: 2 },
    { service: "Hair Cut & Styling", count: 1.5 },
  ];

  const customers = [
    {
      id: "CUST001",
      name: "Emma Wilson",
      segment: "Membership",
      type: "Gold",
      lastAppointment: "10 Sep 2025",
      service: "Hair Cut & Styling",
      spend: "$300",
    },
    {
      id: "CUST002",
      name: "Mike Johnson",
      segment: "Regular",
      type: "None",
      lastAppointment: "08 Sep 2025",
      service: "Hair Color",
      spend: "$150",
    },
    {
      id: "CUST003",
      name: "Lisa Chen",
      segment: "New",
      type: "Platinum",
      lastAppointment: "10 Sep 2025",
      service: "Facial Treatment",
      spend: "$300",
    },
    {
      id: "CUST004",
      name: "Sarah Johnson",
      segment: "Membership",
      type: "Gold",
      lastAppointment: "05 Sep 2025",
      service: "Massage Therapy",
      spend: "$180",
    },
    {
      id: "CUST005",
      name: "Tom Martinez",
      segment: "Regular",
      type: "None",
      lastAppointment: "10 Sep 2025",
      service: "Hair Cut & Styling",
      spend: "$300",
    },
  ];

  const staff = [
    {
      name: "Emma Wilson",
      role: "Hair Cut & Styling, Nail Art",
      timing: "9:00 AM - 5:00 PM",
      appointments: 45,
      duration: "2 years",
      salary: "$2,000/m",
    },
    {
      name: "Emma Wilson",
      role: "Hair Cut & Styling, Nail Art",
      timing: "9:00 AM - 5:00 PM",
      appointments: 45,
      duration: "2 years",
      salary: "$2,000/m",
    },
    {
      name: "Emma Wilson",
      role: "Hair Cut & Styling, Nail Art",
      timing: "9:00 AM - 5:00 PM",
      appointments: 45,
      duration: "2 years",
      salary: "$2,000/m",
    },
    {
      name: "Emma Wilson",
      role: "Hair Cut & Styling, Nail Art",
      timing: "9:00 AM - 5:00 PM",
      appointments: 45,
      duration: "2 years",
      salary: "$2,000/m",
    },
    {
      name: "Emma Wilson",
      role: "Hair Cut & Styling, Nail Art",
      timing: "9:00 AM - 5:00 PM",
      appointments: 45,
      duration: "2 years",
      salary: "$2,000/m",
    },
  ];

  const products = [
    {
      name: "Hair Shampoo - Professional",
      brand: "Premium Pro",
      category: "Hair Care",
      stock: "25 / 50",
      percent: "50%",
      unitCost: "$12.5",
      retail: "$18",
      status: "in stock",
    },
    {
      name: "Hair Conditioner - Moisturizing",
      brand: "Premium Pro",
      category: "Hair Care",
      stock: "3 / 50",
      percent: "6%",
      unitCost: "$14",
      retail: "$20",
      status: "low stock",
    },
    {
      name: "Face Moisturizer - Anti-Aging",
      brand: "SkinLux",
      category: "Skincare",
      stock: "15 / 30",
      percent: "50%",
      unitCost: "$22",
      retail: "$32",
      status: "in stock",
    },
    {
      name: "Nail Polish - Classic Red",
      brand: "ColorMaster",
      category: "Nails",
      stock: "0 / 60",
      percent: "0%",
      unitCost: "$8",
      retail: "$12",
      status: "out of stock",
    },
    {
      name: "Hair Oil - Argan",
      brand: "Natural Essence",
      category: "Hair Care",
      stock: "18 / 40",
      percent: "45%",
      unitCost: "$16.5",
      retail: "$24",
      status: "in stock",
    },
    {
      name: "Facial Cleanser - Deep Clean",
      brand: "PureSkin",
      category: "Skincare",
      stock: "7 / 35",
      percent: "20%",
      unitCost: "$11",
      retail: "$16.5",
      status: "low stock",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900">
          {activeTab === "customer" && "Customer Management"}
          {activeTab === "staff" && "Staff Management"}
          {activeTab === "inventory" && "Inventory Management"}
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("customer")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "customer"
                ? "border-[#CCF656] bg-[#CCF656] text-gray-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Users className="h-4 w-4" />
            Customer Management
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "staff"
                ? "border-[#CCF656] bg-[#CCF656] text-gray-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Staff Management
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "inventory"
                ? "border-[#CCF656] bg-[#CCF656] text-gray-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Package className="h-4 w-4" />
            Inventory Management
          </button>
        </div>

        {/* Customer Management View */}
        {activeTab === "customer" && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Clients"
                value="120"
                subtitle="+5 from last previous month"
                icon={<UsersRound className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Membership Clients"
                value="20"
                subtitle="+3 from last month"
                icon={<DollarSign className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Regulars"
                value="60"
                subtitle="+2 from previous month"
                icon={<UserCheck className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="New Clients"
                value="40"
                subtitle="+10 from previous month"
                icon={<UserPlus className="h-5 w-5 text-gray-900" />}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Revenue by Client Segment */}
              <Card className="border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#CCF656]" />
                  <h3 className="font-semibold text-gray-900">
                    Revenue by Client Segment
                  </h3>
                </div>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-400" />
                      <span className="text-gray-600">VIP 57%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-400" />
                      <span className="text-gray-600">Regular 31%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                      <span className="text-gray-600">New 12%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Visit Frequency Trends */}
              <Card className="border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">
                    Visit Frequency Trends
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      stroke="#9ca3af"
                    />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", r: 4 }}
                      name="Visits"
                    />
                    <Line
                      type="monotone"
                      dataKey="members"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", r: 4 }}
                      name="Members"
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Top Service Preferences */}
              <Card className="border-gray-200 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold text-gray-900">
                    Top Service Preferences
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={servicePreferenceData}
                    layout="vertical"
                    margin={{ left: 8, right: 8, top: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis
                      dataKey="service"
                      type="category"
                      width={120}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      stroke="#9ca3af"
                    />
                    <Tooltip />
                    <Bar dataKey="count" radius={[4, 4, 4, 4]} fill="#CCF656" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Customer Table */}
            <Card className="border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCustomerSubTab("all")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      customerSubTab === "all"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Customers
                  </button>
                  <button
                    onClick={() => setCustomerSubTab("membership")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      customerSubTab === "membership"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Membership Customers
                  </button>
                  <button
                    onClick={() => setCustomerSubTab("new")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      customerSubTab === "new"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    New Customers
                  </button>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Search here..."
                    className="h-10 w-[300px] border-gray-200 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-semibold text-gray-900">
                      Customer ID
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Customer Name
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Segment
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Membership Type
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Last Appointment
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Preferred Service
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Total Spend
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer, idx) => (
                    <TableRow key={idx} className="border-gray-100">
                      <TableCell className="font-medium text-gray-900">
                        {customer.id}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {customer.name}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {customer.segment}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {customer.type}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {customer.lastAppointment}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {customer.service}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {customer.spend}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        )}

        {/* Staff Management View */}
        {activeTab === "staff" && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Staff"
                value="6"
                subtitle="6 active"
                icon={<UsersRound className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Today's Appointments"
                value="22"
                subtitle="across all staff"
                icon={<Calendar className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Monthly Revenue"
                value="$2000"
                subtitle="+15% from previous month"
                icon={<DollarSign className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Average Rating"
                value="4.8"
                subtitle="across all staff"
                icon={<Star className="h-5 w-5 text-gray-900" />}
              />
            </div>

            {/* Staff Table */}
            <Card className="border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setStaffSubTab("all")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      staffSubTab === "all"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Staff
                  </button>
                  <button
                    onClick={() => setStaffSubTab("service")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      staffSubTab === "service"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Service Based
                  </button>
                  <button
                    onClick={() => setStaffSubTab("commission")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      staffSubTab === "commission"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Commission Based
                  </button>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Search here..."
                    className="h-10 w-[300px] border-gray-200 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-semibold text-gray-900">
                      Staff Name
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Role/Expertise
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Shift Timing
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Monthly Appointments
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Duration
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Salary
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member, idx) => (
                    <TableRow key={idx} className="border-gray-100">
                      <TableCell className="font-medium text-gray-900">
                        {member.name}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {member.role}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {member.timing}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {member.appointments}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {member.duration}
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {member.salary}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        )}

        {/* Inventory Management View */}
        {activeTab === "inventory" && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Products"
                value="6"
                subtitle="total products"
                icon={<Package className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Low Stock Alerts"
                value="2"
                subtitle="needs re-ordering"
                icon={<AlertTriangle className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Out of Stock"
                value="1"
                subtitle="out of stock items"
                icon={<TrendingDown className="h-5 w-5 text-gray-900" />}
              />
              <KPICard
                title="Total Value"
                value="$1050"
                subtitle="current inventory value"
                icon={<Wallet className="h-5 w-5 text-gray-900" />}
              />
            </div>

            {/* Inventory Table */}
            <Card className="border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setInventorySubTab("all")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      inventorySubTab === "all"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => setInventorySubTab("low")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      inventorySubTab === "low"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Low Stock
                  </button>
                  <button
                    onClick={() => setInventorySubTab("out")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      inventorySubTab === "out"
                        ? "bg-[#CCF656] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Out of Stock
                  </button>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Search here..."
                    className="h-10 w-[300px] border-gray-200 pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  {/* [#CCF656] */}
                  <TableRow className="bg-gray-100">
                    <TableHead className="font-semibold text-gray-900">
                      Product
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Stock Level
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Unit Cost
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Retail Price
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, idx) => (
                    <TableRow key={idx} className="border-gray-100">
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {product.category}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <span>{product.stock}</span>
                            <span className="text-gray-500">
                              {product.percent}
                            </span>
                          </div>
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={`h-full ${
                                product.status === "in stock"
                                  ? "bg-green-500"
                                  : product.status === "low stock"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: product.percent,
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {product.unitCost}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {product.retail}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${
                            product.status === "in stock"
                              ? "bg-green-100 text-green-700"
                              : product.status === "low stock"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
