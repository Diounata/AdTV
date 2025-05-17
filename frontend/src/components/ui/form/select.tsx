import { InputHTMLAttributes, PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../form'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as ShadCNSelect } from '../select'

export interface SelectOptionProps {
  id: string
  label: string
  value: string
}

interface Props extends PropsWithChildren {
  label: string
  placeholder: string
  name: string
  options: SelectOptionProps[]
  optionChildren?: (option: SelectOptionProps) => React.ReactNode
  description?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export function Select({ label, placeholder, options, optionChildren, name, description }: Props) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <ShadCNSelect onValueChange={field.onChange} value={field.value}>
            <FormControl className="w-full">
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map(option => (
                <SelectItem value={option.value} key={option.id}>
                  {optionChildren ? optionChildren(option) : option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </ShadCNSelect>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
