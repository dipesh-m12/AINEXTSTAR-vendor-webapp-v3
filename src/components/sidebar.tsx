"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ShoppingCart,
  Home,
  Package,
  BarChart3,
  Star,
  Settings,
  Building2,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Quick Sale",
    url: "/quick-sale",
    icon: ShoppingCart,
  },
  {
    title: "Management",
    url: "/management",
    icon: Building2,
  },
  {
    title: "Reports & Analytics",
    url: "/report",
    icon: BarChart3,
  },
  {
    title: "Marketing",
    url: "/marketing",
    icon: Star,
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: Package,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { setOpenMobile, isMobile } = useSidebar();
  const pathname = usePathname();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, setOpenMobile, isMobile]);

  return (
    <Sidebar
      className={`
        border-r border-gray-200 bg-white w-[280px]
        md:fixed md:left-0 md:top-0 md:h-screen md:z-50
      `}
      collapsible={isMobile ? "offcanvas" : "none"}
    >
      {/* Header Section */}
      <SidebarHeader className="flex-shrink-0 p-6 pb-4 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-3 w-full">
          <Avatar className="h-12 w-12 shrink-0 bg-pink-600">
            <AvatarImage src="/rizzerv.png" />
            <AvatarFallback className="bg-pink-600 text-white text-xl font-bold">
              R
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate font-agenda">
              Rizzerv Dashboard
            </h2>
            <p className="text-sm text-gray-500 truncate">Salon Name</p>
          </div>
        </div>
      </SidebarHeader>

      {/* Scrollable Navigation Content */}
      <SidebarContent className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        <div className="px-3 py-4 bg-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => {
                  const isActive =
                    pathname === item.url ||
                    (pathname.startsWith(item.url) &&
                      item.url !== "/dashboard");

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`
                          group h-11 px-3 mx-0 rounded-lg transition-all duration-200 w-full
                          data-[active=true]:bg-lime-100 data-[active=true]:text-gray-900 data-[active=true]:hover:bg-lime-100
                          hover:bg-lime-50 hover:text-gray-900 
                          ${
                            isActive
                              ? "bg-lime-100 text-gray-900 hover:bg-lime-100"
                              : "text-gray-700 hover:bg-lime-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3 w-full"
                          onClick={() => {
                            // Close mobile sidebar on navigation
                            if (isMobile) {
                              setOpenMobile(false);
                            }
                          }}
                        >
                          <item.icon
                            className={`
                              h-5 w-5 shrink-0 transition-colors
                              ${
                                isActive
                                  ? "text-gray-900"
                                  : "text-gray-600 group-hover:text-gray-900"
                              }
                            `}
                          />
                          <span
                            className={`
                              text-[15px] font-medium truncate transition-colors
                              ${
                                isActive
                                  ? "text-gray-900"
                                  : "text-gray-700 group-hover:text-gray-900"
                              }
                            `}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
