import { useEffect, useState } from 'react';
import * as topicService from '../../utils/topicService.js';
import TopicCard from '../topics/TopicCard.jsx';
import Spinner from '../common/Spinner.jsx';
import ErrorBox from '../common/ErrorBox.jsx';

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    topicService
      .getAll()
      .then((data) => {
        if (!isMounted) return;
        setTopics(data);
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
  }, []);

  return (
    <section className="page">
      <h2>Latest Topics</h2>
      <p className="page-subtitle">
        Share your freelance news, projects and random thoughts. Other users can read and comment.
      </p>

      {loading && <Spinner />}
      <ErrorBox message={error} />

      <div className="topics-grid">
        {topics.map((t) => (
          <TopicCard key={t._id} topic={t} />
        ))}
        {!loading && !error && topics.length === 0 && <p>No topics yet. Create the first one!</p>}
      </div>
    </section>
  );
}
