import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import * as topicService from '../../utils/topicService.js';
import * as commentService from '../../utils/commentService.js';
import Spinner from '../common/Spinner.jsx';
import ErrorBox from '../common/ErrorBox.jsx';
import CommentList from '../comments/CommentList.jsx';
import CommentForm from '../comments/CommentForm.jsx';
import * as likeService from '../../utils/likeService.js';
import { useLikes } from "../../contexts/LikeContext.jsx";

export default function TopicDetails() {
  const { topicId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notifyLikesChanged } = useLikes();
  const [topic, setTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(null);

  const isOwner = topic && topic._ownerId === user?._id;

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      topicService.getById(topicId),
      commentService.getByTopic(topicId),
      likeService.getLikesByTopic(topicId),
      likeService.userLiked(topicId, user._id)
    ])
    .then(([topicData, commentsData, likesData, userLikedData]) => {
      setTopic(topicData);
      setComments(commentsData);
      setLikes(likesData);
      setUserLike(userLikedData);
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

  const toggleLike = async () => {
  try {

    if (!userLike) {
      const created = await likeService.like({
        topicId,
      });
      setLikes(prev => [...prev, created]);
      setUserLike(created);
    }


    else {
      await likeService.unlike(userLike._id);
      setLikes(prev => prev.filter(l => l._id !== userLike._id));
      setUserLike(null);
    }
    
    notifyLikesChanged();
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <section className="page">
      <article className="topic-details">
        <h2>{topic.title}</h2>
        <p className="topic-meta">
          by <Link to={`/users/${topic._ownerId}`}>{topic.authorName || 'User'}</Link>
        </p>
        <p className="topic-body">{topic.content}</p>

        <div className="topic-actions">
          <button className="btn btn-secondary btn-small" onClick={toggleLike}>
            {userLike ? "👎 Unlike" : "👍 Like"} ({likes.length})
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
