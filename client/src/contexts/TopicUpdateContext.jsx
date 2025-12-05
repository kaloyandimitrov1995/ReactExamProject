import { createContext, useContext, useState } from "react";

const TopicUpdateContext = createContext();

export function TopicUpdateProvider({ children }) {
  const [topicSignal, setTopicSignal] = useState(0);

  const notifyTopicsChanged = () => {
    setTopicSignal(s => s + 1);
  };

  return (
    <TopicUpdateContext.Provider value={{ topicSignal, notifyTopicsChanged }}>
      {children}
    </TopicUpdateContext.Provider>
  );
}

export const useTopicUpdate = () => useContext(TopicUpdateContext);
