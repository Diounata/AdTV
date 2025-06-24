import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loading } from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListAllSectorsQuery } from "@/features/sectors/hooks/react-query/use-list-all-sectors-query";
import { AlertCircleIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

export function SectorSelect() {
  const listAllSectorsQuery = useListAllSectorsQuery();
  const form = useFormContext();

  if (listAllSectorsQuery.isLoading)
    return <Loading label="Carregando setores..." />;

  if (listAllSectorsQuery.data?.length === 0)
    return (
      <Alert variant="destructive" className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <AlertCircleIcon className="text-destructive size-4" />
          <AlertTitle>Setores não encontrados</AlertTitle>
        </div>

        <AlertDescription>
          <span>
            Nenhum setor foi cadastrado ainda. Para prosseguir com o cadastro de
            telas, é necessário cadastrar pelo menos um setor.
          </span>

          <Button variant="secondary" size="sm" className="mt-2" asChild>
            <Link href="/dashboard/setores">
              <Plus />
              Cadastrar setor
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    );

  const options =
    listAllSectorsQuery.data?.map((sector) => ({
      id: sector.id,
      label: sector.name,
      value: sector.id,
    })) ?? [];

  return (
    <FormField
      control={form.control}
      name="sectorId"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Setor</FormLabel>

          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl className="w-full">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um setor" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Setores ({options.length})</SelectLabel>
                {options.map((option) => (
                  <SelectItem value={option.value} key={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
