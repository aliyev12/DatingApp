import React from "react";

interface Props {
  yupProps: any;
  name: string;
  title: string;
}

const Textarea = ({ yupProps, name, title }: Props) => {
  const { errors, touched, handleChange, handleBlur, values } = yupProps;
  return (
    <>
      <h4>{title}</h4>
      <textarea
        name={name}
        rows={6}
        className={`form-control ${
          errors[name] && touched[name] ? "border-danger" : ""
        }`}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
      ></textarea>
    </>
  );
};

export default Textarea;
