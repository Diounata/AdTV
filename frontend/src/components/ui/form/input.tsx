import { If } from '@/components/if'
import { Input as InputField } from '@/components/ui/input'
import { formatNumberMask } from '@/utils/formatters/format-number-to-mask'
import { ChangeEvent, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../form'

interface Props {
  label: string
  name: string
  description?: string
  mask?: string
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export function Input({ label, name, description, mask, inputProps }: Props) {
  const form = useFormContext()
  const error = form.formState.errors[name]

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <InputField
              {...field}
              {...inputProps}
              className={`${inputProps?.className} ${error && 'border-destructive border'}`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (mask) {
                  const value = formatNumberMask(e.currentTarget.value, mask)
                  e.currentTarget.value = value
                }

                field.onChange(e)
              }}
            />
          </FormControl>

          <If condition={description}>
            <FormDescription>{description}</FormDescription>
          </If>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
