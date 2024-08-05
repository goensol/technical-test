import { z } from "zod";
import { OrientationEnum } from "@ensol-test/enums/orientation";

export const simulatorSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  inclination: z.coerce.number().min(0).max(90),
  monthlyBill: z.coerce.number().min(0),
  orientation: z.nativeEnum(OrientationEnum),
});
