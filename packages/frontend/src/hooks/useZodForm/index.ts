import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z, ZodSchema } from "zod";

type UseZodFormProps<Z extends ZodSchema> = Omit<
  UseFormProps<z.infer<Z>>,
  "resolver"
> & {
  schema: Z;
};

export const useZodForm = <Z extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<Z>) =>
  useForm({
    ...formProps,
    resolver: zodResolver(schema),
  });
