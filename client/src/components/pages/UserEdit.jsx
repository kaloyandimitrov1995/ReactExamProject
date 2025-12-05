import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useForm } from "../../hooks/useForm.js";
import * as profileService from "../../utils/profileService.js";
import Spinner from "../common/Spinner.jsx";
import { useProfile } from "../../contexts/ProfileContext.jsx";

const COUNTRIES = [
  "Albania", "Andorra", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Belgium", "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Canada",
  "China", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia",
  "Finland", "France", "Georgia", "Germany", "Greece", "Hungary",
  "Iceland", "India", "Ireland", "Italy", "Japan", "Kazakhstan",
  "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
  "Mexico", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia",
  "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino",
  "Serbia", "Slovakia", "Slovenia", "South Korea", "Spain", "Sweden",
  "Switzerland", "Turkey", "Ukraine", "United Kingdom", "United States", "Vatican City"
];

export default function UserEdit() {
  const { refreshProfile } = useProfile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    job: "",
    age: "",
    nationality: "",
    avatarUrl: ""
  });

  const { values, changeHandler, submitHandler, setValues } = useForm(
    {
      firstName: "",
      lastName: "",
      job: "",
      age: "",
      nationality: "",
      avatarUrl: ""
    },
    async (values) => {
      if (!validateAll(values)) return;

      try {
        if (profileId) {
          await profileService.update(profileId, values);
        } else {
          const created = await profileService.create({
            ...values,
            email: user.email
          });
          setProfileId(created._id);
        }

        await refreshProfile();
        navigate(`/users/${user._id}`);
      } catch (err) {
        console.error(err);
      }
    }
  );

  const validateField = (name, value) => {
    let error = "";

    if (name === "firstName" && value.trim() === "")
      error = "First Name field cannot be empty!";

    if (name === "lastName" && value.trim() === "")
      error = "Last Name field cannot be empty!";

    if (name === "job" && value.trim() === "")
      error = "Job field cannot be empty!";

    if (name === "nationality" && value.trim() === "")
      error = "You must select a nationality!";

    if (name === "age") {
      const n = Number(value);
      if (!n || n < 1 || n > 120)
        error = "Age must be between 1 and 120!";
    }

    if (name === "avatarUrl" && value.trim() !== "") {
      const imgPattern = /^(https?:\/\/.*\.(png|jpg|jpeg|gif|webp))$/i;
      if (!imgPattern.test(value))
        error = "Avatar URL must be a valid direct image link!";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const validateAll = (vals) => {
    let ok = true;
    for (const [field, val] of Object.entries(vals)) {
      if (!validateField(field, val)) ok = false;
    }
    return ok;
  };

  const handleChange = (e) => {
    changeHandler(e);
    validateField(e.target.name, e.target.value);
  };

  useEffect(() => {
    let mounted = true;

    profileService.getMyProfile(user._id).then((profile) => {
      if (!mounted) return;

      if (profile) {
        setProfileId(profile._id);
        setValues({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          job: profile.job || "",
          age: profile.age || "",
          nationality: profile.nationality || "",
          avatarUrl: profile.avatarUrl || ""
        });
      }

      setLoading(false);
    });

    return () => (mounted = false);
  }, [user._id, setValues]);

  if (loading) return <Spinner />;

  return (
    <section className="page page-narrow">
      <h2>Edit Profile</h2>

      <form className="form" onSubmit={submitHandler}>
        {values.avatarUrl && (
          <img
            src={values.avatarUrl}
            alt="avatar preview"
            className="avatar-preview"
          />
        )}

        <label>
          First Name
          <input
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            className={errors.firstName ? "input-error" : ""}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </label>

        <label>
          Last Name
          <input
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className={errors.lastName ? "input-error" : ""}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </label>

        <label>
          Job
          <input
            name="job"
            value={values.job}
            onChange={handleChange}
            className={errors.job ? "input-error" : ""}
          />
          {errors.job && <p className="error-text">{errors.job}</p>}
        </label>

        <label>
          Age
          <input
            name="age"
            value={values.age}
            onChange={handleChange}
            className={errors.age ? "input-error" : ""}
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </label>

        <label>
          Nationality
          <select
            name="nationality"
            value={values.nationality}
            onChange={handleChange}
            className={errors.nationality ? "input-error" : ""}
          >
            <option value="">Select nationality...</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.nationality && (
            <p className="error-text">{errors.nationality}</p>
          )}
        </label>

        <label>
          Profile Photo URL
          <input
            name="avatarUrl"
            value={values.avatarUrl}
            onChange={handleChange}
            className={errors.avatarUrl ? "input-error" : ""}
          />
          {errors.avatarUrl && (
            <p className="error-text">{errors.avatarUrl}</p>
          )}
        </label>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
}
