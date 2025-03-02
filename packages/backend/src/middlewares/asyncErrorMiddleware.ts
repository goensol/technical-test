import type { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpError } from "./httpError";

interface ParsedQs {
	[key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export const asyncErrorMiddleware = <
	Params extends Record<string, unknown>,
	Res extends Record<string, unknown> | string | null | undefined = undefined,
	Body extends Record<string, unknown> | undefined = undefined,
	Query extends ParsedQs = Record<string, never>,
>(
	endpointHandlerFunction: RequestHandler<Params, Res, Body, Query>,
) => {
	return async (
		req: Request<Params, Res, Body, Query>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			return await endpointHandlerFunction(req, res, next);
		} catch (error) {
			if (error instanceof HttpError) {
				return res.status(error.statusCode).json({
					success: false,
					message: error.message,
				});
			}

			const message =
				error instanceof Error
					? error.message
					: "Une erreur interne est survenue.";
			return res.status(500).json({
				success: false,
				message,
			});
		}
	};
};
