import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useForm } from '../../hooks/useForm.js';
import ErrorBox from '../common/ErrorBox.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { values, changeHandler, submitHandler } = useForm(
    { email: '', password: '' },
    async (values) => {
      setError('');
      if (!values.email || !values.password) {
        setError('Email and password are required.');
        return;
      }

      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    }
  );

  return (
    <section className="page page-narrow">
      <h2>Login</h2>
      <ErrorBox message={error} />

      <form className="form" onSubmit={submitHandler}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={changeHandler}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </section>
  );
}
