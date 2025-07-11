"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavSection } from "@/features/dashboard/components/sidebar/nav-section";
import { NavUser } from "@/features/dashboard/components/sidebar/nav-user";
import { EditUserCredentialsForm } from "@/features/users/components/forms/edit-user-credentials-form";
import { EditUserForm } from "@/features/users/components/forms/edit-user-form";
import {
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  MapIcon,
  MonitorIcon,
  UsersIcon,
  WallpaperIcon,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";

const data = {
  navMain: [
    {
      title: "Início",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Anúncios",
      url: "/dashboard/anuncios",
      icon: ImageIcon,
    },
    {
      title: "Telas",
      url: "/dashboard/telas",
      icon: MonitorIcon,
    },
    {
      title: "Setores",
      url: "/dashboard/setores",
      icon: MapIcon,
    },
    {
      title: "Sobre o site",
      url: "/dashboard/sobre",
      icon: HelpCircleIcon,
    },
  ],
  navAdmin: [
    {
      title: "Usuários",
      url: "/dashboard/usuarios",
      icon: UsersIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex flex-col items-center">
          <SidebarMenuItem>
            <Image
              src="/images/logo-text.png"
              alt="AdTV"
              width={150}
              height={150}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <NavSection label="Principal" items={data.navMain} />
        <NavSection label="Administração" items={data.navAdmin} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
        <EditUserForm />
        <EditUserCredentialsForm />
      </SidebarFooter>
    </Sidebar>
  );
}
