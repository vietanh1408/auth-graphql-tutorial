import { User } from "../entities/User";
import { Field, InputType, ObjectType } from "type-graphql";
import { MutationResponse } from "./mutation";
import { JwtPayload } from "jsonwebtoken";

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType({ implements: MutationResponse })
export class UserMutationResponse implements MutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  accessToken?: string;
}

export type UserAuthPayload = JwtPayload & {
  userId: number;
  tokenVersion: number;
};
