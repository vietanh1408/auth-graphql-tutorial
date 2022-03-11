import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { LoginInput } from "Models";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomInput from "src/components/Form/CustomInput";
import CustomPassword from "src/components/Form/CustomPassword";
import FormLayout from "src/components/Form/FormLayout";
import { useLoginMutation } from "src/generated/graphql";
import * as yup from "yup";
import yupExtension from "../../../extensions/yup";
import JWTManager from "../../../utils/jwt";

const schema = yup.object().shape({
  username: yupExtension.username,
  password: yupExtension.password(6),
});

const Login: React.FC = () => {
  const [login, _] = useLoginMutation();

  const navigate = useNavigate();

  const formProps = useForm<LoginInput>({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = formProps;

  const onSubmit = async (data: LoginInput) => {
    const response = await login({
      variables: {
        input: {
          username: data.username,
          password: data.password,
        },
      },
    });

    if (response.data?.login.accessToken) {
      JWTManager.setToken(response.data?.login.accessToken as string);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <FormLayout>
      <FormProvider {...formProps}>
        <Typography variant="h3" component={"h3"} fontWeight="bold">
          ĐĂNG NHẬP
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput name="username" label="Tên đăng nhập" />
          <CustomPassword name="password" label="Mật khẩu" />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>
        </form>
      </FormProvider>
    </FormLayout>
  );
};

export default Login;
