import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Card as _Card, Tabs } from "react-bootstrap";
import { Tab, Form } from "react-bootstrap";
import styled from "styled-components";
import { useUser } from "../useUser";
import { Formik, FormikProps } from "formik";
import { EditProfileSchema } from "../../../utils/validationSchemas";
import { IEditUserValues } from "../../../_models";
import EditUserCard from "./EditUserCard";
import EditHeading from "./EditHeading";
import Textarea from "./Textarea";
import LocationDetails from "./LocationDetails";
import { ToastContainer, toast } from "react-toastify";

export const EditUser = ({ id }: { id: string }) => {
  const { user } = useUser(id);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("beforeunload", () => msg);
    return () => window.addEventListener("beforeunload", () => {});
  });

  const handleEditUser = async (
    values: IEditUserValues,
    yupProps: FormikProps<IEditUserValues>
  ) => {
    // const regStatus = await register(values);
    // setErrorState(regStatus);
    console.log("in handleEditUser");
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
    toast.success("Your information has been successfully updates.");

    yupProps.resetForm();
    yupProps.setSubmitting(false);
  };

  if (!user) return null;
  return (
    <Formik
      initialValues={{
        introduction: user.introduction ? user.introduction : "",
        lookingFor: user.lookingFor ? user.lookingFor : "",
        interests: user.interests ? user.interests : "",
        city: user.city ? user.city : "",
        country: user.country ? user.country : "",
      }}
      validationSchema={EditProfileSchema}
      onSubmit={handleEditUser}
    >
      {(yupProps: FormikProps<IEditUserValues>) => {
        return (
          <Container className="mt-4">
            {yupProps.dirty && <EditHeading alertType="info" />}
            {isSubmitted && <EditHeading alertType="success" />}
            <ToastContainer />
            <Row>
              <EditUserCard
                user={user}
                disabeSubmitBtn={!yupProps.dirty}
                handleSaveChanged={yupProps.handleSubmit}
              />
              <Col sm={8}>
                <TabPanel className="tab-panel">
                  <Tabs
                    id="uncontrolled-tab-example"
                    className="member-tabset"
                    defaultActiveKey="profile"
                  >
                    <Tab eventKey="profile" title="Edit Profile">
                      <Form
                      // onSubmit={yupProps.handleSubmit}
                      >
                        <Textarea
                          yupProps={yupProps}
                          name="introduction"
                          title="Description"
                        />
                        <Textarea
                          yupProps={yupProps}
                          name="lookingFor"
                          title="Looking For"
                        />
                        <Textarea
                          yupProps={yupProps}
                          name="interests"
                          title="Interests"
                        />
                        <LocationDetails yupProps={yupProps} />
                      </Form>
                    </Tab>
                    <Tab eventKey="photos" title="Edit Photos">
                      <p>photo edit goes here...</p>
                    </Tab>
                  </Tabs>
                </TabPanel>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Formik>
  );
};

const TabPanel = styled.div``;

const msg = "Changes you made may not be saved.";

// const [alertState, setAlertState] = React.useState({
//   display: false,
//   variant: "",
//   type: "",
//   message: "",
// });
// const [editProfileStatus, setEditProfileStatus] = React.useState<
//   IEditUserStatus
// >({
//   status: MessageStatus.None,
//   multipleMessages: false,
//   message: "",
//   messages: {},
// });
