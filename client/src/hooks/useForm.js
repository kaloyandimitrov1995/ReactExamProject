import { useState } from 'react';

export function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({ ...state, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const reset = (nextValues = initialValues) => setValues(nextValues);

  return {
    values,
    changeHandler,
    submitHandler,
    reset,
    setValues,
  };
}
