import { useState } from "react";
import { useTopics } from "../../contexts/TopicsContext.jsx";
import TopicCard from "../topics/TopicCard.jsx";

export default function TopicSearch() {
  const { topics, loadTopics } = useTopics();
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");

  loadTopics();

  const normalizedQuery = query.toLowerCase();

  const filteredTopics = topics.filter((t) => {
    if (searchBy === "title") {
      return t.title.toLowerCase().includes(normalizedQuery);
    }

    if (searchBy === "author") {
      return (t.authorName || "")
        .toLowerCase()
        .includes(normalizedQuery);
    }

    if (searchBy === "content") {
      return t.content.toLowerCase().includes(normalizedQuery);
    }

    return false;
  });

  return (
    <section className="page">
      <h2>Search Topics</h2>

      <input
        className="search-input"
        placeholder={`Search by ${searchBy}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="search-modes">
        <button
          className={searchBy === "title" ? "active" : ""}
          onClick={() => setSearchBy("title")}
        >
          Title
        </button>

        <button
          className={searchBy === "author" ? "active" : ""}
          onClick={() => setSearchBy("author")}
        >
          Author
        </button>

        <button
          className={searchBy === "content" ? "active" : ""}
          onClick={() => setSearchBy("content")}
        >
          Content
        </button>
      </div>

      <div className="topics-grid">
        {query.trim() === "" ? (
          <p style={{ opacity: 0.7 }}>
            Search bar is empty, please enter a keyword or text.
          </p>
        ) : filteredTopics.length > 0 ? (
          filteredTopics.map((t) => (
            <TopicCard key={t._id} topic={t} />
          ))
        ) : (
          <p>No topics found.</p>
        )}
      </div>
    </section>
  );
}
