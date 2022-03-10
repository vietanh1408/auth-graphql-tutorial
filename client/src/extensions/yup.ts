import * as Yup from "yup";
import validate from "../constants/validate";

const username = Yup.string().required(validate.required);

const password = (length: number = 6) => {
  return Yup.string()
    .required(validate.required)
    .min(length, validate.password(length));
};

export default {
  username,
  password,
};
