declare module "Models" {
  export interface LoginInput {
    username: string;
    password: string;
  }

  export interface RegisterInput {
    username: string;
    password: string;
    confirmPassword: string;
  }
}
