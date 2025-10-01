/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { useState, useEffect } from "react";
import axios from "axios";

// TypeScript interfaces
interface Service {
  service_id: string;
  name: string;
  price: string;
  duration_minutes: number;
}

interface BranchAppointment {
  appointment_id: string;
  customer_id: string;
  staff_id: string;
  start_time: string;
  end_time: string;
  status: string;
  payments: any[];
}

interface BranchApiResponse {
  results: {
    branch_id: string;
    appointments: BranchAppointment[];
    totalRevenue: number;
    clientVisits: number;
    utilization: number;
  };
}

interface CustomerService {
  service_id: string;
  name: string;
  price: string;
  duration_minutes: number;
}

interface CustomerAppointment {
  appointment_id: string;
  customer_id: string;
  start_time: string;
  end_time: string;
  status: string;
  services: CustomerService[];
}

interface CustomerApiResponse {
  results: {
    customer_id: string;
    first_name: string;
    last_name: string;
    appointments: CustomerAppointment[];
  };
}

// Map to store customer data for quick lookup
interface CustomerDataMap {
  [customerId: string]: {
    name: string;
    appointments: {
      [appointmentId: string]: {
        services: string[]; // Array of service names
      };
    };
  };
}

interface KPIMetrics {
  totalAppointments: number;
  totalRevenue: number;
  clientVisits: number;
  staffUtilization: number;
  appointmentChange: string;
  revenueChange: string;
  clientsChange: string;
  utilizationChange: string;
}

interface Appointment {
  id: string;
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
  // State management for API data and KPIs
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetrics>({
    totalAppointments: 0,
    totalRevenue: 0,
    clientVisits: 0,
    staffUtilization: 0,
    appointmentChange: "+0%",
    revenueChange: "+0%",
    clientsChange: "+0%",
    utilizationChange: "+0%",
  });

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to calculate KPI metrics from API response
  const calculateKPIMetrics = (
    todayData: BranchApiResponse,
    yesterdayData: BranchApiResponse
  ): KPIMetrics => {
    const today = todayData.results;
    const yesterday = yesterdayData.results;

    // 1. Total Appointments
    const totalAppointments = today.appointments.length;
    const yesterdayTotalAppointments = yesterday.appointments.length;

    // 2. Total Revenue (directly from API)
    const totalRevenue = today.totalRevenue;
    const yesterdayRevenue = yesterday.totalRevenue;

    // 3. Client Visits (directly from API - completed appointments)
    const clientVisits = today.clientVisits;
    const yesterdayClientVisits = yesterday.clientVisits;

    // 4. Staff Utilization (directly from API)
    const staffUtilization = Math.round(today.utilization);
    const yesterdayStaffUtilization = Math.round(yesterday.utilization);

    // Calculate percentage changes
    const calculateChange = (today: number, yesterday: number): string => {
      if (yesterday === 0) return "+0%";
      const change = ((today - yesterday) / yesterday) * 100;
      const sign = change >= 0 ? "+" : "";
      return `${sign}${Math.round(change)}%`;
    };

    return {
      totalAppointments,
      totalRevenue,
      clientVisits,
      staffUtilization,
      appointmentChange: calculateChange(
        totalAppointments,
        yesterdayTotalAppointments
      ),
      revenueChange: calculateChange(totalRevenue, yesterdayRevenue),
      clientsChange: calculateChange(clientVisits, yesterdayClientVisits),
      utilizationChange: calculateChange(
        staffUtilization,
        yesterdayStaffUtilization
      ),
    };
  };

