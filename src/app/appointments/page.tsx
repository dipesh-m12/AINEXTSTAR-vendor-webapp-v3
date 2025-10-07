"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, Search, Wand2, Clock } from "lucide-react";

const staffMembers = ["Sarah", "David", "Emma", "Michael"];
const services = [
  "Hair Cut & Styling",
  "Hair Color",
  "Manicure & Nail Art",
  "Facial Treatment",
  "Massage Therapy",
];

const timeSlots = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const mockAppointments = [
  {
    time: "10:00",
    staff1: "Hair Cut - Emma Wilson",
    staff2: "Facial - Lisa Chen",
  },
  { time: "11:00", staff1: "", staff2: "Massage - Mike Johnson" },
  {
    time: "14:00",
    staff1: "Hair Color - Sarah Johnson",
    staff2: "Manicure - Tom Martinez",
  },
];

export default function AppointmentsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("12 April 2025");
  const [customerType, setCustomerType] = useState("new");
  const [formData, setFormData] = useState({
    customerName: "",
    serviceDate: "12 April 2025",
    service: "",
    staffMember: "",
    startTime: "",
    endTime: "",
    notes: "",
  });

  const statusConfig = [
    { label: "Confirmed", color: "bg-[#CCF656]" },
    { label: "In Progress", color: "bg-emerald-500" },
    { label: "Pending", color: "bg-gray-400" },
    { label: "Cancelled", color: "bg-red-500" },
    { label: "No show", color: "bg-yellow-500" },
    { label: "Walk In", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
      </div>

      {/* Header Controls */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="flex items-end gap-4">
          {/* Staff Filter */}
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-gray-600">Staff*</Label>
            <div className="relative">
              <Select defaultValue="all">
                <SelectTrigger className="w-48 min-h-[2.6rem] bg-white pr-12 border-r-0 rounded-r-none [&>svg]:hidden">
                  <SelectValue placeholder="Select the staff name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Staff</SelectItem>
                  {staffMembers.map((staff) => (
                    <SelectItem key={staff} value={staff.toLowerCase()}>
                      {staff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-200 flex items-center justify-center rounded-r-md pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-gray-600">Date*</Label>
            <div className="relative">
              <Input
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48 h-10 bg-white pr-10 border-r-0 rounded-r-none"
              />
              <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-200 flex items-center justify-center rounded-r-md pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-600" />
              </div>{" "}
            </div>
          </div>
        </div>

        <div className="flex items-end gap-3">
          {/* Range Selector */}
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-gray-600">Range</Label>
            <div className="relative">
              <Select defaultValue="day">
                <SelectTrigger className="w-32 h-10 bg-white pr-12 border-r-0 rounded-r-none [&>svg]:hidden">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
              <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-200 flex items-center justify-center rounded-r-md pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex flex-col gap-1">
            <Label className="text-xs text-gray-600">Appointment View</Label>
            <div className="relative">
              <Select defaultValue="calendar">
                <SelectTrigger className="w-36 h-10 bg-white pr-12 border-r-0 rounded-r-none [&>svg]:hidden">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar">Calendar</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
              <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-200 flex items-center justify-center rounded-r-md pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Add Button */}
          <Button
            onClick={() => setIsSheetOpen(true)}
            className="bg-[#CCF656] hover:bg-[#b8e049] text-gray-900 font-medium h-10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Appointment
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Calendar View */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            {/* Header with Select Date */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Today&apos;s Appointments
              </h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Select Date
              </Button>
            </div>

            {/* Status Legend */}
            <div className="mb-6 flex flex-wrap gap-3">
              {statusConfig.map((status) => (
                <Badge
                  key={status.label}
                  variant="outline"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border-gray-200"
                >
                  <div className={`w-3 h-3 rounded-full ${status.color}`} />
                  <span className="text-sm text-gray-700 font-normal">
                    {status.label}
                  </span>
                </Badge>
              ))}
            </div>

            {/* Schedule Table */}
            <div className="border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[100px_1fr_1fr] bg-gray-50 border-b">
                <div className="px-4 py-3 text-sm font-medium text-gray-700">
                  Time
                </div>
                <div className="px-4 py-3 text-sm font-medium text-gray-700 border-l">
                  Staff Name
                </div>
                <div className="px-4 py-3 text-sm font-medium text-gray-700 border-l">
                  Staff Name
                </div>
              </div>

              {/* Time Slots */}
              {timeSlots.map((time) => {
                const appointment = mockAppointments.find(
                  (a) => a.time === time
                );
                return (
                  <div
                    key={time}
                    className="grid grid-cols-[100px_1fr_1fr] border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <div className="px-4 py-8 text-sm text-gray-600 border-r">
                      {time}
                    </div>
                    <div className="px-4 py-8 text-sm text-gray-400 border-r">
                      {appointment?.staff1 || "Staff Name"}
                    </div>
                    <div className="px-4 py-8 text-sm text-gray-400">
                      {appointment?.staff2 || "Staff Name"}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card className="bg-white border shadow-sm p-3">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Quick Actions
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600"
                >
                  Select Date
                </Button>
              </div>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-pink-600 border-pink-200 hover:bg-pink-50"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Walk In appointment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Block Time Slot
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border shadow-sm p-3">
            <CardContent className="p-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Today&apos;s Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Appointments</span>
                  <span className="font-semibold text-gray-900">6</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Confirmed</span>
                  <span className="font-semibold text-gray-900">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-semibold text-gray-900">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-gray-900">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Appointment Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[480px] sm:max-w-[480px] p-0">
          <div className="h-full flex flex-col">
            <SheetHeader className="px-6 py-5 border-b">
              <SheetTitle className="text-base font-semibold text-gray-900 flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Add New Appointments
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {/* Customer Info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Customer Info*
                </Label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 h-full px-3 bg-[#F9FFEE] border-r flex items-center rounded-l-md z-10">
                    <span className="text-sm text-gray-600 font-medium">
                      +91
                    </span>
                  </div>
                  <Input
                    placeholder="Search by name/number"
                    className="pl-16 pr-10 h-11"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Service Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Service Date*
                </Label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 h-full w-12 bg-[#F9FFEE] border-r flex items-center justify-center rounded-l-md">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <Input
                    type="text"
                    value={formData.serviceDate}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceDate: e.target.value })
                    }
                    className="pl-14 h-11"
                    placeholder="12 sept 2025"
                  />
                </div>
              </div>

              {/* Customer Type */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`relative flex items-center h-11 pl-4 pr-4 rounded-lg border-2 cursor-pointer transition-all ${
                      customerType === "new"
                        ? "border-[#CCF656] bg-white"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => setCustomerType("new")}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center mr-3 ${
                        customerType === "new"
                          ? "border-[#CCF656] bg-[#CCF656]"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {customerType === "new" && (
                        <svg
                          className="w-3 h-3 text-gray-900"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      New Customer
                    </span>
                  </label>
                  <label
                    className={`relative flex items-center h-11 pl-4 pr-4 rounded-lg border-2 cursor-pointer transition-all ${
                      customerType === "member"
                        ? "border-[#CCF656] bg-white"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    onClick={() => setCustomerType("member")}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center mr-3 ${
                        customerType === "member"
                          ? "border-[#CCF656] bg-[#CCF656]"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {customerType === "member" && (
                        <svg
                          className="w-3 h-3 text-gray-900"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Already a member
                    </span>
                  </label>
                </div>
              </div>

              {/* Add New Member Button */}
              {customerType === "new" && (
                <Button
                  type="button"
                  className="bg-[#CCF656] hover:bg-[#b8e049] text-gray-900 font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Member
                </Button>
              )}

              {/* Service */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Service*
                </Label>
                <div className="relative">
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                  >
                    <SelectTrigger className="h-11 pr-12 border-r-0 rounded-r-none [&>svg]:hidden w-full">
                      <SelectValue placeholder="Select/Search a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-200 flex items-center justify-center rounded-r-md pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Staff Member */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Staff Member*
                </Label>
                <div className="relative">
                  <Select
                    value={formData.staffMember}
                    onValueChange={(value) =>
                      setFormData({ ...formData, staffMember: value })
                    }
                  >
                    <SelectTrigger className="h-11 pr-12 [&>span]:hidden border-r-0 rounded-r-none [&>svg]:hidden w-full">
                      <SelectValue placeholder="Select a staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff} value={staff}>
                          {staff}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 flex items-center justify-center rounded-r-lg pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4 gap-x-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Start Time*
                  </Label>
                  <div className="relative">
                    <Select
                      value={formData.startTime}
                      onValueChange={(value) =>
                        setFormData({ ...formData, startTime: value })
                      }
                    >
                      <SelectTrigger className="h-11 pr-12 [&>span]:hidden border-r-0 rounded-r-none w-full [&>svg]:hidden">
                        <SelectValue placeholder="Select a staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 flex items-center justify-center rounded-r-lg pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    End Time
                  </Label>
                  <div className="relative">
                    <Select
                      value={formData.endTime}
                      onValueChange={(value) =>
                        setFormData({ ...formData, endTime: value })
                      }
                    >
                      <SelectTrigger className="h-11 pr-12 [&>span]:hidden border-r-0 rounded-r-none w-full [&>svg]:hidden">
                        <SelectValue placeholder="Select a staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 flex items-center justify-center rounded-r-lg pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  placeholder="Enter any preference or any notes needed!"
                  className="min-h-[80px] resize-none text-sm"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t px-6 py-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11"
                onClick={() => setIsSheetOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-11 bg-[#CCF656] hover:bg-[#b8e049] text-gray-900 font-medium"
                onClick={() => {
                  setIsSheetOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
