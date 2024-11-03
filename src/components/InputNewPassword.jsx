/**
 * @file React component for entering a new password in a form.
 *
 * @requires react
 * @requires prop-types
 */

/**
 * Template for useState setter functions that set the password's validity.  This would be
 * useful for the parent element to know so that an invalid password isn't inadvertently
 * accepted & submitted to the database.
 *
 * @callback SetValidity
 * @param {boolean} isValid - "true" means the password is valid, "false" means that it isn't
 */

// ============================================================================================
// IMPORTS
// ============================================================================================

import { useState } from "react";
import PropTypes from "prop-types";

// ============================================================================================
// GLOBAL CONSTANTS
// ============================================================================================

const passwordPolicy = {
  minLength: 10,
  hasUpperCase: true,
  hasLowerCase: true,
  hasNumber: true,
  hasSpecialChar: true
};

// ============================================================================================
// GLOBAL FUNCTIONS
// ============================================================================================

/*
Validates a password against the defined password policy.

@param {string} password - The password to be validated.
@returns {string[]} - An array of human-readable policy requirement violations (if any).
*/
function validatePassword(password) {
  console.assert(typeof password === "string");

  const { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } = passwordPolicy;

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
  if (hasSpecialChar && !/[!?`~@#$%'^"&*()\-_=+[\]{}\\|;:,<.>/]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  return errors;
}

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

/**
 * Component for entering a new password in a form, including validation.
 *
 * This component should be placed inside a <form> element.  Two <input> elements will be added
 * to the form -- one will be named "password" and the other "confirmPassword".  Their DOM's
 * can be accessed by the usual mechanisms (typically, only the "password" element would be of
 * interest).
 *
 * Validation is performed & updated with every keystroke.
 *
 * @param {string} initialPassword
 * @param {SetValidity} setPasswordIsValid
 * @returns {ReactNode}
 */
function InputNewPassword({ initialPassword, setPasswordIsValid }) {
  const [passwordErrors, setPasswordErrors] = useState(validatePassword(initialPassword));
  const [password, setPassword] = useState(initialPassword);
  const [confirmPassword, setConfirmPassword] = useState("");

  function handlePasswordAssign(event) {
    const userPassword = event.target.value;
    setPassword(userPassword);
    const errors = validatePassword(userPassword);
    setPasswordErrors(errors);
    setPasswordIsValid(errors.length === 0 && userPassword === confirmPassword);
  }

  function handleConfirmPasswordAssign(event) {
    const userPassword = event.target.value;
    setConfirmPassword(userPassword);
    setPasswordIsValid(passwordErrors.length === 0 && userPassword === password);
  }

  return (
    <>
      Password:
      <br />
      <input name="password" type="password" value={password} onChange={handlePasswordAssign} />
      <br />
      {passwordErrors.length === 0 || (
        <ul>
          {passwordErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      Re-Enter Password:
      <br />
      <input
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordAssign}
      />
      <br />
      {password === confirmPassword || (
        <ul>
          <li>The two passwords don&apos;t match</li>
        </ul>
      )}
    </>
  );
}

InputNewPassword.propTypes = {
  initialPassword: PropTypes.string.isRequired,
  setPasswordIsValid: PropTypes.func.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default InputNewPassword;
