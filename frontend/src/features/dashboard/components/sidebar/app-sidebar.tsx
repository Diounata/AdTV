'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavSection } from '@/features/dashboard/components/sidebar/nav-section'
import { NavUser } from '@/features/dashboard/components/sidebar/nav-user'
import { HelpCircleIcon, HomeIcon, Monitor, NewspaperIcon, UsersIcon, WallpaperIcon } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

const data = {
  user: {
    name: 'Alex Araújo',
    email: 'alex.araujo@ifms.edu.br',
    avatar: '/avatars/alex.jpg',
  },
  navMain: [
    {
      title: 'Início',
      url: '#',
      icon: HomeIcon,
    },
    {
      title: 'Anúncios',
      url: '#',
      icon: NewspaperIcon,
    },
    {
      title: 'Anúncios ativos',
      url: '#',
      icon: WallpaperIcon,
    },
    {
      title: 'Telas',
      url: '#',
      icon: Monitor,
    },
    {
      title: 'Sobre o site',
      url: '#',
      icon: HelpCircleIcon,
    },
  ],
  navAdmin: [
    {
      title: 'Usuários',
      url: '#',
      icon: UsersIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex flex-col items-center">
          <SidebarMenuItem>
            <Image src="/images/ifms-text.png" alt="IFMS" width={150} height={150} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <NavSection label="Principal" items={data.navMain} />
        <NavSection label="Administração" items={data.navAdmin} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
