import { Formik } from "formik";
import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts";
import { RegisterSchema } from "../../utils/validationSchemas";
import {
  IRegisterValues,
  IRegistrationStatus,
  MessageStatus,
} from "../../_models";
import Actions from "./Actions";
import Inputs from "./Inputs";
import { RegistrationAlert } from "./RegisterationAlert";

import API, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "../../utils/API";

const Register = () => {
  const { login } = React.useContext(AuthContext);
  const [registrationStatus, setRegistrationStatus] = React.useState<
    IRegistrationStatus
  >({
    status: MessageStatus.None,
    multipleMessages: false,
    message: "",
    messages: {},
  });

  const handleRegistration = async (
    values: IRegisterValues,
    { setSubmitting }: any
  ) => {
    let regStatus: IRegistrationStatus = {
      status: MessageStatus.None,
      multipleMessages: false,
      message: "",
      messages: {},
    };

    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/register`,
      data: values,
    };

    const user: void | AxiosResponse<{ token: string }> = await API(
      options
    ).catch((err: AxiosError) => {
      toast.error("Your registration attempt failed. Please, try again.");
      if (err.response?.data.errors) {
        regStatus = {
          ...regStatus,
          status: MessageStatus.Error,
          multipleMessages: true,
          messages: err.response?.data.errors,
        };
      } else {
        regStatus = {
          ...regStatus,
          status: MessageStatus.Error,
          multipleMessages: false,
          message: err.response?.data.message,
        };
      }

      setRegistrationStatus(regStatus);
    });

    if (user) {
      // toast.success("You have successfully registered");
      toast.success(
        `Welcome to Dating App ${values.username}! You have been successfully registered.`
      );
      login(
        { username: values.username, password: values.password },
        "/members"
      );
      setSubmitting(false);

      // regStatus = {
      //   ...regStatus,
      //   status: MessageStatus.Success,
      //   message: `Welcome to Dating App ${values.username}! You have been successfully registered.`,
      // };
    }
  };

  return (
    <Container>
      <Row className="justify-content-sm-center">
        {/* <Row> */}
        <Col sm={6} className="align-self-center">
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              gender: "prefer-not-to-say",
              dateOfBirth: "",
              country: "",
              city: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegistration}
          >
            {(yupProps) => {
              // console.log("yupProps = ", yupProps);

              return (
                <Form onSubmit={yupProps.handleSubmit}>
                  <h2 className="mb-5">Sign Up</h2>
                  <RegistrationAlert
                    registrationStatus={registrationStatus}
                    MessageStatus={MessageStatus}
                  />
                  <Inputs {...yupProps} />
                  <Actions {...yupProps} />
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
