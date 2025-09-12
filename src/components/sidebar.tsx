"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
    Calendar,
    CreditCard,
    Home,
    Users,
    Package,
    BarChart3,
    Star,
    Settings,
    Search,
} from "lucide-react"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
        title: "POS",
        url: "/pos",
        icon: CreditCard,
    },
    {
        title: "Client Management",
        url: "/clients",
        icon: Users,
    },
    {
        title: "Staff Management",
        url: "/staff",
        icon: Users,
    },
    {
        title: "Inventory",
        url: "/inventory",
        icon: Package,
    },
    {
        title: "Reports & Analytics",
        url: "/reports",
        icon: BarChart3,
    },
    {
        title: "Marketing",
        url: "/marketing",
        icon: Search,
    },
    {
        title: "Reputation",
        url: "/reputation",
        icon: Star,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const { setOpenMobile, isMobile } = useSidebar()
    const pathname = usePathname()

    // Close sidebar on mobile when route changes
    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }, [pathname, setOpenMobile, isMobile])

    return (
        <Sidebar
            className="border-r w-[280px]"
            collapsible={isMobile ? "offcanvas" : "none"}
        >
            <SidebarHeader className="p-6 pb-3"> {/* CHANGE 1: Reduced bottom padding from pb-4 to pb-3 */}
                <div className="flex items-center space-x-3 w-full">
                    <Avatar className="h-12 w-12 shrink-0">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-pink-500 text-white text-lg font-semibold">
                            MB
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 truncate">
                            Max Branch
                        </h2>
                        <p className="text-sm text-gray-500 truncate">Main Branch</p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Fixed separator that doesn't overflow */}
            <div className="px-0">
                <SidebarSeparator className="w-4/5" />
            </div>

            <SidebarContent className="px-3 pt-2"> {/* CHANGE 2: Reduced top padding from pt-4 to pt-2 */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-0.5"> {/* CHANGE 3: Reduced space between menu items from space-y-1 to space-y-0.5 */}
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="h-8 px-3 rounded-lg hover:bg-gray-100 data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900" // CHANGE 4: Reduced height from h-11 to h-9
                                    >
                                        <Link
                                            href={item.url}
                                            className="flex items-center gap-3 w-full"
                                            onClick={() => {
                                                // Close mobile sidebar on navigation
                                                if (isMobile) {
                                                    setOpenMobile(false)
                                                }
                                            }}
                                        >
                                            {/* Show larger icons on mobile, smaller on desktop */}
                                            <item.icon className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} shrink-0 text-gray-600`} /> {/* CHANGE 5: Reduced icon sizes */}
                                            <span className="text-sm font-medium text-gray-700 truncate">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
