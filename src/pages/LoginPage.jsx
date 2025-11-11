import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/auth/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="auth-page">
      <section className="login-form">
        <h2 className="login-title">
          Login
        </h2>
        <LoginInput login={onLogin} />
        <p className="login-link">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="link-primary">
            Register
          </Link>
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
