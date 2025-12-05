import { useState } from 'react';
import { useForm } from '../../hooks/useForm.js';
import { containsBadWords } from '../../utils/badWords.js';

export default function CommentForm({ onSubmit }) {
  const [error, setError] = useState('');

  const { values, changeHandler, submitHandler, reset } = useForm(
    { text: '' },
    (values) => {
      setError('');

      const text = values.text.trim();
      if (!text) {
        setError("Comment cannot be empty.");
        return;
      }

      if (containsBadWords(text)) {
        setError("Your comment contains forbidden words. Please keep it clean.");
        return;
      }
      onSubmit(values);
      reset({ text: '' });
    }
  );

  return (
    <form className="comment-form" onSubmit={submitHandler}>
      {error && <p className="comment-error">{error}</p>}

      <textarea
        name="text"
        rows="3"
        placeholder="Write a comment..."
        value={values.text}
        onChange={changeHandler}
        className={error ? "input-error" : ""}
      />

      <button type="submit" className="btn btn-primary">
        Post Comment
      </button>
    </form>
  );
}
