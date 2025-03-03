import { z } from "zod";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
	switch (issue.code) {
		case z.ZodIssueCode.invalid_type:
			return { message: "Champ requis" };
		default:
			return { message: ctx.defaultError };
	}
};