  // NEW: Function to fetch customer data for all unique customer IDs
  const fetchCustomerData = async (
    customerIds: string[]
  ): Promise<CustomerDataMap> => {
    console.group("👤 fetchCustomerData - START");
    console.log("Customer IDs to fetch:", customerIds);

    const customerMap: CustomerDataMap = {};

    try {
      // Fetch all customer data in parallel
      const customerPromises = customerIds.map((customerId) => {
        const customerUrl = `https://rizzerv.kloudwizards.com/gateway/search/customers/${customerId}`;
        console.log(`📡 Fetching customer from: ${customerUrl}`);
        return axios.post(customerUrl, {});
      });

      console.log(
        `🔄 Fetching ${customerPromises.length} customer(s) in parallel...`
      );
      const customerResponses = await Promise.all(customerPromises);

      // Build the customer map
      customerResponses.forEach((response) => {
        const customerData: CustomerApiResponse = response.data;
        const customer = customerData.results;

        console.log(
          `📋 Processing customer: ${customer.first_name} ${customer.last_name}`
        );

        // Build appointments map for this customer
        const appointmentsMap: { [key: string]: { services: string[] } } = {};

        customer.appointments.forEach((apt) => {
          const serviceNames = apt.services.map((s) => s.name);
          appointmentsMap[apt.appointment_id] = {
            services: serviceNames,
          };

          console.log(
            `  📝 Mapped appointment ${apt.appointment_id}:`,
            serviceNames
          );
        });

        // Add to customer map
        customerMap[customer.customer_id] = {
          name: `${customer.first_name} ${customer.last_name}`,
          appointments: appointmentsMap,
        };
      });

      console.log("✅ Customer map built successfully:", customerMap);
      console.groupEnd();
      return customerMap;
    } catch (err: any) {
      console.error("❌ Error fetching customer data:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
        console.error("Request URL:", err.config?.url);
      }
      console.groupEnd();
      return customerMap;
    }
  };

  // UPDATED: Function to format appointment data with customer names and services
  const formatAppointmentsForDisplay = (
    appointments: BranchAppointment[],
    customerMap: CustomerDataMap
  ): Appointment[] => {
    console.group("🎨 formatAppointmentsForDisplay");

    const formatted = appointments.map((apt) => {
      const startTime = new Date(apt.start_time);
      const hours = startTime.getHours().toString().padStart(2, "0");
      const minutes = startTime.getMinutes().toString().padStart(2, "0");

      let statusColor = "bg-gray-100 text-gray-800";
      let displayStatus: "completed" | "in progress" | "upcoming" = "upcoming";

      if (apt.status.toLowerCase() === "completed") {
        statusColor = "bg-green-100 text-green-800";
        displayStatus = "completed";
      } else if (apt.status.toLowerCase() === "in progress") {
        statusColor = "bg-blue-100 text-blue-800";
        displayStatus = "in progress";
      }

      // Get customer name from map
      const customerName =
        customerMap[apt.customer_id]?.name || apt.customer_id;

      // Get services from map
      const services =
        customerMap[apt.customer_id]?.appointments[apt.appointment_id]
          ?.services || [];
      const serviceString =
        services.length > 0 ? services.join(" + ") : apt.appointment_id;

      console.log(`📌 Appointment ${apt.appointment_id}:`, {
        time: `${hours}:${minutes}`,
        customer: customerName,
        services: serviceString,
        status: displayStatus,
      });

      return {
        id: apt.appointment_id,
        time: `${hours}:${minutes}`,
        client: customerName,
        service: serviceString,
        status: displayStatus,
        statusColor,
      };
    });

    console.log("✅ Formatted appointments:", formatted);
    console.groupEnd();
    return formatted;
  };

