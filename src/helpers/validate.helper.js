import ERROR_CONSTANTS from "constants/error.constant";

const validateLogin = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = ERROR_CONSTANTS.REQUIRED_EMAIL;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ERROR_CONSTANTS.VALID_EMAIL;
  }

  if (!values.password) {
    errors.password = ERROR_CONSTANTS.REQUIRED_PASSWORD;
  } else if (values.password.length < 8) {
    errors.password = ERROR_CONSTANTS.VALID_PASSWORD;
  }

  return errors;
};

const validateRegister = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = ERROR_CONSTANTS.REQUIRED_FIRST_NAME;
  } else if (values.firstName.length > 20) {
    errors.firstName = ERROR_CONSTANTS.VALID_FIRST_NAME;
  }

  if (!values.email) {
    errors.email = ERROR_CONSTANTS.REQUIRED_EMAIL;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ERROR_CONSTANTS.VALID_EMAIL;
  }

  if (!values.password) {
    errors.password = ERROR_CONSTANTS.REQUIRED_PASSWORD;
  } else if (values.password.length < 8) {
    errors.password = ERROR_CONSTANTS.VALID_PASSWORD;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = ERROR_CONSTANTS.REQUIRED_PASSWORD;
  } else if (values.confirmPassword.length > 20) {
    errors.confirmPassword = ERROR_CONSTANTS.VALID_PASSWORD;
  }

  if (values.password !== values?.confirmPassword) {
    errors.confirmPassword = ERROR_CONSTANTS.PASSWORD_MATCH;
  }

  return errors;
};

const validatePost = (values) => {
  const errors = {};

  if (!values.content && !values?.postAttachment) {
    errors.content = "Please write your thoughts or upload a image";
  }

  return errors;
};

export { validateLogin, validateRegister, validatePost };
