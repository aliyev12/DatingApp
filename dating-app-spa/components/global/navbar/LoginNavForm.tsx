import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { InputGroup, Popover as _Popover } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Formik } from "formik";
import { AuthContext } from "../../../contexts";
import { LoginSchema } from "../../../utils/validationSchemas";
import { ILoginValues } from "../../../_models";

const LoginNavForm = () => {
  const [showPass, setShowPass] = React.useState(false);
  const { login } = React.useContext(AuthContext);

  const handleLogin = (values: ILoginValues, { setSubmitting }: any) => {
    login(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
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
            >
              Login{isSubmitting ? "..." : ""}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginNavForm;
