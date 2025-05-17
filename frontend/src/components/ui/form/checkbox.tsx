"use client";
import { Checkbox as CheckboxField } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  description?: string;
}

export function Checkbox({ label, name, description }: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border bg-muted p-4 dark:bg-zinc-900">
          <FormControl>
            <CheckboxField
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}
