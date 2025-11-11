import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="login-form-content" data-testid="login-form" onSubmit={onSubmit}>
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
        type="submit"
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
