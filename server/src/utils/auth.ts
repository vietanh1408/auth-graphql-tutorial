import { Secret, sign } from "jsonwebtoken";
import { User } from "../entities/User";
require("dotenv").config();

export const createToken = (user: User): string => {
  return sign({ userId: user.id }, process.env.SECRET_TOKEN as Secret, {
    expiresIn: "15m",
  });
};
