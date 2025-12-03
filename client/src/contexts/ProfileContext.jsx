import { createContext, useContext, useEffect, useState } from "react";
import * as profileService from "../utils/profileService.js";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }

    profileService.getMyProfile(userId).then((data) => {
      setProfile(data || null);
    });
  }, [userId]);

  const refreshProfile = async () => {
    if (!userId) return;

    const data = await profileService.getMyProfile(userId);
    setProfile(data || null);
  };

  const clearProfile = () => {
    setProfile(null);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        userId,
        setUserId,       
        refreshProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
