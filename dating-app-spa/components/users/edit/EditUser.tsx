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
import API, { AxiosRequestConfig } from "../../../utils/API";

// import { UsersContext } from "../../../contexts";
import { updateUser } from "../../../contexts";

export const EditUser = ({ id }: { id: string }) => {
  // const { updateUser } = React.useContext(UsersContext);
  const { user } = useUser(id);
  React.useEffect(() => {
    window.addEventListener("beforeunload", () => msg);
    return () => window.addEventListener("beforeunload", () => {});
  });

  const handleEditUser = async (
    values: IEditUserValues,
    yupProps: FormikProps<IEditUserValues>
  ) => {
    yupProps.setSubmitting(true);
    try {
      const options: AxiosRequestConfig = {
        method: "PUT",
        url: `/users/${id}`,
        data: values,
      };
      await API(options);
      toast.success("Your information has been successfully updates.");
      yupProps.resetForm({ values: values });
    } catch (err) {
      let errMsg = "Something went wrong";
      if (err.response.data && err.response.data.title)
        errMsg = err.response.data.title;
      toast.error(errMsg);
    }
    yupProps.setSubmitting(false);
  };

  if (!user) return null;
  return (
    <Formik
      initialValues={{
        introduction: user.introduction ? user.introduction : "",
        lookingFor: user.lookingFor ? user.lookingFor : "",
        interest: user.interest ? user.interest : "",
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
                          name="interest"
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
