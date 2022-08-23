import React, { useState, useEffect, createContext } from 'react';

import {
  //this is your imports for services
  fetchProfile,
} from '../services/profile';

const defaultState = {};

export const ProfileContext = createContext(defaultState);

const ProfileProvider = ({ children, userId }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      const result = await fetchProfile(userId);

      setUserProfile(result);
      setLoading(false);
    };
    getProfile();
  }, [userId]);

  const state = { userProfile, loading };

  return (
    <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
