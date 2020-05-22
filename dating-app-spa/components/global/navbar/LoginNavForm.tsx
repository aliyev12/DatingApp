import React from "react";
import {
  Form,
  FormControl,
  Button,
  InputGroup,
  Popover as _Popover,
} from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../../contexts/UserContext";
import { ILoginStatus } from "../../../contexts/login";
import ErrorPopover from "./ErrorPopover";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

interface Props {}

const LoginNavForm = (props: Props) => {
  const [showPass, setShowPass] = React.useState(false);
  const [errorPopover, setErrorPopover] = React.useState({
    show: false,
    message: "",
  });
  const userContextValues = React.useContext(UserContext);
  const { handleLoggedIn, login } = userContextValues;
  const loginBtnRef = React.useRef(null);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        await login(values).then((res: ILoginStatus) => {
          if (res.status === "success" && res.token) handleLoggedIn(res.token);
          if (res.status === "fail" && res.message) {
            setErrorPopover({
              show: true,
              message: res.message,
            });
            setTimeout(() => {
              setErrorPopover({
                show: false,
                message: "",
              });
            }, 10000);
          }
        });
        setSubmitting(false);
      }}
    >
      {(yupProps) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        } = yupProps;
        // console.log("formik = ", yupProps);

        return (
          <Form inline onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Username"
              name="username"
              className={`mr-sm-2 mt-3 mt-lg-0 ${
                errors.username && touched.username ? "border-danger" : ""
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />

            <InputGroup
              className={`mr-sm-2 mt-3 mt-lg-0 ${
                errors.password && touched.password ? "border-danger" : ""
              }`}
            >
              <FormControl
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  errors.password && touched.password ? "border-danger" : ""
                }
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPass((show) => !show)}
                >
                  {showPass ? (
                    <FaEyeSlash
                      className="text-light mx-1 d-none d-lg-block"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <FaEye
                      className="text-light mx-1 d-none d-lg-block"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </Button>
              </InputGroup.Append>
            </InputGroup>

            <Button
              variant="success"
              className="ml-sm-2 mt-3 mt-lg-0"
              type="submit"
              disabled={isSubmitting}
              ref={loginBtnRef}
            >
              Login{isSubmitting ? "..." : ""}
              <ErrorPopover
                targetRef={loginBtnRef.current}
                showPopover={errorPopover.show}
                message={errorPopover.message}
              />
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginNavForm;
