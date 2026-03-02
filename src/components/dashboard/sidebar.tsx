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

const menuItems = [
  { href: "/dashboard/dashboard", label: "Dashboard", icon: PieChart },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/dashboard/deals", label: "Screener", icon: Search },
  { href: "/dashboard/community", label: "Documents", icon: Folder },
  { href: "/dashboard/profile", label: "Calendar", icon: Calendar },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

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
        <div className="flex h-[35px] items-center justify-center">
          {mounted ? (
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src="/Transparent%20Logo.png"
                alt="Staunch Ventures"
                width={140}
                height={35}
                className="shrink-0 opacity-100 transition-opacity duration-200 group-data-[state=collapsed]:opacity-0"
              />
              <Image
                src="/Original Logo Symbol.png"
                alt="Staunch Ventures Symbol"
                width={32}
                height={32}
                className="absolute shrink-0 opacity-0 transition-opacity duration-200 group-data-[state=collapsed]:opacity-100"
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
            menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  size="lg"
                  tooltip={{ children: item.label }}
                  className={cn(
                    "text-sidebar-foreground data-[active=true]:text-sidebar-primary",
                    "hover:text-sidebar-primary"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
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
              isActive={pathname === "/dashboard/settings"}
              tooltip={{ children: "Settings" }}
              size="lg"
              className="text-sidebar-foreground/80 hover:text-sidebar-primary data-[active=true]:text-sidebar-primary"
            >
              <Link href="#">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="w-full h-px bg-sidebar-border my-2" />
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User" data-ai-hint="person face" />
            <AvatarFallback>LP</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
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