  // UPDATED: Function to fetch appointments data from API
  const fetchAppointmentsData = async () => {
    console.group("🚀 fetchAppointmentsData - START");
    console.log("Function called at:", new Date().toISOString());

    try {
      setLoading(true);
      setError(null);

      // Date ranges: Today: 29-30, Yesterday: 28-29
      const todayStart = "2025-09-30";
      const todayEnd = "2025-10-01";
      const yesterdayStart = "2025-09-29";
      const yesterdayEnd = "2025-09-30";

      const baseUrl =
        "https://rizzerv.kloudwizards.com/gateway/search/salons/65426f3f-5784-48a1-9275-55c21039b80a/branches/eabc2278-e3ae-4606-877b-0d3830e2fb81";

      console.group("📋 Request Configuration");
      console.log("Today range:", todayStart, "to", todayEnd);
      console.log("Yesterday range:", yesterdayStart, "to", yesterdayEnd);
      console.log("Base URL:", baseUrl);
      console.groupEnd();

      // Fetch today's data
      console.log("📡 Making TODAY API call...");
      const todayResponse = await axios.post(
        `${baseUrl}?start=${todayStart}&end=${todayEnd}`,
        {}
      );
      console.log("✅ Today API Response received:", todayResponse.data);

      // Fetch yesterday's data
      console.log("📡 Making YESTERDAY API call...");
      const yesterdayResponse = await axios.post(
        `${baseUrl}?start=${yesterdayStart}&end=${yesterdayEnd}`,
        {}
      );
      console.log(
        "✅ Yesterday API Response received:",
        yesterdayResponse.data
      );

      // Calculate metrics
      console.group("🧮 Processing KPI Metrics");
      console.log(
        "Today appointments count:",
        todayResponse.data.results.appointments?.length
      );
      console.log(
        "Yesterday appointments count:",
        yesterdayResponse.data.results.appointments?.length
      );
      console.log("Today revenue:", todayResponse.data.results.totalRevenue);
      console.log(
        "Today client visits:",
        todayResponse.data.results.clientVisits
      );
      console.log("Today utilization:", todayResponse.data.results.utilization);

      const metrics = calculateKPIMetrics(
        todayResponse.data,
        yesterdayResponse.data
      );
      console.log("📊 Calculated metrics:", metrics);
      console.groupEnd();

      setKpiMetrics(metrics);

      // NEW: Extract unique customer IDs from today's appointments
      const todayAppointmentsData =
        todayResponse.data.results.appointments || [];
      const uniqueCustomerIds = [
        ...new Set(
          todayAppointmentsData.map((apt: BranchAppointment) => apt.customer_id)
        ),
      ] as string[];

      console.log("👥 Unique customer IDs:", uniqueCustomerIds);

      // NEW: Fetch customer data for all unique customers
      const customerMap = await fetchCustomerData(uniqueCustomerIds);

      // UPDATED: Format appointments with customer names and services
      const formattedAppointments = formatAppointmentsForDisplay(
        todayAppointmentsData,
        customerMap
      );

      setTodayAppointments(formattedAppointments);
      console.log("✅ State updated successfully");
    } catch (err: any) {
      console.group("❌ ERROR in fetchAppointmentsData");
      console.error("Error message:", err.message);
      console.error("Error code:", err.code);

      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
      console.groupEnd();

      setError("Failed to fetch appointments data. Check console for details.");

      // Fallback data
      const fallbackMetrics = {
        totalAppointments: 50,
        totalRevenue: 0,
        clientVisits: 50,
        staffUtilization: 0,
        appointmentChange: "+0%",
        revenueChange: "+0%",
        clientsChange: "+0%",
        utilizationChange: "+0%",
      };

      console.log("📋 Using fallback metrics:", fallbackMetrics);
      setKpiMetrics(fallbackMetrics);
    } finally {
      setLoading(false);
      console.log("🏁 fetchAppointmentsData - END");
      console.groupEnd();
    }
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchAppointmentsData();
  }, []);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {(() => {
              const hour = new Date().getHours();
              if (hour >= 5 && hour < 12) return "Good morning! 👋";
              if (hour >= 12 && hour < 17) return "Good afternoon! ☀️";
              if (hour >= 17 && hour < 22) return "Good evening! 🌆";
              return "Good night! 🌙";
            })()}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monday, September 29, 2025
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

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Stats Cards - Now using dynamic data from API */}
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
              {loading ? "..." : kpiMetrics.totalAppointments}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {kpiMetrics.appointmentChange} from yesterday
            </p>
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
              {loading ? "..." : `$${kpiMetrics.totalRevenue.toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {kpiMetrics.revenueChange} from yesterday
            </p>
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
              {loading ? "..." : kpiMetrics.clientVisits}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {kpiMetrics.clientsChange} from yesterday
            </p>
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
              {loading ? "..." : `${kpiMetrics.staffUtilization}%`}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {kpiMetrics.utilizationChange} from yesterday
            </p>
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
              {loading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading appointments...
                </div>
              ) : todayAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No appointments for today
                </div>
              ) : (
                <>
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
                </>
              )}
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
