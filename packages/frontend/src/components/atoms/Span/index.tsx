import { Props } from "./type";

export const Span = (props: Props) => {
  return (
    <span
      className="block text-sm text-gray-700 font-medium cursor-pointer"
      {...props}
    ></span>
  );
};
