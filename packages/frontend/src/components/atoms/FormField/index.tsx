import { useFormContext } from "react-hook-form";
import { FormFieldProps } from "./type";
import { ErrorLabel } from "../ErrorLabel";

export const FormField = ({ name, label, children }: FormFieldProps) => {
  const form = useFormContext();
  const state = form.getFieldState(name, form.formState);

  return (
    <div>
      <label
        className="block text-sm text-gray-700 font-medium cursor-pointer"
        htmlFor={name}
      >
        {label}
      </label>
      {children}
      {state.error && (
        <p>
          <ErrorLabel>{state.error.message}</ErrorLabel>
        </p>
      )}
    </div>
  );
};
