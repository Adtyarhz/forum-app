import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="login-form-content" data-testid="login-form">
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
        onClick={() => login({ email, password })}
        className="btn-primary"
      >
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
