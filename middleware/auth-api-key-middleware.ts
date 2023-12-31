import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../errors/unauthorizedError";
import UnauthenticatedError from "../errors/unauthenticated";

export const authenticateAPI_KEY = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  // Get the api key
  const apiKey = req.headers.authorization;

  if (!apiKey) {
    throw new UnauthenticatedError("Unauthorized - API key is missing");
  }

  // Get the valid one
  const validApiKey = process.env.VALID_API_KEY;

  if (apiKey !== validApiKey) {
    throw new UnauthorizedError("Forbidden - Access denied");
  }

  next();
};
