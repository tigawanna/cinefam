import type { SidebarItem } from "@/components/sidebar/types";
import { Clapperboard, LayoutDashboard } from "lucide-react";

export const dashboard_account_routes = [] satisfies SidebarItem[];

export const dashboard_admin_routes = [] satisfies SidebarItem[];

export function getDashboardPrimaryRoutes(): SidebarItem[] {
  return [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Library", href: "/dashboard", icon: Clapperboard },
  ];
}
