export default function CommentList({ comments }) {
  if (!comments?.length) {
    return <p>No comments yet. Be the first to say something!</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c._id} className="comment-item">
          <p className="comment-author">{c.authorName || 'User'} says:</p>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
