import * as Yup from "yup";

const alerts = {
  name: {
    wrongLength: "Name must be between 1 and 100 characters long",
    required: "Please, provide your name",
  },
  username: {
    wrongLength: "Username must be between 4 and 50 characters long",
    required: "Please, provide your username",
  },
  email: {
    wrongLength: "Email must be between 4 and 320 characters long",
    required: "Please, provide your email address",
    invalid: "Please, provide a valid email address",
  },
  gender: {
    required: "Please, select of the options",
  },
  dateOfBirth: {
    invalid:
      "Please, provide your date in the following format: (2 digits for month)/(2 digits for day)/(4 digits for year)",
  },
  password: {
    wrongLength: "Password must be between 8 and 50 characters long",
    required: "Please, provide your password",
  },
  confirmPassword: {
    wrongLength: "Password must be between 8 and 50 characters long",
    required: "Please, confirm your password",
    match: "Passwords must match",
  },
};

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, alerts.name.wrongLength)
    .max(100, alerts.name.wrongLength)
    .required(alerts.name.required),
  username: Yup.string()
    .min(4, alerts.username.wrongLength)
    .max(50, alerts.username.wrongLength)
    .required(alerts.username.required),
  email: Yup.string()
    .email(alerts.email.invalid)
    .min(4, alerts.username.wrongLength)
    .max(320, alerts.username.wrongLength)
    .required(alerts.username.required),
  gender: Yup.mixed()
    // Note `as const`: this types the array as `["male", "female", "other"]`
    // instead of `string[]`.
    .oneOf(["prefer-not-to-say", "male", "female", "other"] as const)
    .required(alerts.gender.required),
  dateOfBirth: Yup.string()
    .trim()
    .matches(
      /([0-2]\d{1}|3[0-1])\/(0\d{1}|1[0-2])\/(19|20)\d{2}/,
      function (arg1) {
        console.log(arg1);
      }
      // alerts.dateOfBirth.invalid
    )
    .required(alerts.dateOfBirth.invalid),
  password: Yup.string()
    .min(8, alerts.password.wrongLength)
    .max(50, alerts.password.wrongLength)
    .required(alerts.password.required),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], alerts.confirmPassword.match)
    .min(8, alerts.confirmPassword.wrongLength)
    .max(50, alerts.confirmPassword.wrongLength)
    .required(alerts.confirmPassword.required),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, alerts.username.wrongLength)
    .max(50, alerts.username.wrongLength)
    .required(alerts.username.required),
  password: Yup.string()
    .min(8, alerts.password.wrongLength)
    .max(50, alerts.password.wrongLength)
    .required(alerts.password.required),
});

export const EditProfileSchema = Yup.object().shape({
  introduction: Yup.string(),
  lookingFor: Yup.string(),
  interest: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
});

/*
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interest { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
*/
