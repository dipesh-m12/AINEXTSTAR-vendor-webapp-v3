/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Calendar, ChevronDown } from "lucide-react";

interface BillItem {
  name: string;
  price: number;
  qty: number;
  amount: number;
}

interface ExtraItem {
  name: string;
  amount: number;
}

export default function QuickSalePage() {
  const [customerInfo, setCustomerInfo] = useState("");
  const [serviceDate, setServiceDate] = useState("12 sept 2025");
  // const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [billItems, _] = useState<BillItem[]>([
    { name: "Haircut", price: 1200, qty: 1, amount: 1200 },
    { name: "Nail Art", price: 600, qty: 2, amount: 1200 },
    { name: "Makeup", price: 1600, qty: 2, amount: 3200 },
    { name: "Shampoo", price: 1200, qty: 1, amount: 1200 },
  ]);
  const [extraItems, setExtraItems] = useState<ExtraItem[]>([
    { name: "Membership Renew", amount: 1200 },
    { name: "Tip", amount: 200 },
  ]);

  const services = [
    { id: 1, name: "Hair Cut", price: 400, subtitle: "Layers cut" },
    { id: 2, name: "Hair Cut", price: 400, subtitle: "Layers cut" },
    { id: 3, name: "Hair Cut", price: 400, subtitle: "Layers cut" },
    { id: 4, name: "Hair Cut", price: 400, subtitle: "Layers cut" },
    { id: 5, name: "Hair Cut", price: 400, subtitle: "Layers cut" },
    { id: 6, name: "Hair Cut", price: 400, subtitle: "Layers cut" },
  ];

  const itemsTotal = billItems.reduce((sum, item) => sum + item.amount, 0);
  const extraItemsTotal = extraItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalAmount = itemsTotal + extraItemsTotal;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Quick Sale</h1>

      <div className="grid grid-cols-[1fr_380px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Customer Information Card */}
          <Card className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Customer Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Customer Info */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Customer Info*
                </Label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 h-full px-3 bg-[#F9FFEE] border border-r-0 border-gray-300 flex items-center rounded-l-md z-10">
                    <span className="text-sm text-gray-700 font-medium">
                      +91
                    </span>
                  </div>
                  <Input
                    placeholder="Search by name/number"
                    className="pl-14 pr-10 h-10 border-gray-300 rounded-md"
                    value={customerInfo}
                    onChange={(e) => setCustomerInfo(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              {/* Service Date */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Service Date*
                </Label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="pr-12 h-10 border-gray-300 rounded-l-md border-r-0 rounded-r-none"
                  />
                  <div className="h-10 w-12 bg-[#F9FFEE] border border-l-0 border-gray-300 flex items-center justify-center rounded-r-md">
                    <Calendar className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                New Customer
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Already a member
              </button>
              <Button className="bg-[#CCF656] hover:bg-[#b8e049] text-gray-900 font-medium">
                <Plus className="h-4 w-4 mr-2" />
                Add New Member
              </Button>
            </div>
          </Card>

          {/* Services & Products Information Card */}
          <Card className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Services & Products Information
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by services & products"
                className="pl-10 h-10 border-gray-300"
              />
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-xs text-gray-900 font-semibold mt-0.5">
                        Rs.{service.price}
                      </p>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-[#CCF656] flex items-center justify-center hover:bg-[#b8e049] transition-colors flex-shrink-0">
                      <Plus className="h-4 w-4 text-gray-900" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">{service.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Staff, Quantity, Price Row */}
            <div className="grid grid-cols-[1fr_140px_1fr] gap-4 mb-6">
              {/* Staff */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Staff*
                </Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="h-10 border-gray-300 rounded-l-md border-r-0 rounded-r-none [&>svg]:hidden w-full">
                      <SelectValue placeholder="Select the staff name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah</SelectItem>
                      <SelectItem value="david">David</SelectItem>
                      <SelectItem value="emma">Emma</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-300 flex items-center justify-center rounded-r-md pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Quantity
                </Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="h-10 border-gray-300 rounded-l-md border-r-0 rounded-r-none [&>svg]:hidden w-full">
                      <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-300 flex items-center justify-center rounded-r-md pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Price(Rs)
                </Label>
                <Input
                  placeholder="Enter Amount"
                  className="h-10 border-gray-300"
                />
              </div>
            </div>
          </Card>

          {/* Discounts & Others Card */}
          <Card className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Discounts & Others
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {/* Discount type */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Discount type
                </Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="h-10 border-gray-300 rounded-l-md border-r-0 rounded-r-none [&>svg]:hidden w-full">
                      <SelectValue placeholder="Select (by % or value)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-300 flex items-center justify-center rounded-r-md pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Discount */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Discount
                </Label>
                <Input
                  placeholder="Enter discount"
                  className="h-10 border-gray-300"
                />
              </div>

              {/* Redeem Gift Voucher */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Redeem Gift Voucher
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter the promo/code"
                    className="pr-12 h-10 border-gray-300 rounded-l-md border-r-0 rounded-r-none"
                  />
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-300 flex items-center justify-center rounded-r-md pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Details Card */}
          <Card className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Payment Details
              </h2>
              <p className="text-sm font-medium text-gray-900">
                Total Amount: Rs {totalAmount.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-4">
              {/* Mode of Payment */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Mode of Payment
                </Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="h-10 border-gray-300 rounded-l-md border-r-0 rounded-r-none [&>svg]:hidden w-full">
                      <SelectValue placeholder="Select the payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-300 flex items-center justify-center rounded-r-md pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Payment Amount */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Payment Amount
                </Label>
                <Input
                  placeholder="Enter the amount"
                  className="h-10 border-gray-300"
                />
              </div>

              {/* Add Button */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700 opacity-0">
                  Action
                </Label>
                <Button className="bg-[#CCF656] hover:bg-[#b8e049] text-gray-900 font-medium h-10">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Tip Amount */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Tip Amount
                </Label>
                <Input
                  placeholder="Enter the amount"
                  className="h-10 border-gray-300"
                />
              </div>

              {/* Mode of Payment */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-700">
                  Mode of Payment
                </Label>
                <div className="relative">
                  <Select>
                    <SelectTrigger className="h-10 border-gray-300 rounded-l-md border-r-0 rounded-r-none [&>svg]:hidden w-full">
                      <SelectValue placeholder="Select the payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="absolute right-0 top-0 h-full w-12 bg-[#F9FFEE] border border-l-0 border-gray-300 flex items-center justify-center rounded-r-md pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Bill Information */}
        <Card className="bg-white border border-gray-200 rounded-lg p-6 h-fit sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900">
              Bill Information
            </h2>
            <p className="text-sm font-semibold text-[#E91E63]">
              Bill No.: XXXXXXX
            </p>
          </div>

          {/* Bill Items Table */}
          <div className="mb-6">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 pb-2 border-b border-gray-200 mb-3">
              <p className="text-xs font-medium text-gray-700">Item</p>
              <p className="text-xs font-medium text-gray-700 text-right">
                Price
              </p>
              <p className="text-xs font-medium text-gray-700 text-center">
                Qty
              </p>
              <p className="text-xs font-medium text-gray-700 text-right">
                Amount
              </p>
            </div>

            {/* Bill Items */}
            <div className="space-y-2.5">
              {billItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3"
                >
                  <p className="text-sm text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-700 text-right">
                    {item.price}
                  </p>
                  <p className="text-sm text-gray-700 text-center">
                    {item.qty}
                  </p>
                  <p className="text-sm text-gray-700 text-right">
                    {item.amount}
                  </p>
                </div>
              ))}
            </div>

            {/* Items Total */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700">Items Total</p>
              <p className="text-sm font-semibold text-gray-900">
                Rs. {itemsTotal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Extra Items */}
          <div className="mb-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Extra Items
              </h3>
              <p className="text-xs font-medium text-gray-700">Amount</p>
            </div>

            <div className="space-y-2.5">
              {extraItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-700">{item.amount}</p>
                </div>
              ))}
            </div>

            {/* Extra Items Total */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700">
                Extra Items Total
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Rs. {extraItemsTotal.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="pt-4 border-t-2 border-gray-300">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-gray-900">
                Total Amount
              </p>
              <p className="text-lg font-bold text-gray-900">
                Rs. {totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
