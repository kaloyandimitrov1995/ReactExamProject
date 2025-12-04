import { createContext, useContext, useState } from "react";

const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [updateSignal, setUpdateSignal] = useState(0);

  const notifyLikesChanged = () => {
    setUpdateSignal((n) => n + 1);
  };

  return (
    <LikeContext.Provider value={{ updateSignal, notifyLikesChanged }}>
      {children}
    </LikeContext.Provider>
  );
}

export const useLikes = () => useContext(LikeContext);
