import React from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaCalendarAlt } from "react-icons/fa";
import { DatePicker } from "../../utils/DatePicker";

const Inputs = ({
  errors,
  isValid,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  values,
}: any) => {
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
      <Form.Label>
        {name === "password" ? "Password" : "Confirm Password"}
      </Form.Label>
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

  const text = (
    name: string,
    label: string,
    placeholder: string,
    type: string = "text"
  ) => (
    <Form.Group controlId={`control-id__${name}`} className="mb-5">
      <Form.Label>{label}</Form.Label>
      <FormControl
        type={type}
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
      {text("name", "Name", "Jane Doe")}
      {text("username", "Username", "jane.doe")}
      {text("email", "Email", "jane.doe@email.com", "email")}
      <Form.Group controlId="control-id__gender" className="mb-5">
        <Form.Label>Gender</Form.Label>
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
        <Form.Label>Date of Birth</Form.Label>
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

/*
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
*/
