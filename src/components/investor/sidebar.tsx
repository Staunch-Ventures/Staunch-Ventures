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
  ScanSearch,
  ChevronLeft,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { href: "/investor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/investor/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/investor/screener", label: "Screener", icon: ScanSearch },
  { href: "/investor/deals", label: "Discovery", icon: Search },
  { href: "/investor/community", label: "Documents", icon: FileText },
  { href: "/investor/profile", label: "Calendar", icon: CalendarDays },
];

export function InvestorSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, state, isMobile } = useSidebar();
  const isOpen = state === "expanded";

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarRail />

      <SidebarHeader className="pt-4">
        {isMobile ? (
          // On mobile the sheet starts at y=0 but the sticky layout header
          // (h-14) sits at y≈32 (below DemoBanner). This invisible spacer
          // (16+64+8 = 88px) pushes nav items below that covered zone.
          <div className="h-16" aria-hidden="true" />
        ) : (
          <Link
            href="/"
            aria-label="Staunch Ventures home"
            className="relative flex h-[35px] items-center justify-center px-1 transition-opacity hover:opacity-80"
          >
            <Image
              src="/Transparent%20Logo.png"
              alt="Staunch Ventures"
              width={140}
              height={35}
              priority
              className="shrink-0 transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0"
            />
            <Image
              src="/Logo Symbol Transparent Low Quality.png"
              alt="Staunch Ventures"
              width={28}
              height={28}
              priority
              className="absolute left-1/2 -translate-x-1/2 shrink-0 opacity-0 transition-opacity duration-200 group-data-[collapsible=icon]:opacity-100"
            />
          </Link>
        )}
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
                    "relative overflow-hidden rounded-lg transition-[color,background-color,padding] duration-200",
                    // When collapsed, grow the horizontal padding so the 18px
                    // icon sits dead-centre in the 56px rail button. Animating
                    // padding (not justify) lets it glide instead of jumping.
                    "group-data-[collapsible=icon]:!justify-start group-data-[collapsible=icon]:!px-[17px]",
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
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          {!isMobile && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleSidebar}
                tooltip={{ children: "Expand sidebar" }}
                size="lg"
                aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                className="text-sidebar-foreground/65 hover:text-foreground rounded-lg transition-[color,background-color,padding] duration-200 group-data-[collapsible=icon]:!justify-start group-data-[collapsible=icon]:!px-[17px]"
              >
                <ChevronLeft
                  className="size-[18px] shrink-0 transition-transform duration-300 group-data-[collapsible=icon]:rotate-180"
                  strokeWidth={1.75}
                />
                <span className="text-sm">Collapse</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={{ children: "Settings" }}
              size="lg"
              className="text-sidebar-foreground/65 hover:text-foreground rounded-lg transition-[color,background-color,padding] duration-200 group-data-[collapsible=icon]:!justify-start group-data-[collapsible=icon]:!px-[17px]"
            >
              <Link href="#" className="flex items-center gap-3">
                <Settings className="size-[18px] shrink-0" strokeWidth={1.75} />
                <span className="text-sm">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="w-full h-px bg-sidebar-border my-2" />
        <div className="flex items-center gap-3 p-2 transition-[padding] duration-200 group-data-[collapsible=icon]:px-3">
          <Avatar className="h-8 w-8 shrink-0 border border-sidebar-border">
            <AvatarFallback className="bg-sidebar-accent text-xs font-medium">LP</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden text-left">
            <p className="text-sm font-medium truncate">Limited Partner</p>
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
