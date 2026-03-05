
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
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  PieChart,
  BriefcaseBusiness,
  Folder,
  Calendar,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { href: "/dashboard/dashboard", label: "Dashboard", icon: PieChart },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/dashboard/deals", label: "Screener", icon: Search },
  { href: "/dashboard/community", label: "Documents", icon: Folder },
  { href: "/dashboard/profile", label: "Calendar", icon: Calendar },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();
  const [mounted, setMounted] = React.useState(false);
  const isOpen = state === "expanded";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const skeletonItems = Array.from({ length: 5 }, (_, i) => (
    <SidebarMenuItem key={i}>
      <SidebarMenuSkeleton showIcon />
    </SidebarMenuItem>
  ));

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarRail />
      <SidebarHeader>
        <div className="flex h-[45px] items-center px-2 group-data-[collapsible=icon]:justify-start">
          {mounted ? (
            <div className="relative flex h-full w-full items-center">
              <Image
                src="/Transparent%20Logo.png"
                alt="Staunch Ventures"
                width={140}
                height={35}
                className="shrink-0 opacity-100 transition-opacity duration-200 group-data-[state=collapsed]:opacity-0"
              />
              <Image
                src="/Logo Symbol Transparent Low Quality.png"
                alt="Staunch Ventures Symbol"
                width={32}
                height={32}
                className="absolute left-1 shrink-0 opacity-0 transition-opacity duration-200 group-data-[state=collapsed]:opacity-100"
              />
            </div>
          ) : (
            <Image
              src="/Transparent%20Logo.png"
              alt="Staunch Ventures"
              width={140}
              height={35}
            />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {mounted ? (
            <>
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      size="lg"
                      tooltip={item.label}
                      className={cn(
                        "relative text-sidebar-foreground transition-colors hover:text-sidebar-primary group overflow-hidden",
                        isActive ? "text-sidebar-primary" : "text-sidebar-foreground/70"
                      )}
                    >
                      <Link href={item.href} className="relative z-10 flex items-center gap-2">
                        {isActive && (
                          <motion.div
                            layoutId="active-sidebar-pill"
                            className="absolute inset-y-1 left-1 right-14 -z-10 bg-primary/20 border border-primary/30 backdrop-blur-md shadow-glass rounded-full"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                          />
                        )}
                        <item.icon className="size-5 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <SidebarMenuItem className="hidden md:block">
                <SidebarMenuButton 
                  onClick={toggleSidebar} 
                  size="lg"
                  tooltip="Collapse"
                  className="relative text-sidebar-foreground/80 hover:text-sidebar-primary group overflow-hidden"
                >
                  <div className="relative flex items-center justify-center w-5 h-5 shrink-0 z-10">
                    <motion.span
                        className="absolute block h-0.5 w-5 bg-current rounded-full"
                        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                        transition={{ duration: 0.3, ease: "anticipate" }}
                      />
                      <motion.span
                        className="absolute block h-0.5 w-5 bg-current rounded-full"
                        animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.span
                        className="absolute block h-0.5 w-5 bg-current rounded-full"
                        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                        transition={{ duration: 0.3, ease: "anticipate" }}
                      />
                  </div>
                  <span className="z-10">{isOpen ? "Collapse" : ""}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            skeletonItems
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              size="lg"
              className="text-sidebar-foreground/80 hover:text-sidebar-primary"
            >
              <Link href="#" className="flex items-center gap-2">
                <Settings className="size-5 shrink-0" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="w-full h-px bg-sidebar-border my-2" />
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:p-1 group-data-[collapsible=icon]:justify-start">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User" data-ai-hint="person face" />
            <AvatarFallback>LP</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden text-left">
            <p className="text-sm font-medium truncate">Limited Partner</p>
            <p className="text-xs text-muted-foreground truncate">lp@staunch.vc</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0 group-data-[collapsible=icon]:hidden" asChild>
            <Link href="/">
              <LogOut className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
