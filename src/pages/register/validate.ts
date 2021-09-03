import * as Yup from "yup";

export const validateForm = Yup.object().shape({
  username: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  rePassword: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .oneOf([Yup.ref("password")], "Re-password is not match")
    .required("Required"),
});
