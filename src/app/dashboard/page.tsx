"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Users, Star, CalendarDays } from "lucide-react";

interface Appointment {
  id: string;
  time: string;
  customerName: string;
  serviceName: string;
  staffAppointed: string;
  status: "Completed" | "Cancelled" | "Upcoming";
  bill: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    time: "9:00",
    customerName: "Emma Wilson",
    serviceName: "• Hair Cut & Styling\n• Nail Art",
    staffAppointed: "Sarah",
    status: "Completed",
    bill: "View Bill",
  },
  {
    id: "2",
    time: "11:00",
    customerName: "Mike Johnson",
    serviceName: "• Hair Color",
    staffAppointed: "Sarah",
    status: "Cancelled",
    bill: "View Bill",
  },
  {
    id: "3",
    time: "14:00",
    customerName: "Lisa Chen",
    serviceName: "• Hair Cut & Styling\n• Nail Art",
    staffAppointed: "David",
    status: "Completed",
    bill: "View Bill",
  },
  {
    id: "4",
    time: "14:00",
    customerName: "Sarah Johnson",
    serviceName: "• Hair Cut & Styling",
    staffAppointed: "David",
    status: "Completed",
    bill: "View Bill",
  },
  {
    id: "5",
    time: "14:00",
    customerName: "Tom Martinez",
    serviceName: "• Manicure & Nail art",
    staffAppointed: "David",
    status: "Completed",
    bill: "View Bill",
  },
  {
    id: "6",
    time: "14:00",
    customerName: "Emma Wilson",
    serviceName: "• Hair Cut & Styling\n• Nail Art",
    staffAppointed: "David",
    status: "Upcoming",
    bill: "View Bill",
  },
  {
    id: "7",
    time: "14:00",
    customerName: "Mike Johnson",
    serviceName: "• Manicure & Nail art",
    staffAppointed: "David",
    status: "Cancelled",
    bill: "View Bill",
  },
  {
    id: "8",
    time: "14:00",
    customerName: "Lisa Chen",
    serviceName: "• Manicure & Nail art",
    staffAppointed: "David",
    status: "Upcoming",
    bill: "View Bill",
  },
];

export default function DashboardPage() {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "Completed":
        return "text-emerald-600";
      case "Cancelled":
        return "text-red-600";
      case "Upcoming":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Appointments */}
        <Card className="bg-[#F9FFEE] border-none shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Today&apos;s Appointments
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-[#CCF656] flex items-center justify-center">
              <Calendar className="h-5 w-5 text-gray-900" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900 mb-1">24</div>
            <p className="text-xs text-gray-600">+3 from yesterday</p>
          </CardContent>
        </Card>

        {/* Today's Revenue */}
        <Card className="bg-[#F9FFEE] border-none shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Today&apos;s Revenue
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-[#CCF656] flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-gray-900" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900 mb-1">$2,840</div>
            <p className="text-xs text-gray-600">+3 from yesterday</p>
          </CardContent>
        </Card>

        {/* Customer Visits */}
        <Card className="bg-[#F9FFEE] border-none shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Customer Visits
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-[#CCF656] flex items-center justify-center">
              <Users className="h-5 w-5 text-gray-900" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900 mb-1">18</div>
            <p className="text-xs text-gray-600">+3 from yesterday</p>
          </CardContent>
        </Card>

        {/* Staff Utilization */}
        <Card className="bg-[#F9FFEE] border-none shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Staff Utilization
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-[#CCF656] flex items-center justify-center">
              <Star className="h-5 w-5 text-gray-900" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900 mb-1">87%</div>
            <p className="text-xs text-gray-600">+3 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments Table */}
      <Card className="bg-white border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Today&apos;s Appointments
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            Select Date
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          {/* Table Header */}
          <div className="grid grid-cols-[80px_1fr_1.2fr_1fr_100px_100px] gap-4 px-6 pb-3 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>Time</div>
            <div>Customer Name</div>
            <div>Service Name</div>
            <div>Staff Appointed</div>
            <div>Status</div>
            <div>Bill</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="grid grid-cols-[80px_1fr_1.2fr_1fr_100px_100px] gap-4 px-6 py-4 text-sm hover:bg-gray-50 transition-colors"
              >
                <div className="text-gray-600">{appointment.time}</div>
                <div className="text-gray-900">{appointment.customerName}</div>
                <div className="text-gray-600 whitespace-pre-line">
                  {appointment.serviceName}
                </div>
                <div className="text-gray-600">
                  {appointment.staffAppointed}
                </div>
                <div
                  className={`font-medium ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </div>
                <div className="text-gray-600 underline cursor-pointer hover:text-gray-900">
                  {appointment.bill}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
