import { PropsWithChildren } from "react";

export type FormFieldProps = PropsWithChildren & {
  name: string;
  label: string;
};
