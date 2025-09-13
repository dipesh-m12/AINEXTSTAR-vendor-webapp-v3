"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts'
import {
  Receipt,
  DollarSign,
  TrendingUp,
  Calculator
} from "lucide-react"

// Sample data matching your wireframe
const monthlyData = [
  { month: 'Jan', value: 11000 },
  { month: 'Feb', value: 13000 },
  { month: 'Mar', value: 15000 },
  { month: 'Apr', value: 14000 },
  { month: 'May', value: 17000 },
  { month: 'Jun', value: 20000 },
]

// Mobile Card Component for Chart Data
const ChartDataCard = ({ month, value }: { month: string, value: number }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{month}</h3>
            <p className="text-xs text-gray-500 mt-1">Monthly Revenue</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">₹{(value / 1000).toFixed(0)}k</div>
            <div className="w-8 h-2 bg-lime-400 rounded-full mt-2"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SalesReportsPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* No. of Bills */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              No. of Bills
            </CardTitle>
            <Receipt className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">7</div>
            <p className="text-xs text-gray-500 mt-1">
              +5% from last yesterday
            </p>
          </CardContent>
        </Card>

        {/* Total Bill Value */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Bill Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">₹23,860</div>
            <p className="text-xs text-gray-500 mt-1">
              +5% from last yesterday
            </p>
          </CardContent>
        </Card>

        {/* Tips Value */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tips Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">₹0</div>
            <p className="text-xs text-gray-500 mt-1">
              +0% from last yesterday
            </p>
          </CardContent>
        </Card>

        {/* Avg Order Value */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Order Value
            </CardTitle>
            <Calculator className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">₹3,408</div>
            <p className="text-xs text-gray-500 mt-1">
              +12% from last yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Responsive Chart Display */}

      {/* Desktop/Tablet View: Chart */}
      <div className="hidden md:block">
        <Card className="bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Monthly Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barCategoryGap="20%"
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    domain={[0, 22000]}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    ticks={[0, 6500, 13000, 19500]}
                  />
                  <Bar
                    dataKey="value"
                    fill="#84CC16"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={80}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile View: Chart Data as Cards */}
      <div className="block md:hidden">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 px-2">
            Monthly Revenue Trends
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {monthlyData.map((data) => (
              <ChartDataCard key={data.month} month={data.month} value={data.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
