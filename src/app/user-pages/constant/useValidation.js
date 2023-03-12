import { useState } from "react";
import validator from "validator";

export const useValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    // Validate each input field
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        newErrors[key] = "Field is required";
      } else if (
        key === "name" &&
        !validator.isAlpha(value, "en-US", { ignore: "s" })
      ) {
        newErrors[key] =
          "Invalid  name. Name contains only alphabetic characters";
      } else if (key === "email" && !validator.isEmail(value)) {
        newErrors[key] = "Email is not valid";
      } else if (key === "password" && !validator.isStrongPassword(value)) {
        newErrors[key] =
          "Password is not strong enough.passowrd should contain : minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1";
      } else if (key === "phone" && !validator.isMobilePhone(value)) {
        newErrors[key] = "Mobile number is not valid";
      } else if (key === "number" && !validator.isNumeric(value)) {
        newErrors[key] = "Field should conatain only number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return {
    values,
    handleChange,
    errors,
    validate,
  };
};
