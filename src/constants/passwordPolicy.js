const passwordPolicy = {
  minLength: 10,
  hasUpperCase: true,
  hasLowerCase: true,
  hasNumber: true,
  hasSpecialChar: true,

  /**
   * Validates a password against the defined password policy.
   *
   * @param {string} password - The password to be validated.
   * @throws {TypeError} - Throws an error if the password is not a string.
   * @returns {string[]|null} - Returns an array of error messages if the password does not meet the policy requirements, otherwise returns null.
   */
  validatePassword(password) {
    if (typeof password !== 'string') {
      throw new TypeError('Password must be a string.');
    }

    const { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } = this;

    const errors = [];

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long.`);
    }
    if (hasUpperCase && !/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (hasLowerCase && !/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (hasNumber && !/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (hasSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    return errors.length > 0 ? errors : true;
  }
};

export { passwordPolicy };
