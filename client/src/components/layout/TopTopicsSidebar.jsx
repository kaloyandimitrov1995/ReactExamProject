import { useEffect, useState } from "react";
import * as topicService from "../../utils/topicService.js";
import * as likeService from "../../utils/likeService.js";
import { useLikes } from "../../contexts/LikeContext.jsx";
import { useTopicUpdate } from "../../contexts/TopicUpdateContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function TopTopicsSidebar() {
  const [topTopics, setTopTopics] = useState([]);
  const { updateSignal } = useLikes();
  const { topicSignal } = useTopicUpdate();
  const { user } = useAuth();

  useEffect(() => {
    async function loadTopTopics() {
      try {
        const topics = await topicService.getAll();
        const likes = await likeService.getAllLikes();

        const likeMap = {};
        likes.forEach((l) => {
          likeMap[l.topicId] = (likeMap[l.topicId] || 0) + 1;
        });

        const enriched = topics.map((t) => ({
          ...t,
          likes: likeMap[t._id] || 0,
        }));

        const sorted = enriched
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10);

        setTopTopics(sorted);
      } catch (err) {
        console.error("Top topics failed:", err);
      }
    }

    loadTopTopics();
  }, [updateSignal, topicSignal, user]); 

  return (
    <aside className="right-sidebar">
      <div className="right-card">
        <h3>🔥 Top 10 Topics</h3>

        {topTopics.map((t) => (
          <Link key={t._id} to={`/topics/${t._id}`} className="top-topic-item">
            <span className="top-topic-title">{t.title}</span>
            <span className="top-topic-likes">👍 {t.likes}</span>
          </Link>
        ))}

        {topTopics.length === 0 && <p>No topics yet.</p>}
      </div>
    </aside>
  );
}
