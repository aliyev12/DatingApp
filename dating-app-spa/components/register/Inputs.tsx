import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaCalendarAlt } from "react-icons/fa";
import { DatePicker } from "../../utils/DatePicker";
import styled from "styled-components";
// import { CountryRegion } from "./CountryRegion";

const Inputs = (props: any) => {
  const {
    errors,
    isValid,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
  } = props;
  const [showPass, setShowPass] = React.useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });
  const [showDatePicker, set__showDatePicker] = React.useState(false);

  const pass = (name: "password" | "confirmPassword") => (
    <Form.Group controlId={`control-id__${name}`} className="mb-5">
      <FormLabel required>
        {name === "password" ? "Password" : "Confirm Password"}
      </FormLabel>
      <InputGroup className={`mr-sm-2 mt-3 mt-lg-0`}>
        <FormControl
          type={showPass[name] ? "text" : "password"}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[name]}
          isValid={!errors[name] && touched[name]}
          isInvalid={errors[name] && touched[name]}
        />

        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() =>
              setShowPass({
                ...showPass,
                [name]: !showPass[name],
              })
            }
          >
            {showPass[name] ? (
              <FaEyeSlash className="mx-1" style={{ cursor: "pointer" }} />
            ) : (
              <FaEye className="mx-1" style={{ cursor: "pointer" }} />
            )}
          </Button>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );

  const input = ({
    name,
    label,
    placeholder,
    type,
    required,
  }: {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
  }) => (
    <Form.Group controlId={`control-id__${name}`} className="mb-5">
      <FormLabel required={required ? required : false}>{label}</FormLabel>
      <FormControl
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        className={`mr-sm-2 mt-3 mt-lg-0`}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        isValid={!errors[name] && touched[name]}
        isInvalid={errors[name] && touched[name]}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <>
      {input({
        name: "name",
        label: "Name",
        placeholder: "Jane Doe",
        required: true,
      })}
      {input({
        name: "username",
        label: "Username",
        placeholder: "jane.doe",
        required: true,
      })}
      {input({ name: "knownAs", label: "Known As", placeholder: "Janny" })}
      {input({
        name: "email",
        label: "Email",
        placeholder: "jane.doe@email.com",
        type: "email",
        required: true,
      })}
      <Form.Group controlId="control-id__gender" className="mb-5">
        <FormLabel>Gender</FormLabel>
        <Form.Control
          as="select"
          name="gender"
          className={`mr-sm-2 mt-3 mt-lg-0`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gender}
        >
          <option value="prefer-not-to-say">Prefer Not to Say</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.gender}
        </Form.Control.Feedback>
      </Form.Group>

      {/* dateOfBirth */}
      <Form.Group controlId="control-id__dateOfBirth" className="mb-5">
        <FormLabel required>Date of Birth</FormLabel>
        <InputGroup className={`mr-sm-2 mt-3 mt-lg-0`}>
          <FormControl
            type="text"
            name="dateOfBirth"
            placeholder="01/01/1970"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dateOfBirth}
            isValid={!errors.dateOfBirth && touched.dateOfBirth}
            isInvalid={errors.dateOfBirth && touched.dateOfBirth}
          />

          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={() => set__showDatePicker(true)}
            >
              <FaCalendarAlt className="mx-1" style={{ cursor: "pointer" }} />
            </Button>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">
            {errors.dateOfBirth}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      {/* <CountryRegion {...props} /> */}
      {input({ name: "city", label: "City", placeholder: "New York City" })}
      {input({ name: "country", label: "Country", placeholder: "USA" })}
      {pass("password")}
      {pass("confirmPassword")}

      <DatePicker
        show={showDatePicker}
        onHide={() => set__showDatePicker(false)}
        handleDayClick={(date: Date) => {
          // setFieldValue("dateOfBirth", date.toUTCString()); // will return UTC
          // setFieldValue("dateOfBirth", date.toLocaleDateString());
          setFieldValue(
            "dateOfBirth",
            `${("0" + (date.getMonth() + 1)).slice(-2)}/${(
              "0" + date.getDate()
            ).slice(-2)}/${date.getFullYear()}`
          );

          set__showDatePicker(false);
        }}
      />
    </>
  );
};

export default Inputs;

const FormLabel = styled(Form.Label)`
  position: relative;
  ${({ required }) =>
    required
      ? `
    &::before {
      content: "*";
      font-size: 2rem;
      color: var(--red);
      left: -1.3rem;
      top: -0.3rem;
      position: absolute;
      left: -1rem;
      top: 0;
    }  
  `
      : ""}
`;
