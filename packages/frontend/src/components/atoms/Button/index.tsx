import { ButtonProps } from "./type";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 disabled:!bg-gray-300'"
      {...props}
    ></button>
  );
};
