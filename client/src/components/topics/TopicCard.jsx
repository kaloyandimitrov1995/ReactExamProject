import { Link } from 'react-router-dom';

export default function TopicCard({ topic }) {
  return (
    <article className="topic-card">
     <span className={`topic-tag ${topic.category || "news"}`}>
       {(topic.category || "news").toUpperCase()}
     </span>
      <h3>{topic.title}</h3>
      <p className="topic-meta">
        by <Link to={`/users/${topic._ownerId}`}>{topic.authorName || 'Anonymous'}</Link>
      </p>
      <p className="topic-snippet">
        {topic.content?.slice(0, 120)}
        {topic.content && topic.content.length > 120 ? '...' : ''}
      </p>
      <Link to={`/topics/${topic._id}`} className="btn btn-primary btn-small">
        Open Topic
      </Link>
    </article>
  );
}
