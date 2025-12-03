import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useForm } from '../../hooks/useForm.js';
import ErrorBox from '../common/ErrorBox.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { values, changeHandler, submitHandler } = useForm(
    { email: '', username: '', password: '', repeatPassword: '' },
    async (values) => {
      setError('');

      if (!values.email || !values.username || !values.password) {
        setError('All fields are required.');
        return;
      }
      if (values.password !== values.repeatPassword) {
        setError('Passwords do not match.');
        return;
      }

      try {
        await register(values.email, values.password, values.username);
        navigate('/');
      } catch (err) {
        setError(err.message);
      }
    }
  );

  return (
    <section className="page page-narrow">
      <h2>Register</h2>
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
          Username
          <input
            type="text"
            name="username"
            value={values.username}
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

        <label>
          Repeat Password
          <input
            type="password"
            name="repeatPassword"
            value={values.repeatPassword}
            onChange={changeHandler}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </section>
  );
}
