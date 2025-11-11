import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <div className="auth-page">
      <section className="register-form">
        <h2 className="register-title">
          Create your account
        </h2>
        <RegisterInput register={onRegister} />
        <p className="register-link">
          Already have an account?{' '}
          <Link to="/" className="link-primary">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}

export default RegisterPage;
