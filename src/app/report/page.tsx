"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  DollarSign,
  Edit,
  Eye,
  Search,
  Star,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Theme constants to keep the look exact to your spec
const LIME = "#CCF656"; // primary accent for chips/buttons
const KPI_BG = "#F9FFEE"; // KPI card background
const BORDER = "rgba(0,0,0,0.08)";

type TopTab = "sales" | "services" | "staff" | "clients";
type ClientTab = "all" | "membership" | "new";

// Reusable: rounded chip-style nav
function NavChip({
  active,
  children,
  icon: Icon,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-9 p-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
      style={{
        backgroundColor: active ? LIME : "white",
        border: `1px solid ${active ? "transparent" : BORDER}`,
        color: "#111827",
      }}
    >
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );
}

// Reusable: KPI card with internal icon chip on the left
function KpiCard({
  icon,
  label,
  value,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sublabel?: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: KPI_BG, border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-start gap-3">
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: LIME, color: "#111827" }}
          aria-hidden
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-700 mb-5">{label}</div>
          <div className="text-4xl font-bold text-gray-900">{value}</div>
          {sublabel ? (
            <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Reusable: Input with a right chip (search/chevron/etc.)
function RightChipField({
  label,
  placeholder,
  icon = <ChevronDown size={16} />,
  type = "text",
}: {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  type?: "text" | "search";
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        className="flex items-center rounded-lg h-11 overflow-hidden"
        style={{ border: `1px solid ${BORDER}`, backgroundColor: "#FFFFFF" }}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 h-full px-3 text-sm outline-none"
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <div
          className="h-11 w-11 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#F9FFEE" }}
          aria-hidden
        >
          <div className="text-gray-900">{icon}</div>
        </div>
      </div>
    </div>
  );
}

// Reusable: subtle card shell
function CardShell({
  title,
  rightAction,
  children,
}: {
  title: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl p-5"
      style={{ border: `1px solid ${BORDER}`, backgroundColor: "white" }}
    >
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900 font-semibold">{title}</h3>
        {rightAction}
      </header>
      {children}
    </section>
  );
}

// Demo datasets
const monthlyRevenue = [
  { m: "Jan", v: 12000 },
  { m: "Feb", v: 15000 },
  { m: "Mar", v: 18000 },
  { m: "Apr", v: 14000 },
  { m: "May", v: 20000 },
  { m: "Jun", v: 24000 },
];

// const visitsTrend = [
//   { m: "Jan", visits: 460, members: 20 },
//   { m: "Feb", visits: 430, members: 24 },
//   { m: "Mar", visits: 520, members: 26 },
//   { m: "Apr", visits: 560, members: 28 },
//   { m: "May", visits: 540, members: 30 },
//   { m: "Jun", visits: 600, members: 35 },
// ];

const clientRows = [
  [
    "CUST001",
    "Emma Wilson",
    "Membership",
    "5",
    "$220",
    "$1,100",
    "12 Sep 2025",
  ],
  ["CUST002", "Mike Johnson", "New", "1", "$150", "$150", "10 Sep 2025"],
  ["CUST003", "Lisa Chen", "Regular", "3", "$180", "$540", "09 Sep 2025"],
  [
    "CUST004",
    "Rachel Green",
    "Membership",
    "6",
    "$210",
    "$1,260",
    "18 Sep 2025",
  ],
];

