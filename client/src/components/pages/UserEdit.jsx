import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useForm } from '../../hooks/useForm.js';
import * as profileService from '../../utils/profileService.js';
import Spinner from '../common/Spinner.jsx';
import ErrorBox from '../common/ErrorBox.jsx';

export default function UserEdit() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { values, changeHandler, submitHandler, setValues } = useForm(
    { displayName: '', bio: '' },
    async (values) => {
      setError('');

      try {
        if (profileId) {
          await profileService.update(profileId, values);
        } else {
          const created = await profileService.create({
            ...values,
            email: user.email,
          });
          setProfileId(created._id);
        }
        navigate(`/users/${user._id}`);
      } catch (err) {
        setError(err.message);
      }
    }
  );

  useEffect(() => {
    let isMounted = true;

    profileService
      .getMyProfile(user._id)
      .then((profile) => {
        if (!isMounted) return;
        if (profile) {
          setProfileId(profile._id);
          setValues({
            displayName: profile.displayName || '',
            bio: profile.bio || '',
          });
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [user._id, setValues]);

  if (loading) {
    return (
      <section className="page">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="page page-narrow">
      <h2>Edit Profile</h2>
      <ErrorBox message={error} />

      <form className="form" onSubmit={submitHandler}>
        <label>
          Display Name
          <input
            type="text"
            name="displayName"
            value={values.displayName}
            onChange={changeHandler}
          />
        </label>

        <label>
          Short Bio
          <textarea name="bio" rows="4" value={values.bio} onChange={changeHandler} />
        </label>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
}
