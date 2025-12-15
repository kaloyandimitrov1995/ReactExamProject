import { useState } from "react";
import { useTopics } from "../../contexts/TopicsContext.jsx";
import TopicCard from "../topics/TopicCard.jsx";

export default function TopicSearch() {
  const { topics, loadTopics } = useTopics();
  const [query, setQuery] = useState("");

  loadTopics();

  const filtered = topics.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="page">
      <h2>Search Topics</h2>

      <input
        className="search-input"
        placeholder="Search topics by tittle"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="topics-grid">
        {filtered.map(t => (
          <TopicCard key={t._id} topic={t} />
        ))}

        {query && filtered.length === 0 && (
          <p>No results found.</p>
        )}
      </div>
    </section>
  );
}
