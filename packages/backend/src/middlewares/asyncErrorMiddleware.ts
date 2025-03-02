import type { NextFunction, Request, RequestHandler, Response } from "express";

interface ParsedQs {
	[key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export const asyncErrorMiddleware = <
	Params extends Record<string, string>,
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
			next(error);
		}
	};
};
