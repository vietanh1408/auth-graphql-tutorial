export default {
  required: "Mục này không được để trống",
  password(length: number) {
    return `Mật khẩu phải có ít nhất ${length} ký tự`;
  },
  confirmPassword: "Mật khẩu không khớp",
};
