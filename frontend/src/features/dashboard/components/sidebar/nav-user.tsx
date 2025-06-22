"use client";

import { LogOutIcon, MoreVerticalIcon, UserCog, UserLock } from "lucide-react";
import { useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogoutUserMutation } from "@/features/authentication/hooks/react-query/use-logout-user-mutation";
import { useGetMeQuery } from "@/features/users/hooks/react-query/use-get-me-query";
import { useRouter } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import { toast } from "sonner";

function NavUserSkeleton() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Skeleton className="aspect-square h-8 w-8 rounded-md" />
      <div className="flex w-full flex-col gap-1">
        <Skeleton className="h-3 w-1/2 rounded-md" />
        <Skeleton className="h-3 w-3/4 rounded-md" />
      </div>
    </div>
  );
}

export function NavUser() {
  const [, setIsEditingUser] = useQueryState(
    "editar-usuario",
    parseAsBoolean.withDefault(false),
  );
  const [, setIsEditingUserCredentials] = useQueryState(
    "editar-credenciais",
    parseAsBoolean.withDefault(false),
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: user, isLoading } = useGetMeQuery();
  const logoutUserMutation = useLogoutUserMutation();
  const { isMobile } = useSidebar();
  const router = useRouter();

  if (isLoading) return <NavUserSkeleton />;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar
                src={""}
                fallback={user?.name ?? ""}
                className="grayscale"
              />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar
                  src={""}
                  fallback={user?.name ?? ""}
                  className="grayscale"
                />

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => {
                  setIsDropdownOpen(false);
                  setIsEditingUser(true);
                }}
              >
                <UserCog />
                Editar perfil
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => {
                  setIsDropdownOpen(false);
                  setIsEditingUserCredentials(true);
                }}
              >
                <UserLock />
                Alterar senha
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={async () => {
                await logoutUserMutation.mutateAsync();
                router.push("/");
                toast("Usuário desconectado com sucesso");
              }}
            >
              <LogOutIcon />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
