import { ComponentProps } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export type Props<TFormTypes extends FieldValues> = Omit<
  ComponentProps<"form">,
  "onSubmit"
> & {
  onSubmit: SubmitHandler<TFormTypes>;
  form: UseFormReturn<TFormTypes>;
};
