import validator from "validator";

export const isNotEmpty = (username, email, password, confirmPassword) => {
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    return false;
  } else {
    return true;
  }
};

export const isNotEmptyLogin = (email, password) => {
  if (email === "" || password === "") {
    return false;
  } else {
    return true;
  }
};

export const isValidEmail = (email) => {
  if (validator.isEmail(email)) {
    return true;
  } else {
    return false;
  }
};

export const isPasswordsMatch = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};

export const isPasswordStrong = (password) => {
  if (validator.isStrongPassword(password)) {
    return true;
  } else {
    return false;
  }
};
