import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useForm } from '../../hooks/useForm.js';
import ErrorBox from '../common/ErrorBox.jsx';
import * as profileService from '../../utils/profileService.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { values, changeHandler, submitHandler } = useForm(
    { email: '', username: '', password: '', repeatPassword: '' },
    async (v) => {
      setError('');

      if (!v.email || !v.username || !v.password) {
        return setError('All fields are required.');
      }

      if (v.password !== v.repeatPassword) {
        return setError('Passwords do not match.');
      }

      try {
        const user = await register(v.email, v.password, v.username);

        await profileService.create({
          email: v.email,
          displayName: v.username,
          firstName: "",
          lastName: "",
          job: "",
          age: "",
          nationality: "",
          bio: "",
          avatarUrl: ""
        });

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
          <input name="email" value={values.email} onChange={changeHandler} />
        </label>

        <label>
          Username
          <input name="username" value={values.username} onChange={changeHandler} />
        </label>

        <label>
          Password
          <input type="password" name="password" value={values.password} onChange={changeHandler} />
        </label>

        <label>
          Repeat Password
          <input type="password" name="repeatPassword" value={values.repeatPassword} onChange={changeHandler} />
        </label>

        <button className="btn btn-primary">Register</button>
      </form>
    </section>
  );
}
