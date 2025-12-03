import { useForm } from '../../hooks/useForm.js';

export default function CommentForm({ onSubmit }) {
  const { values, changeHandler, submitHandler, reset } = useForm(
    { text: '' },
    (values) => {
      if (!values.text.trim()) return;
      onSubmit(values);
      reset({ text: '' });
    }
  );

  return (
    <form className="comment-form" onSubmit={submitHandler}>
      <textarea
        name="text"
        rows="3"
        placeholder="Write a comment..."
        value={values.text}
        onChange={changeHandler}
      />
      <button type="submit" className="btn btn-primary">
        Post Comment
      </button>
    </form>
  );
}
