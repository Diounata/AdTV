'use client'

import { LogOutIcon, MoreVerticalIcon, UserCog, UserLock } from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { toast } from 'sonner'

interface Props {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function NavUser({ user }: Props) {
  const [, setIsEditingUser] = useQueryState('editar-usuario', parseAsBoolean.withDefault(false))
  const [, setIsEditingUserCredentials] = useQueryState('editar-credenciais', parseAsBoolean.withDefault(false))
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isMobile } = useSidebar()
  const router = useRouter()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar src={user.avatar} fallback={user.name} className="grayscale" />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar src={user.avatar} fallback={user.name} className="grayscale" />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => {
                  setIsDropdownOpen(false)
                  setIsEditingUser(true)
                }}
              >
                <UserCog />
                Editar perfil
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => {
                  setIsDropdownOpen(false)
                  setIsEditingUserCredentials(true)
                }}
              >
                <UserLock />
                Alterar senha
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={() => {
                router.push('/')
                localStorage.removeItem('accessToken')
                toast.info('Usuário desconectado com sucesso')
              }}
            >
              <LogOutIcon />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
