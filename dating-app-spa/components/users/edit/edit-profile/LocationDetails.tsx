import React from "react";

interface Props {
  yupProps: any;
}

const LocationDetails = ({ yupProps }: Props) => {
  const { errors, touched, handleChange, handleBlur, values } = yupProps;

  return (
    <>
      <h4 className="mb-4">Location Details</h4>
      <div className="div form-inline">
        <label htmlFor="city" className="mr-5">
          City:
          <input
            type="text"
            name="city"
            className={`form-control ml-3 ${
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
            className={`form-control  ml-3 ${
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
