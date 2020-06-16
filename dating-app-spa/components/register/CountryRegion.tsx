import React from "react";
import CountryRegionData from "country-region-data";
import { Form } from "react-bootstrap";

export const CountryRegion = ({
  errors,
  isValid,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  values,
}: any) => {
  console.log("CountryRegionData = ", CountryRegionData);
  console.log("values = ", values);

  const getRegions = () => {
    if (!values.country) return null;
    const label = values.country === "US" ? "State" : "City/Region";

    const country = CountryRegionData.find(
      (c) => c.countryShortCode === values.country
    );
    if (!country || !country.regions) return null;

    return (
      <Form.Group controlId="control-id__city" className="mb-5">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="select"
          name="city"
          className={`mr-sm-2 mt-3 mt-lg-0`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.city}
        >
          <option value="" key="empty-city">
            Select {label}
          </option>
          {country.regions.map((region) => {
            return (
              <option value={region.shortCode} key={region.shortCode}>
                {region.name}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.city}
        </Form.Control.Feedback>
      </Form.Group>
    );
  };

  return (
    <>
      <Form.Group controlId="control-id__country" className="mb-5">
        <Form.Label>Country</Form.Label>
        <Form.Control
          as="select"
          name="country"
          className={`mr-sm-2 mt-3 mt-lg-0`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.country}
        >
          <option value="" key="empty-country">
            Select Country
          </option>
          {CountryRegionData.map((country) => {
            return (
              <option
                value={country.countryShortCode}
                key={country.countryShortCode}
              >
                {country.countryName}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.country}
        </Form.Control.Feedback>
      </Form.Group>
      {getRegions()}
    </>
  );
};
