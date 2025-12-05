import { useState, useEffect } from "react";
import * as topicService from '../../utils/topicService.js';
import TopicCard from '../topics/TopicCard.jsx';
import { useTopicUpdate } from "../../contexts/TopicUpdateContext.jsx";



export default function Home() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { topicsChanged } = useTopicUpdate();
  const [filters, setFilters] = useState({
    news: false,
    job: false,
    story: false,
  });

  const selected = Object.keys(filters).filter(k => filters[k]);

  const filteredTopics =
    selected.length === 0
      ? topics
      : topics.filter(t => selected.includes(t.category));

  function toggleFilter(category) {
    setFilters(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

 useEffect(() => {
  setLoading(true);

  topicService
    .getAll()
    .then(setTopics)
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, [topicsChanged]);

  return (
    <section className="page">
      <h2>Latest Topics</h2>

      <div className="topic-filters">
        <label>
          <input
            type="checkbox"
            checked={filters.news}
            onChange={() => toggleFilter("news")}
          />
          <span className="topic-tag news">NEWS</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.job}
            onChange={() => toggleFilter("job")}
          />
          <span className="topic-tag job">JOB OFFER</span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.story}
            onChange={() => toggleFilter("story")}
          />
          <span className="topic-tag story">STORY</span>
        </label>
      </div>

      <div className="topics-grid">
        {filteredTopics.map(t => (
          <TopicCard key={t._id} topic={t} />
        ))}

        {!loading && filteredTopics.length === 0 && (
          <p>No topics match your filters.</p>
        )}
      </div>
    </section>
  );
}
