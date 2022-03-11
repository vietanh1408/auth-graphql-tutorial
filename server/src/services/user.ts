import argon2 from "argon2";
import { createToken, sendRefreshToken } from "../utils/auth";
import { User } from "../entities/User";
import { LoginInput, RegisterInput, UserMutationResponse } from "../types/user";
import { Context } from "src/types/context";

export class UserService {
  async users(): Promise<User[]> {
    const users = await User.find();

    return users;
  }

  async register(input: RegisterInput): Promise<UserMutationResponse> {
    const { username, password } = input;

    const existedUser = await User.findOne({ username });

    if (existedUser) {
      return {
        code: 400,
        success: false,
        message: "Người dùng đã tồn tại",
      };
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = User.create({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      code: 200,
      success: true,
      message: "Đăng ký thành công",
      user: newUser,
      accessToken: createToken("accessToken", newUser),
    };
  }

  async login(
    input: LoginInput,
    context: Context
  ): Promise<UserMutationResponse> {
    const { username, password } = input;

    const { res } = context;

    const existedUser = await User.findOne({ username });

    if (!existedUser) {
      return {
        code: 400,
        success: false,
        message: "Người dùng không tồn tại",
      };
    }

    const isValidPassword = await argon2.verify(existedUser.password, password);

    if (!isValidPassword) {
      return {
        code: 400,
        success: false,
        message: "Mật khẩu không chính xác",
      };
    }

    sendRefreshToken(res, existedUser);

    return {
      code: 200,
      success: true,
      message: "Đăng nhập thành công",
      user: existedUser,
      accessToken: createToken("accessToken", existedUser),
    };
  }
}
