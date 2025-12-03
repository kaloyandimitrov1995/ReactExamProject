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
      {
    displayName: '',
    bio: '',
    firstName: '',
    lastName: '',
    job: '',
    age: '',
    nationality: '',
    avatarUrl: ''
      },
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
             firstName: profile.firstName || '',
             lastName: profile.lastName || '',
             job: profile.job || '',
             age: profile.age || '',
             nationality: profile.nationality || '',
             avatarUrl: profile.avatarUrl || ''
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
        First Name
       <input name="firstName" value={values.firstName} onChange={changeHandler} />
      </label>

      <label>
        Last Name
        <input name="lastName" value={values.lastName} onChange={changeHandler} />
      </label>

      <label>
        Job
        <input name="job" value={values.job} onChange={changeHandler} />
      </label>

      <label>
        Age
        <input name="age" value={values.age} onChange={changeHandler} />
      </label>

      <label>
        Nationality
        <input name="nationality" value={values.nationality} onChange={changeHandler} />
      </label>

      <label>
        Profile Photo URL
        <input name="avatarUrl" value={values.avatarUrl} onChange={changeHandler} />
      </label>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
}
