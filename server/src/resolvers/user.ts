import { verifyAuth } from "./../middleware/auth.middleware";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { UserService } from "../services/user";
import { LoginInput, RegisterInput, UserMutationResponse } from "../types/user";
import { Context } from "../types/context";

@Resolver()
export class UserResolver {
  public userService = new UserService();

  @Query(() => String)
  @UseMiddleware(verifyAuth)
  getUsers(@Ctx() { user }: Context) {
    console.log("user.....", user);
    return "Users";
  }

  @Mutation(() => UserMutationResponse)
  async register(
    @Arg("input")
    input: RegisterInput
  ): Promise<UserMutationResponse> {
    return await this.userService.register(input);
  }

  @Mutation(() => UserMutationResponse)
  async login(
    @Arg("input")
    input: LoginInput
  ): Promise<UserMutationResponse> {
    return await this.userService.login(input);
  }
}
