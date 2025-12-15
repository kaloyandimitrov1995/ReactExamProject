import { createContext, useContext, useState } from "react";
import * as topicService from "../utils/topicService.js";

const TopicsContext = createContext();

export function TopicsProvider({ children }) {
  const [topics, setTopics] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadTopics = async () => {
    if (loaded) return;

    const data = await topicService.getAll();
    setTopics(
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
    setLoaded(true);
  };

  return (
    <TopicsContext.Provider value={{ topics, loadTopics }}>
      {children}
    </TopicsContext.Provider>
  );
}

export const useTopics = () => useContext(TopicsContext);
