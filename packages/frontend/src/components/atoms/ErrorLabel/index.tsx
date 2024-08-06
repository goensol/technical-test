import { ErrorLabelProps } from "./type";

export const ErrorLabel = (props: ErrorLabelProps) => {
  return <span className="text-red-600 text-sm" {...props}></span>;
};
