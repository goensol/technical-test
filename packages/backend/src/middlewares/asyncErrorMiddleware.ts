import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError } from "zod";

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export const asyncErrorMiddleware = <
  Params extends Record<string, string>,
  Res extends Record<string, unknown> | string | null | void = void,
  Body extends Record<string, unknown> | undefined = undefined,
  Query extends ParsedQs = Record<string, never>,
>(
  endpointHandlerFunction: RequestHandler<Params, Res, Body, Query>
) => {
  return async function (
    req: Request<Params, Res, Body, Query>,
    res: Response,
    next: NextFunction
  ) {
    try {
      return await endpointHandlerFunction(req, res, next);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors, // Détails des erreurs de validation
        });
      }
      next(error);
    }
  };
};
