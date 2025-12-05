import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useForm } from '../../hooks/useForm.js';
import ErrorBox from '../common/ErrorBox.jsx';
import * as profileService from '../../utils/profileService.js';
import { containsBadWords } from '../../utils/badWords.js';
import { FORBIDDEN_USERNAMES } from '../../utils/forbiddenUsernames.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { values, changeHandler, submitHandler } = useForm(
    { email: '', username: '', password: '', repeatPassword: '' },
    async (v) => {
      setError('');

      const email = v.email.trim();
      const username = v.username.trim();
      const password = v.password.trim();
      const repeatPassword = v.repeatPassword.trim();

      if (!email || !username || !password || !repeatPassword) {
        return setError('All fields are required.');
      }

      if (!email.includes('@') || !email.includes('.')) {
        return setError('Invalid email format.');
      }

      if (username.length < 3 || username.length > 20) {
        return setError('Username must be between 3 and 20 characters.');
      }


      if (containsBadWords(username)) {
        return setError('Username contains inappropriate language.');
      }


      if (FORBIDDEN_USERNAMES.includes(username.toLowerCase())) {
        return setError('This username is not allowed.');
      }

      const exists = await profileService.usernameTaken(username);
      if (exists) {
        return setError('This username is already taken.');
      }

      if (password.length < 6) {
        return setError('Password must be at least 6 characters.');
      }

      if (password !== repeatPassword) {
        return setError('Passwords do not match.');
      }

      try {
        const user = await register(email, password, username);

        await profileService.create({
          email,
          displayName: username,
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
          <input
            name="email"
            value={values.email}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Username
          <input
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

        <button className="btn btn-primary">Register</button>
      </form>
    </section>
  );
}
