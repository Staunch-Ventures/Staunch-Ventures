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
  Send,
  Mic,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import * as React from "react";
import { motion } from "framer-motion";

const menuItems = [
  { href: "/startup/dashboard", label: "Dashboard", icon: PieChart },
  { href: "/startup/profile", label: "My Profile", icon: BriefcaseBusiness },
  { href: "/startup/pitch", label: "Pitch", icon: Mic },
  { href: "/startup/updates", label: "Investor Updates", icon: Send },
  { href: "/startup/resources", label: "Resources", icon: Folder },
  { href: "/startup/calendar", label: "Calendar", icon: Calendar },
];

export function StartupSidebar() {
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
        <div className="flex h-[35px] items-center justify-center">
          {mounted ? (
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src="/Transparent%20Logo.png"
                alt="Staunch Ventures"
                width={140}
                height={35}
                className="shrink-0 opacity-0 transition-opacity duration-200 group-data-[state=expanded]:opacity-100"
              />
              <Image
                src="/Original Logo Symbol.png"
                alt="Staunch Ventures Symbol"
                width={32}
                height={32}
                className="absolute shrink-0 opacity-100 transition-opacity duration-200 group-data-[state=expanded]:opacity-0"
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    size="lg"
                    tooltip={{ children: item.label }}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem className="hidden md:block">
                <SidebarMenuButton 
                  onClick={toggleSidebar} 
                  size="lg"
                  tooltip={{ children: "Collapse" }}
                  className="text-sidebar-foreground/80 hover:text-sidebar-primary"
                >
                  <div className="relative flex items-center justify-center w-5 h-5">
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
                  <span>Collapse</span>
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
              isActive={pathname === "/startup/settings"}
              tooltip={{ children: "Settings" }}
              size="lg"
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
            <AvatarImage src="https://picsum.photos/seed/founder-avatar/100/100" alt="User" data-ai-hint="person face" />
            <AvatarFallback>FN</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium truncate">Founder Name</p>
            <p className="text-xs text-muted-foreground truncate">founder@startup.co</p>
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
