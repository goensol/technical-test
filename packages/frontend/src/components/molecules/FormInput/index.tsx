import { forwardRef } from "react";
import { Props } from "./type";
import { useFormField } from "../../atoms/FormField/hook";
import { FormField } from "../../atoms/FormField";
import { Input } from "../../atoms/Input";

export const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { childrenProps, formFieldProps } = useFormField(props);

  return (
    <FormField {...formFieldProps}>
      <Input {...childrenProps} ref={ref} />
    </FormField>
  );
});
