const ValidateForm = (email, password, name) => {
  const error = {};
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email,
  );
  const isPasswordValid = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/.test(password);
  const isNameValid = /^[0-9A-Za-z]{6,16}$/.test(name);

  if (!isEmailValid) {
    error.email = "Email ID is not Valid";
  }

  if (!isPasswordValid) {
    error.password = "Password is not valid";
  }

  if (name !== undefined) {
    if (!isNameValid) {
      error.name = "Please Enter Correct Name";
    }
  }
  return error;
};

export default ValidateForm;
