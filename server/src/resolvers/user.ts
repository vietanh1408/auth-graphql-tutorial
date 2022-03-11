import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserService } from "../services/user";
import { Context } from "../types/context";
import { LoginInput, RegisterInput, UserMutationResponse } from "../types/user";

@Resolver()
export class UserResolver {
  public userService = new UserService();

  @Query(() => [User])
  // @UseMiddleware(verifyAuth)
  async users(@Ctx() { user }: Context): Promise<User[]> {
    console.log("user...", user);
    return await this.userService.users();
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
