import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useForm } from '../../hooks/useForm.js';
import * as topicService from '../../utils/topicService.js';
import ErrorBox from '../common/ErrorBox.jsx';

export default function TopicCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { values, changeHandler, submitHandler } = useForm(
    { title: '', content: '' },
    async (values) => {
      setError('');

      if (!values.title.trim() || !values.content.trim()) {
        setError('Title and content are required.');
        return;
      }

      try {
        const newTopic = await topicService.create({
          title: values.title.trim(),
          content: values.content.trim(),
          authorName: user.username || user.email,
        });

        navigate(`/topics/${newTopic._id}`);
      } catch (err) {
        setError(err.message);
      }
    }
  );

  return (
    <section className="page page-narrow">
      <h2>Create a Topic</h2>
      <ErrorBox message={error} />

      <form className="form" onSubmit={submitHandler}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Content
          <textarea
            name="content"
            rows="6"
            placeholder="Share your latest freelance story or rant..."
            value={values.content}
            onChange={changeHandler}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Post Topic
        </button>
      </form>
    </section>
  );
}
