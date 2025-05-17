import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../button";

interface Props extends React.ComponentProps<typeof Button> {
  onSubmitChildren: string;
  className?: string;
}

export function SubmitButton({
  onSubmitChildren,
  children,
  className = "",
  ...props
}: Props) {
  const form = useFormContext();
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Button disabled={isSubmitting} className={className} {...props}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {onSubmitChildren}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
