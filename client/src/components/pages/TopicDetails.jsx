import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import * as topicService from '../../utils/topicService.js';
import * as commentService from '../../utils/commentService.js';
import Spinner from '../common/Spinner.jsx';
import ErrorBox from '../common/ErrorBox.jsx';
import CommentList from '../comments/CommentList.jsx';
import CommentForm from '../comments/CommentForm.jsx';

export default function TopicDetails() {
  const { topicId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwner = topic && topic._ownerId === user?._id;

  useEffect(() => {
    let isMounted = true;

    Promise.all([topicService.getById(topicId), commentService.getByTopic(topicId)])
      .then(([topicData, commentsData]) => {
        if (!isMounted) return;
        setTopic(topicData);
        setComments(commentsData);
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
  }, [topicId]);

  const deleteHandler = async () => {
    const confirmed = window.confirm('Delete this topic?');
    if (!confirmed) return;

    try {
      await topicService.remove(topicId);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const onCommentSubmit = async (values) => {
    try {
      const newComment = await commentService.create({
        topicId,
        text: values.text.trim(),
        authorName: user.username || user.email,
      });

      setComments((state) => [...state, newComment]);
    } catch (err) {
      setError(err.message);
    }
  };

  const likeHandler = () => {

    setLikeCount((c) => c + 1);
  };

  if (loading) {
    return (
      <section className="page">
        <Spinner />
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <ErrorBox message={error} />
      </section>
    );
  }

  if (!topic) {
    return (
      <section className="page">
        <p>Topic not found.</p>
      </section>
    );
  }

  return (
    <section className="page">
      <article className="topic-details">
        <h2>{topic.title}</h2>
        <p className="topic-meta">
          by <Link to={`/users/${topic._ownerId}`}>{topic.authorName || 'User'}</Link>
        </p>
        <p className="topic-body">{topic.content}</p>

        <div className="topic-actions">
          <button className="btn btn-secondary btn-small" onClick={likeHandler}>
            👍 Like ({likeCount})
          </button>

          {isOwner && (
            <>
              <button className="btn btn-danger btn-small" onClick={deleteHandler}>
                Delete
              </button>
            </>
          )}
        </div>
      </article>

      <section className="topic-comments">
        <h3>Comments</h3>
        <CommentList comments={comments} />
        <CommentForm onSubmit={onCommentSubmit} />
      </section>
    </section>
  );
}
