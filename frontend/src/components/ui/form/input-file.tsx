import { Input as InputField } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

interface Props {
  label: string;
  name: string;
  description?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function InputFile({ label, name, description, inputProps }: Props) {
  const form = useFormContext();
  const error = form.formState.errors[name];

  return (
    <FormField
      control={form.control}
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <InputField
              {...field}
              {...inputProps}
              {...form.register(name)}
              type="file"
              className={`${inputProps?.className} ${error && "border-destructive border"}`}
              onChange={(event) =>
                onChange(event.target.files && event.target.files[0])
              }
            />
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