export default function ReportsPage() {
  const [tab, setTab] = React.useState<TopTab>("sales");
  const [clientTab, setClientTab] = React.useState<ClientTab>("all");

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Reports & Analytics
      </h1>

      {/* Top chip nav */}
      <div className="mt-4 flex gap-2 flex-wrap">
        <NavChip
          active={tab === "sales"}
          onClick={() => setTab("sales")}
          icon={Users}
        >
          Sales
        </NavChip>
        <NavChip
          active={tab === "services"}
          onClick={() => setTab("services")}
          icon={Wrench}
        >
          Services
        </NavChip>
        <NavChip
          active={tab === "staff"}
          onClick={() => setTab("staff")}
          icon={UserCheck}
        >
          Staff
        </NavChip>
        <NavChip
          active={tab === "clients"}
          onClick={() => setTab("clients")}
          icon={Building2}
        >
          Clients
        </NavChip>
      </div>

      {/* Filters with right chips */}
      <section className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-3">
        <RightChipField
          label="Report Type"
          placeholder="Select the report type"
        />
        <RightChipField label="Service Range*" placeholder="Select the date" />
        <RightChipField label="Customer" placeholder="Select the gender" />
        <RightChipField
          label="Invoice no."
          placeholder="Search by invoice no."
          icon={<Search size={16} />}
          type="search"
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 opacity-0">
            Action
          </label>
          <button
            className="h-11 rounded-lg font-medium"
            style={{
              backgroundColor: LIME,
              color: "#111827",
              border: `1px solid ${LIME}`,
            }}
            aria-label="View"
          >
            View
          </button>
        </div>
      </section>

      {/* Report period note */}
      <p className="mt-5 text-sm font-semibold text-gray-600">
        Report generated from 12 Sep 2025 on 13 Sep 2025
      </p>

      {/* KPI row */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={<Users size={16} />}
          label={
            tab === "sales"
              ? "No. of Bills"
              : tab === "services"
              ? "Most Popular Service"
              : tab === "staff"
              ? "Top Performer"
              : "New Clients"
          }
          value={
            tab === "sales"
              ? 8
              : tab === "services"
              ? 8
              : tab === "staff"
              ? 89
              : 24
          }
          sublabel={
            tab === "sales"
              ? "+12% from last month"
              : tab === "services"
              ? "+12% from last month"
              : tab === "staff"
              ? "Services by Sarah Johnson"
              : "This month"
          }
        />
        <KpiCard
          icon={<DollarSign size={16} />}
          label={
            tab === "sales"
              ? "Total Bill Value"
              : tab === "services"
              ? "Highest Revenue Service"
              : tab === "staff"
              ? "Total Staff"
              : "Membership Clients"
          }
          value={
            tab === "sales"
              ? "$23,860"
              : tab === "services"
              ? "$23,860"
              : tab === "staff"
              ? 6
              : 15
          }
          sublabel={
            tab === "sales"
              ? "+12% from last month"
              : tab === "services"
              ? "Hair Cut & Styling"
              : "including all"
          }
        />
        <KpiCard
          icon={<Users size={16} />}
          label={
            tab === "sales"
              ? "Tips Value"
              : tab === "services"
              ? "Fastest Growing"
              : tab === "staff"
              ? "Average Revenue"
              : "Avg. Spend"
          }
          value={
            tab === "sales"
              ? "$200"
              : tab === "services"
              ? "$200"
              : tab === "staff"
              ? "$200"
              : "$200"
          }
          sublabel={
            tab === "sales"
              ? "+12% from last month"
              : tab === "services"
              ? "Massage Therapy"
              : tab === "staff"
              ? "per staff"
              : "per visit"
          }
        />
        <KpiCard
          icon={<Star size={16} />}
          label={
            tab === "sales"
              ? "Avg Order Value"
              : tab === "services"
              ? "Average Service Time"
              : tab === "staff"
              ? "Average Leaves"
              : "Retention Rate"
          }
          value={
            tab === "sales"
              ? "$3,408"
              : tab === "services"
              ? "65 min"
              : tab === "staff"
              ? 6
              : "78%"
          }
          sublabel={
            tab === "clients" ? "Client return rate" : "Across all services"
          }
        />
      </div>

      {/* Per-tab content */}
      {tab === "sales" && (
        <section className="mt-5 space-y-5">
          <CardShell title="Monthly Revenue Trends">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue} barSize={130}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="m" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="v" fill={LIME} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardShell>

          <section
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <div
              className="bg-gray-100 px-5 py-3 text-sm font-semibold"
              style={{ color: "#111827" }}
            >
              Sales Transactions
              <div className="text-xs font-normal opacity-80">
                Report generated from 26 Aug 2024 on 27 Aug 2024, 12:37:12 PM
              </div>
            </div>
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600">
                  <tr className="border-b" style={{ borderColor: BORDER }}>
                    <th className="px-5 py-3">Ref #</th>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Date & Time</th>
                    <th className="px-5 py-3">Payment Mode</th>
                    <th className="px-5 py-3">Net Total</th>
                    <th className="px-5 py-3">Tax Amount</th>
                    <th className="px-5 py-3">Gross Total</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-0"
                      style={{ borderColor: BORDER }}
                    >
                      <td className="px-5 py-3 text-gray-900 font-medium">
                        24676-{101 + i}
                      </td>
                      <td className="px-5 py-3">Customer {i + 1}</td>
                      <td className="px-5 py-3">26 Aug 2024 03:{40 + i} PM</td>
                      <td className="px-5 py-3">
                        {["UPI", "Card", "Cash"][i % 3]}
                      </td>
                      <td className="px-5 py-3">
                        ₹{(1000 + i * 120).toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        ₹{(180 + i * 20).toLocaleString()}
                      </td>
                      <td className="px-5 py-3 font-semibold text-gray-900">
                        ₹{(1200 + i * 150).toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                            style={{ borderColor: BORDER }}
                            aria-label="View"
                          >
                            <Eye size={18} className="text-gray-700" />
                          </button>
                          <button
                            className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                            style={{ borderColor: BORDER }}
                            aria-label="Edit"
                          >
                            <Edit size={18} className="text-gray-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      )}

      {tab === "services" && (
        <section className="mt-5 space-y-5">
          <CardShell title="Service Performance Analysis">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  {/* <tr>
                    <th
                      colSpan={7}
                      className="text-left px-5 py-3 font-semibold"
                      style={{ backgroundColor: LIME, color: "#111827" }}
                    >
                      Top Services
                    </th>
                  </tr> */}
                  <tr
                    className="text-left text-gray-600 border-b "
                    style={{ borderColor: BORDER }}
                  >
                    <th className="px-5 py-3">Service Name</th>
                    <th className="px-5 py-3">Bookings</th>
                    <th className="px-5 py-3">Revenue</th>
                    <th className="px-5 py-3">Avg. Price</th>
                    <th className="px-5 py-3">Growth</th>
                    <th className="px-5 py-3">Utilization</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Hair Cut & Styling", 124, "₹8,420", "₹68", 15, 80],
                    ["Hair Coloring", 78, "₹6,240", "₹64", 12, 74],
                    ["Facial Treatment", 65, "₹4,180", "₹64", 12, 69],
                    ["Manicure & Pedicure", 53, "₹3,960", "₹44", 5, 58],
                    ["Massage Therapy", 45, "₹2,840", "₹63", 10, 62],
                  ].map(([name, b, rev, price, growth, util], i) => (
                    <tr
                      key={i}
                      className="border-b last:border-0"
                      style={{ borderColor: BORDER }}
                    >
                      <td className="px-5 py-3">{name as string}</td>
                      <td className="px-5 py-3">{b as number}</td>
                      <td className="px-5 py-3">{rev as string}</td>
                      <td className="px-5 py-3">{price as string}</td>
                      <td className="px-5 py-3">
                        <span className="text-green-600 font-medium bg-green-300/10 p-2 rounded-full">
                          +{growth as number}%
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${util as number}%`,
                              backgroundColor: LIME,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardShell>
        </section>
      )}

      {tab === "staff" && (
        <section className="mt-5 space-y-5">
          <CardShell title="Staff Performance Metrics">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-left text-gray-600 border-b"
                    style={{ borderColor: BORDER }}
                  >
                    <th className="px-5 py-3">Staff Member</th>
                    <th className="px-5 py-3">Services</th>
                    <th className="px-5 py-3">Revenue</th>
                    <th className="px-5 py-3">Avg. Rating</th>
                    <th className="px-5 py-3">Efficiency</th>
                    <th className="px-5 py-3">Punctuality</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sarah Johnson", 89, "₹12,450", 4.9, 95, 100],
                    ["David Chen", 76, "₹10,230", 4.8, 92, 98],
                    ["Ana Rodriguez", 82, "₹11,890", 4.7, 88, 95],
                    ["Michael Brown", 71, "₹9,560", 4.6, 85, 93],
                  ].map(([name, s, rev, rating, eff, punc], i) => (
                    <tr
                      key={i}
                      className="border-b last:border-0"
                      style={{ borderColor: BORDER }}
                    >
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {name as string}
                      </td>
                      <td className="px-5 py-3">{s as number}</td>
                      <td className="px-5 py-3">{rev as string}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1">
                          <Star
                            size={16}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          {rating as number}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="inline-block px-3 py-1 rounded-md text-sm font-medium"
                          style={{
                            backgroundColor: "#DBEAFE",
                            color: "#1E40AF",
                          }}
                        >
                          {eff as number}%
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="w-24">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${punc as number}%`,
                                backgroundColor: "#22C55E",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardShell>
        </section>
      )}

      {tab === "clients" && (
        <section className="mt-5 space-y-5">
          {/* Two analysis cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CardShell
              title="Client Acquisition"
              rightAction={
                <Button variant="outline" size="sm" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Select Date
                </Button>
              }
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Walk-ins
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Direct visits
                  </div>
                  <div className="mt-3 text-3xl font-bold text-pink-500">
                    24
                  </div>
                  <div className="text-xs text-gray-400 mt-1">This month</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Online Booking
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Website & app
                  </div>
                  <div className="mt-3 text-3xl font-bold text-pink-500">
                    32
                  </div>
                  <div className="text-xs text-gray-400 mt-1">This month</div>
                </div>
              </div>
            </CardShell>

            <CardShell
              title="Client Demographics"
              rightAction={
                <Button variant="outline" size="sm" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Select Date
                </Button>
              }
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Female
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Average spend per month
                  </div>
                  <div className="mt-3 text-3xl font-bold text-pink-500">
                    24
                  </div>
                  <div className="text-xs text-gray-400 mt-1">$2012</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Male</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Average spend per month
                  </div>
                  <div className="mt-3 text-3xl font-bold text-pink-500">
                    12
                  </div>
                  <div className="text-xs text-gray-400 mt-1">$800</div>
                </div>
              </div>
            </CardShell>
          </div>

          {/* Client table with theme-colored buttons above */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setClientTab("all")}
                className="h-9 px-3 rounded-sm text-sm font-medium"
                style={{
                  backgroundColor: clientTab === "all" ? LIME : "transparent",
                  border: `1px solid ${
                    clientTab === "all" ? "transparent" : BORDER
                  }`,
                  color: "#111827",
                }}
              >
                All Customers
              </button>
              <button
                onClick={() => setClientTab("membership")}
                className="h-9 px-3 rounded-sm text-sm font-medium"
                style={{
                  backgroundColor:
                    clientTab === "membership" ? LIME : "transparent",
                  border: `1px solid ${
                    clientTab === "membership" ? "transparent" : BORDER
                  }`,
                  color: "#111827",
                }}
              >
                Membership Customers
              </button>
              <button
                onClick={() => setClientTab("new")}
                className="h-9 px-3 rounded-sm text-sm font-medium"
                style={{
                  backgroundColor: clientTab === "new" ? LIME : "transparent",
                  border: `1px solid ${
                    clientTab === "new" ? "transparent" : BORDER
                  }`,
                  color: "#111827",
                }}
              >
                New Customers
              </button>
            </div>

            <div className="ml-auto w-full md:w-64">
              <RightChipField
                label=""
                placeholder="Search Here"
                icon={<Search size={16} />}
                type="search"
              />
            </div>
          </div>

          <section
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <div
              className="px-5 py-3 text-sm font-semibold bg-gray-100"
              style={{ color: "#111827" }}
            >
              {clientTab === "all"
                ? "All Customers"
                : clientTab === "membership"
                ? "Membership Customers"
                : "New Customers"}
            </div>
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-sm">
                <thead className="text-left text-gray-600">
                  <tr className="border-b" style={{ borderColor: BORDER }}>
                    <th className="px-5 py-3">Customer ID</th>
                    <th className="px-5 py-3">Customer Name</th>
                    <th className="px-5 py-3">Client Type</th>
                    <th className="px-5 py-3">Visits This Month</th>
                    <th className="px-5 py-3">Avg. Spend per Visit</th>
                    <th className="px-5 py-3">Total Spend</th>
                    <th className="px-5 py-3">Last Visit Date</th>
                  </tr>
                </thead>
                <tbody>
                  {clientRows.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-0"
                      style={{ borderColor: BORDER }}
                    >
                      {r.map((c, j) => (
                        <td key={j} className="px-5 py-3">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      )}
    </main>
  );
}
