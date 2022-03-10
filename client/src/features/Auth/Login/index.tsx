import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { LoginInput } from "Models";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "src/components/Form/CustomInput";
import CustomPassword from "src/components/Form/CustomPassword";
import FormLayout from "src/components/Form/FormLayout";
import * as yup from "yup";
import yupExtension from "../../../extensions/yup";

const schema = yup.object().shape({
  username: yupExtension.username,
  password: yupExtension.password(6),
});

const Login: React.FC = () => {
  const formProps = useForm<LoginInput>({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = formProps;

  const onSubmit = (data: LoginInput) => {
    console.log("data..........", data);
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
