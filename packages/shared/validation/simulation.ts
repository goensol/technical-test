import { z } from "zod";
import { orientationEnum } from "../constants/orientation.enum";

export const simulationSchema = z.object({
	orientation: z.enum(
		Object.keys(orientationEnum) as [keyof typeof orientationEnum],
		{
			message: `L'orientation doit être l'une des suivantes : ${Object.values(orientationEnum).join(", ")}`,
		},
	),
	inclination: z.coerce
		.number()
		.min(0, { message: "L'inclinaison doit être comprise entre 0° et 90°" })
		.max(90, { message: "L'inclinaison doit être comprise entre 0° et 90°" }),
	monthlyBill: z.coerce
		.number()
		.int()
		.positive({ message: "Le coût mensuel doit être un entier positif" }),
	latitude: z.coerce
		.number()
		.min(-90, { message: "La latitude doit être comprise entre -90° et 90°" })
		.max(90, { message: "La latitude doit être comprise entre -90° et 90°" }),
	longitude: z.coerce
		.number()
		.min(-180, {
			message: "La longitude doit être comprise entre -180° et 180°",
		})
		.max(180, {
			message: "La longitude doit être comprise entre -180° et 180°",
		}),
});
