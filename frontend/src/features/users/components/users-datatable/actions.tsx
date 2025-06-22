import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEditUserTypeHandler } from "../../hooks/handlers/edit-user-type-handler";
import { User } from "../../types/user";

interface Props {
  user: User;
}
export function UsersDatatableActions({ user }: Props) {
  const { editUserTypeMutationHandler } = useEditUserTypeHandler({ user });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={editUserTypeMutationHandler}>
          <p>
            Definir como
            <span className="ml-1 font-semibold">
              {user.type === "ADMIN" ? "PADRÃO" : "ADMIN"}
            </span>
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
