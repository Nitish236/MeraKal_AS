import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import { BadRequestError } from "../errors/allErr";

/* -------------------------------------------------------------------------------------------------------- */

//                               Function to Log In

export const login = (req: Request, res: Response): void => {
  // Retrieve Data
  const { username, password } = req.body;

  // Chekc the username and password
  if (
    username !== process.env.USER_USERNAME ||
    password !== process.env.USER_PASS
  ) {
    throw new BadRequestError("Invalid credentials");
  }

  const secretKey: string | undefined = process.env.JWT_SECRET_KEY;

  // Generate JWT token
  const token = jwt.sign({ username }, secretKey as string, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  // Send token as response
  res.status(StatusCodes.OK).json({ message: "Log In successfull", token });
};
