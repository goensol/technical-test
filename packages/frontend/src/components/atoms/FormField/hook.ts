import { FormFieldProps } from "./type";

export const useFormField = <P extends FormFieldProps>(props: P) => {
  const { name, label, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { name, label, id },
    childrenProps: { ...otherProps, id, name },
  };
};
