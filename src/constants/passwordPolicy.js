const passwordPolicy = {
  minLength: 10,
  hasUpperCase: true,
  hasLowerCase: true,
  hasNumber: true,
  hasSpecialChar: true,
};

const validatePassword = (password) => {
  const { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } = passwordPolicy;

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  if (hasUpperCase && !/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (hasLowerCase && !/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (hasNumber && !/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (hasSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  return null;
};

export { passwordPolicy, validatePassword };
