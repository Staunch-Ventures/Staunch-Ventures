"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  CalendarDays,
  Settings,
  LogOut,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { href: "/dashboard/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/dashboard/deals", label: "Screener", icon: Search },
  { href: "/dashboard/community", label: "Documents", icon: FileText },
  { href: "/dashboard/profile", label: "Calendar", icon: CalendarDays },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const isOpen = state === "expanded";

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarRail />
      <SidebarHeader>
        <div className="flex h-[45px] items-center px-2 group-data-[collapsible=icon]:justify-start">
          <div className="relative flex h-full w-full items-center">
            <Image
              src="/Transparent%20Logo.png"
              alt="Staunch Ventures"
              width={140}
              height={35}
              priority
              className="shrink-0 transition-opacity duration-200 group-data-[state=collapsed]:opacity-0"
            />
            <Image
              src="/Logo Symbol Transparent Low Quality.png"
              alt="Staunch Ventures"
              width={28}
              height={28}
              className="absolute left-1 shrink-0 opacity-0 transition-opacity duration-200 group-data-[state=collapsed]:opacity-100"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  size="lg"
                  tooltip={{ children: item.label }}
                  className={cn(
                    "relative overflow-hidden rounded-lg transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-sidebar-foreground/65 hover:text-foreground"
                  )}
                >
                  <Link href={item.href} className="relative flex items-center gap-3">
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="absolute inset-y-1 left-0 right-0 -z-10 rounded-lg bg-sidebar-accent border border-sidebar-border"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-primary" aria-hidden />
                    )}
                    <item.icon className="size-[18px] shrink-0" strokeWidth={isActive ? 2.25 : 1.75} />
                    <span className="truncate text-sm font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem className="hidden md:block mt-2">
            <SidebarMenuButton
              onClick={toggleSidebar}
              size="lg"
              tooltip={{ children: isOpen ? "Collapse" : "Expand" }}
              className="text-sidebar-foreground/60 hover:text-foreground rounded-lg"
            >
              {isOpen ? (
                <PanelLeftClose className="size-[18px] shrink-0" strokeWidth={1.75} />
              ) : (
                <PanelLeftOpen className="size-[18px] shrink-0" strokeWidth={1.75} />
              )}
              <span className="text-sm">Collapse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={{ children: "Settings" }}
              size="lg"
              className="text-sidebar-foreground/65 hover:text-foreground rounded-lg"
            >
              <Link href="#" className="flex items-center gap-3">
                <Settings className="size-[18px] shrink-0" strokeWidth={1.75} />
                <span className="text-sm">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="w-full h-px bg-sidebar-border my-2" />
        <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:p-1 group-data-[collapsible=icon]:justify-start">
          <Avatar className="h-8 w-8 shrink-0 border border-sidebar-border">
            <AvatarFallback className="bg-sidebar-accent text-xs font-medium">LP</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden text-left">
            <p className="text-sm font-medium truncate">Limited Partner</p>
            <p className="text-xs text-muted-foreground truncate tabular-nums">lp@staunch.vc</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 group-data-[collapsible=icon]:hidden" asChild>
            <Link href="/" aria-label="Log out">
              <LogOut className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
