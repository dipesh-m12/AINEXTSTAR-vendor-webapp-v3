"use client";

import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { TopBar } from "./top-bar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthRoute =
    pathname?.startsWith("/signin") || pathname?.startsWith("/signup");

  if (isAuthRoute) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="md:ml-[280px] overflow-hidden max-w-full">
        {/* Mobile header - only visible on mobile */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">{/* Add any header content here */}</div>
        </header>
        {/* Main content area */}
        <TopBar />
        <div className="flex flex-1 flex-col gap-4 p-6 bg-gray-50 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
