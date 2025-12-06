import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useForm } from '../../hooks/useForm.js';
import * as topicService from '../../utils/topicService.js';
import ErrorBox from '../common/ErrorBox.jsx';
import { containsBadWords } from '../../utils/badWords.js';
import { useTopicUpdate } from "../../contexts/TopicUpdateContext.jsx";


export default function TopicCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { notifyTopicsChanged } = useTopicUpdate();


  const { values, changeHandler, submitHandler } = useForm(
    { title: '', content: '' },
    async (values) => {
      setError('');

      const title = values.title.trim();
      const content = values.content.trim();

      if (!title || !content) {
        return setError('Title and content are required.');
      }
      if (title.length < 4 || title.length > 40) {
        return setError('Title must be between 4 and 40 characters.');
      }

      if (content.length < 11 || content.length > 400) {
        return setError('Content must be between 11 and 400 characters.');
      }

      if (containsBadWords(title) || containsBadWords(content)) {
        return setError('Your topic contains inappropriate language.');
      }
      if (!values.category) {
        return setError("Please choose a topic category.");
      }

      if (!["news", "job", "story"].includes(values.category)) {
        return setError("Invalid category selected.");
      }

      try {
        const newTopic = await topicService.create({
          title: values.title.trim(),
          content: values.content.trim(),
          category: values.category,
          authorName: user.username || user.email,
          createdAt: new Date().toISOString(),
        });
        notifyTopicsChanged();
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
      value={values.content}
      onChange={changeHandler}
      required
    />
  </label>

  <label>
    Category
 <select name="category" value={values.category} onChange={changeHandler}>
  <option value="">Select category</option>
  <option value="news">News</option>
  <option value="job">Job Offer</option>
  <option value="story">Story</option>
</select>
  </label>

  <button type="submit" className="btn btn-primary">
    Post Topic
  </button>
</form>

    </section>
  );
}
