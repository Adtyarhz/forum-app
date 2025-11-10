import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="register-form-content">
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
        className="input-field"
      />
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
        className="input-field"
      />
      <button
        type="button"
        onClick={() => register({ name, email, password })}
        className="btn-primary"
      >
        Register
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
