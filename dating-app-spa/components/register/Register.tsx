import { Formik } from "formik";
import React from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { register } from "../../contexts/auth/register";
import { RegisterSchema } from "../../utils/validationSchemas";
import {
  IRegisterValues,
  IRegistrationStatus,
  MessageStatus,
} from "../../_models";
import Actions from "./Actions";
import Inputs from "./Inputs";
import { RegistrationAlert } from "./RegisterationAlert";

const Register = () => {
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
    const regStatus = await register(values);
    setRegistrationStatus(regStatus);
    setSubmitting(false);
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
