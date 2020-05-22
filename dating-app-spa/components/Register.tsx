import React from "react";
import { Form, FormControl, Button, InputGroup, Alert } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";
import getConfig from "next/config";

import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import Router from "next/router";

type RegisterData = {
  username: string;
  password: string;
};

enum MessageStatus {
  Error,
  Success,
  None,
}

interface IRegistrationStatus {
  status: MessageStatus;
  multipleMessages: boolean;
  message: string;
  messages: { [key: string]: string[] };
}

const RegisterSchema = Yup.object().shape({
  username: Yup.string(),
  // .min(1, "Too Short!")
  // .max(50, "Too Long!")
  // .required("Required"),
  password: Yup.string(),
  // .min(1, "Too Short!")
  // .max(50, "Too Long!")
  // .required("Required"),
});

interface Props {}

const Register = (props: Props) => {
  const [showPass, setShowPass] = React.useState(false);
  const [registrationStatus, setErrorState] = React.useState<
    IRegistrationStatus
  >({
    status: MessageStatus.None,
    multipleMessages: false,
    message: "",
    messages: {},
  });

  const register = async (values: RegisterData) => {
    const { publicRuntimeConfig: config } = getConfig();
    const baseUrl = config.baseUrlAuth;
    const data = values;
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${baseUrl}register`,
      data,
    };

    const user: void | AxiosResponse<{ token: string }> = await axios(
      options
    ).catch((err: AxiosError) => {
      console.log("Register error: ", err);
      console.dir(err);
      const headerError = err.response?.headers["application-error"];
      console.log("Header error = ", headerError);

      let newErrorState: IRegistrationStatus;
      if (err.response?.data.errors) {
        newErrorState = {
          ...registrationStatus,
          status: MessageStatus.Error,
          multipleMessages: true,
          messages: err.response?.data.errors,
        };
      } else {
        newErrorState = {
          ...registrationStatus,
          status: MessageStatus.Error,
          multipleMessages: false,
          message: err.response?.data,
        };
      }

      setErrorState(newErrorState);
    });

    if (user) {
      console.log("user = ", user);
      setErrorState({
        ...registrationStatus,
        status: MessageStatus.Success,
        message: `Welcome to Dating App ${values.username}! You have been successfully registered.`,
      });
      //   localStorage.setItem("token", user.data.token);
      //   handleLoggedIn();
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await register(values);

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
        // console.log("yupProps = ", yupProps);

        return (
          <Form onSubmit={handleSubmit}>
            <h2 className="mb-5">Sign Up</h2>
            {registrationStatus.status !== MessageStatus.None ? (
              <Alert
                variant={
                  registrationStatus.status === MessageStatus.Error
                    ? "danger"
                    : "success"
                }
              >
                {registrationStatus.status === MessageStatus.Error &&
                  registrationStatus.multipleMessages &&
                  Object.keys(registrationStatus.messages).map(
                    (key: string, i: number) => (
                      <React.Fragment key={i}>
                        <strong>{key}:</strong>
                        <ul>
                          {registrationStatus.messages[key].map(
                            (msg: string, j: number) => (
                              <li key={"msg-" + j}>{msg}</li>
                            )
                          )}
                        </ul>
                      </React.Fragment>
                    )
                  )}
                {registrationStatus.status === MessageStatus.Error &&
                  !registrationStatus.multipleMessages && (
                    <strong>{registrationStatus.message}</strong>
                  )}
                {registrationStatus.status === MessageStatus.Success && (
                  <strong>{registrationStatus.message}</strong>
                )}
              </Alert>
            ) : null}

            <Form.Group>
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
            </Form.Group>

            <Form.Group>
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
                        className="mx-1 d-none d-lg-block"
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaEye
                        className="mx-1 d-none d-lg-block"
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Button
                variant="success"
                className="mt-3 mt-lg-0"
                type="submit"
                disabled={isSubmitting}
              >
                Submit{isSubmitting ? "ing..." : ""}
              </Button>
              <Button
                variant="secondary"
                className="ml-sm-2 mt-3 mt-lg-0"
                type="button"
                onClick={() => Router.push("/")}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Register;
