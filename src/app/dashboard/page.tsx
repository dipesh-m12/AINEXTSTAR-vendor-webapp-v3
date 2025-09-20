/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// Helo dipesh
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  Users,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  Eye,
} from "lucide-react";
interface Appointment {
  id: number;
  time: string;
  client: string;
  service: string;
  status: "completed" | "in progress" | "upcoming";
  statusColor: string;
}
interface Notification {
  id: number;
  message: string;
  time: string;
  icon: React.ReactNode;
}

// Sample appointments data
const todayAppointments: Appointment[] = [
  {
    id: 1,
    time: "09:00",
    client: "Emma Wilson",
    service: "Hair Cut & Styling + Shave",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    time: "10:30",
    client: "Mike Johnson",
    service: "Beard Trim + Beard",
    status: "completed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    time: "11:00",
    client: "Lisa Chen",
    service: "Manicure + Pedi",
    status: "in progress",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 4,
    time: "14:00",
    client: "Sarah Johnson",
    service: "Hair Color + Blowdry",
    status: "upcoming",
    statusColor: "bg-gray-100 text-gray-800",
  },
  {
    id: 5,
    time: "15:30",
    client: "Tom Martinez",
    service: "Hair Cut + Beard",
    status: "upcoming",
    statusColor: "bg-gray-100 text-gray-800",
  },
];

// Sample notifications data
const notifications: Notification[] = [
  {
    id: 1,
    message: "Hair color appointment reminder for Sarah Johnson at 2:00 PM",
    time: "10 min ago",
    icon: <Calendar className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 2,
    message: "Low stock alert: Hair conditioner (3 bottles left)",
    time: "2 hours ago",
    icon: <AlertCircle className="h-4 w-4 text-orange-500" />,
  },
  {
    id: 3,
    message: "New 5-star review from Maria Garcia",
    time: "3 hours ago",
    icon: <Activity className="h-4 w-4 text-green-500" />,
  },
  {
    id: 4,
    message: "Staff meeting scheduled for 6:00 PM",
    time: "1 hours ago",
    icon: <Users className="h-4 w-4 text-purple-500" />,
  },
];

// Mobile Appointment Card Component
const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon(appointment.status)}
            <span className="font-medium text-sm">{appointment.time}</span>
          </div>
          <Badge className={appointment.statusColor} variant="secondary">
            {appointment.status}
          </Badge>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm mb-1">
            {appointment.client}
          </h4>
          <p className="text-xs text-gray-500">{appointment.service}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Good morning! 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monday, September 8, 2025
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            View Calendar
          </button>
          <button className="px-4 py-2 text-sm bg-lime-500 text-white rounded-md hover:bg-lime-600 transition-colors flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Appointments */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today&apos;s Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              24
            </div>
            <p className="text-xs text-gray-500 mt-1">+5% from yesterday</p>
          </CardContent>
        </Card>

        {/* Today's Revenue */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Today&apos;s Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              $2,840
            </div>
            <p className="text-xs text-gray-500 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        {/* Client Visits */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Client Visits
            </CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              18
            </div>
            <p className="text-xs text-gray-500 mt-1">+8% from yesterday</p>
          </CardContent>
        </Card>

        {/* Staff Utilization */}
        <Card className="hover:shadow-sm transition-shadow bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Staff Utilization
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              87%
            </div>
            <p className="text-xs text-gray-500 mt-1">+3% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments Section */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Today&apos;s Appointments
              </CardTitle>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Appointments
              </button>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Desktop/Tablet View: Table-like layout */}
              <div className="hidden sm:block space-y-3">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900 w-12">
                        {appointment.time}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {appointment.client}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.service}
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={appointment.statusColor}
                      variant="secondary"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Mobile View: Card layout */}
              <div className="block sm:hidden space-y-3">
                {todayAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <div>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-orange-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-0">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="mt-0.5">{notification.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 leading-5 font-medium">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* View All Notifications Button at Bottom */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full p-3 text-center text-sm text-black hover:bg-gray-50 font-medium transition-colors rounded-lg border border-gray-100 hover:border-gray-200">
                  View All Notifications
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
