import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string(),
  // .min(1, "Too Short!")
  // .max(50, "Too Long!")
  // .required("Required"),
  password: Yup.string(),
  // .min(1, "Too Short!")
  // .max(50, "Too Long!")
  // .required("Required"),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const EditProfileSchema = Yup.object().shape({
  introduction: Yup.string(),
  lookingFor: Yup.string(),
  interests: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
});
