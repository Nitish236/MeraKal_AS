import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get Bearer Token
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    throw new UnauthenticatedError("No Bearer Token found");
  }

  const secretKey: string | undefined = process.env.JWT_SECRET_KEY;

  // Verify token
  jwt.verify(token, secretKey as string, (err, decoded) => {
    if (err) {
      throw new UnauthenticatedError("Invalid Token");
    }

    next();
  });
};
