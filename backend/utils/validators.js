export const isValidEmail = (email) => {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
};

export const isValidPassword = (password) => {
  return password.length >= 6;
};
