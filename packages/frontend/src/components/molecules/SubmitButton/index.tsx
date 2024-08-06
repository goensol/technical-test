import { Button } from "../../atoms/Button";
import { SubmitButtonProps } from "./type";

export const SubmitButton = (props: SubmitButtonProps) => {
  return <Button type="submit" {...props}></Button>;
};
