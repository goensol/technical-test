import { forwardRef } from "react";
import { InputProps } from "./type";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className="w-full p-2 rounded-md border border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500"
      {...props}
      ref={ref}
    />
  );
});
