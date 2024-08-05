import { FieldValues, FormProvider } from "react-hook-form";
import { Props } from "./type";

export const Form = <TFormTypes extends FieldValues>({
  onSubmit,
  children,
  form,
  ...props
}: Props<TFormTypes>) => {
  return (
    <FormProvider {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
      </form>
    </FormProvider>
  );
};
