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
  value: string;
}

export function Checkbox({ label, name, value }: Props) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start rounded-md dark:bg-zinc-900">
          <FormControl>
            <CheckboxField
              checked={Array.isArray(field.value) && field.value.includes(value)}
              onCheckedChange={(checked) => {
                const currentValue = Array.isArray(field.value) ? field.value : [];
                if (!checked) {
                  form.setValue('unlinkedScreensId', [...form.getValues('unlinkedScreensId'), value]);
                }

                return checked
                  ? field.onChange([...currentValue, value])
                  : field.onChange(currentValue.filter((val: string) => val !== value));
              }}
            />
          </FormControl>

          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}
