import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../utils/api.js";
import { useProfile } from "./ProfileContext.jsx";

const AuthContext = createContext();
const AUTH_KEY = "auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setUserId, refreshProfile, clearProfile } = useProfile();

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setUserId(parsed._id);
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
  }, []);


  const login = async (email, password) => {
    const result = await api.post("/users/login", { email, password });

    setUser(result);
    localStorage.setItem(AUTH_KEY, JSON.stringify(result));

    setUserId(result._id);
    await refreshProfile();

    return result;
  };


  const register = async (email, password, username) => {
    const result = await api.post("/users/register", {
      email,
      password,
      username,
    });

    setUser(result);
    localStorage.setItem(AUTH_KEY, JSON.stringify(result));

    setUserId(result._id);
    await refreshProfile();

    return result;
  };


  const logout = async () => {
    try {
      await api.post("/users/logout"); 
    } catch (err) {
      console.warn("Server logout failed, clearing client session anyway.");
    }

    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    clearProfile();
    setUserId(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
