require("dotenv").config();
import { Context } from "../types/context";
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";
import { Secret, verify } from "jsonwebtoken";
import { UserAuthPayload } from "../types/user";

export const verifyAuth: MiddlewareFn<Context> = ({ context }, next) => {
  try {
    const authHeader = context.req.header("Authorization");
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      throw new AuthenticationError(`Vui lòng đăng nhập để tiếp tục`);
    }

    const decodedUser = verify(
      accessToken,
      process.env.SECRET_TOKEN as Secret
    ) as UserAuthPayload;

    context.user = decodedUser;

    return next();
  } catch (error) {
    throw new AuthenticationError(`Vui lòng đăng nhập để tiếp tục`);
  }
};
