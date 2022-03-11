import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { RegisterInput } from "Models";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomInput from "src/components/Form/CustomInput";
import CustomPassword from "src/components/Form/CustomPassword";
import FormLayout from "src/components/Form/FormLayout";
import { useRegisterMutation } from "src/generated/graphql";
import * as yup from "yup";
import yupExtension from "../../../extensions/yup";
import JWTManager from "../../../utils/jwt";

const schema = yup.object().shape({
  username: yupExtension.username,
  password: yupExtension.password(6),
  confirmPassword: yupExtension.confirmPassword,
});

const Register: React.FC = () => {
  const [register, _] = useRegisterMutation();

  const navigate = useNavigate();

  const formProps = useForm<RegisterInput>({
    defaultValues: { username: "", password: "", confirmPassword: "" },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = formProps;

  const onSubmit = async (data: RegisterInput) => {
    const response = await register({
      variables: {
        input: {
          username: data.username,
          password: data.password,
        },
      },
    });
    if (response.data?.register.accessToken) {
      JWTManager.setToken(response.data?.register.accessToken as string);
      navigate("/");
    } else {
      navigate("/register");
    }
  };

  return (
    <FormLayout>
      <FormProvider {...formProps}>
        <Typography variant="h3" component={"h3"} fontWeight="bold">
          ĐĂNG KÝ
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput name="username" label="Tên đăng nhập" />
          <CustomPassword name="password" label="Mật khẩu" />
          <CustomPassword name="confirmPassword" label="Nhập lại mật khẩu" />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đăng ký
          </Button>
        </form>
      </FormProvider>
    </FormLayout>
  );
};

export default Register;
