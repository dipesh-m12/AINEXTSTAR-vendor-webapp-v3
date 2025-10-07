"use client";

import { useState } from "react";
import { Search, Bell, MessageSquare, User, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function TopBar() {
  const { toggleSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    staff: "",
    startTime: "",
    endTime: "",
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    setFormData({
      name: "",
      service: "",
      staff: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <>
      <header className="flex-shrink-0 bg-white border-b border-gray-200 p-6 pb-3">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                Good Morning!
              </h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">
                {currentDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex items-center relative">
              <Input
                type="text"
                placeholder="Search here..."
                className="pr-10 w-64 bg-gray-50 border-gray-200 focus-visible:ring-lime-100"
              />
              <Search className="absolute right-3 h-4 w-4 text-gray-400" />
            </div>

            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Button
              size="icon"
              className="bg-[#F230AA] hover:bg-[#F230AA]/90 text-white rounded-4xl"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-[#CCF656] hover:bg-[#CCF656]/90 text-black font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </Button>

            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Support Chat</span>
            </Button>

            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Add New Staff
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill in the staff member details and working hours
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Staff Name
              </Label>
              <Input
                id="name"
                placeholder="Enter staff name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-50 border-gray-200 focus-visible:ring-lime-100"
              />
            </div>

            {/* Role Dropdown */}
            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-medium text-gray-700"
              >
                Role
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
              >
                <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:ring-lime-100">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                  <SelectItem value="Colorist">Colorist</SelectItem>
                  <SelectItem value="Nail Technician">
                    Nail Technician
                  </SelectItem>
                  <SelectItem value="Esthetician">Esthetician</SelectItem>
                  <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
                  <SelectItem value="Spa Therapist">Spa Therapist</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Working Duration
              </Label>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <Select
                  value={formData.startTime}
                  onValueChange={(value) =>
                    setFormData({ ...formData, startTime: value })
                  }
                >
                  <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:ring-lime-100">
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:00 AM">12:00 AM</SelectItem>
                    <SelectItem value="01:00 AM">01:00 AM</SelectItem>
                    <SelectItem value="02:00 AM">02:00 AM</SelectItem>
                    <SelectItem value="03:00 AM">03:00 AM</SelectItem>
                    <SelectItem value="04:00 AM">04:00 AM</SelectItem>
                    <SelectItem value="05:00 AM">05:00 AM</SelectItem>
                    <SelectItem value="06:00 AM">06:00 AM</SelectItem>
                    <SelectItem value="07:00 AM">07:00 AM</SelectItem>
                    <SelectItem value="08:00 AM">08:00 AM</SelectItem>
                    <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                    <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                    <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                    <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                    <SelectItem value="06:00 PM">06:00 PM</SelectItem>
                    <SelectItem value="07:00 PM">07:00 PM</SelectItem>
                    <SelectItem value="08:00 PM">08:00 PM</SelectItem>
                    <SelectItem value="09:00 PM">09:00 PM</SelectItem>
                    <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                    <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-gray-500 font-medium">to</span>

                <Select
                  value={formData.endTime}
                  onValueChange={(value) =>
                    setFormData({ ...formData, endTime: value })
                  }
                >
                  <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:ring-lime-100">
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12:00 AM">12:00 AM</SelectItem>
                    <SelectItem value="01:00 AM">01:00 AM</SelectItem>
                    <SelectItem value="02:00 AM">02:00 AM</SelectItem>
                    <SelectItem value="03:00 AM">03:00 AM</SelectItem>
                    <SelectItem value="04:00 AM">04:00 AM</SelectItem>
                    <SelectItem value="05:00 AM">05:00 AM</SelectItem>
                    <SelectItem value="06:00 AM">06:00 AM</SelectItem>
                    <SelectItem value="07:00 AM">07:00 AM</SelectItem>
                    <SelectItem value="08:00 AM">08:00 AM</SelectItem>
                    <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                    <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                    <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                    <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                    <SelectItem value="06:00 PM">06:00 PM</SelectItem>
                    <SelectItem value="07:00 PM">07:00 PM</SelectItem>
                    <SelectItem value="08:00 PM">08:00 PM</SelectItem>
                    <SelectItem value="09:00 PM">09:00 PM</SelectItem>
                    <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                    <SelectItem value="11:00 PM">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 sm:flex-none bg-[#CCF656] hover:bg-[#CCF656]/90 text-black font-medium"
            >
              Add Staff Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
