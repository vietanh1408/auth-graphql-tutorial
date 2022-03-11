import { Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { User } from "../entities/User";
require("dotenv").config();

export const createToken = (
  type: "accessToken" | "refreshToken",
  user: User
): string => {
  return sign(
    { userId: user.id },
    type === "accessToken"
      ? (process.env.SECRET_TOKEN as Secret)
      : (process.env.REFRESH_TOKEN as Secret),
    {
      expiresIn: type === "accessToken" ? "10s" : "60m",
    }
  );
};

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie(
    process.env.REFRESH_TOKEN as string,
    createToken("refreshToken", user),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/refresh_token",
    }
  );
};
