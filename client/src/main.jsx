import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LikeProvider } from "./contexts/LikeContext.jsx";
import { TopicUpdateProvider } from "./contexts/TopicUpdateContext.jsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProfileProvider>
      <AuthProvider>
        <LikeProvider>
          <TopicUpdateProvider>
            <App />
          </TopicUpdateProvider>
        </LikeProvider>
      </AuthProvider>
    </ProfileProvider>
  </BrowserRouter>
);
