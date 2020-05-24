import React from "react";

interface Props {
  yupProps: any;
}

const LocationDetails = ({ yupProps }: Props) => {
  const { errors, touched, handleChange, handleBlur, values } = yupProps;

  return (
    <>
      <h4>Location Details</h4>
      <div className="div form-inline">
        <label htmlFor="city">
          City:
          <input
            type="text"
            name="city"
            className={`form-control ${
              errors.city && touched.city ? "border-danger" : ""
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
        </label>
        <label htmlFor="country">
          Country:
          <input
            type="text"
            name="country"
            className={`form-control ${
              errors.country && touched.country ? "border-danger" : ""
            }`}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
          />
        </label>
      </div>
    </>
  );
};

export default LocationDetails;
