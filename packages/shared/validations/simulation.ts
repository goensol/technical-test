import { InclinationEnum } from "@ensol-test/enums/inclination";
import { z } from "zod";
import { OrientationEnum } from "@ensol-test/enums/orientation";

export const simulationSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  inclination: z.nativeEnum(InclinationEnum),
  monthlyBill: z.coerce.number().min(0),
  orientation: z.nativeEnum(OrientationEnum),
});
