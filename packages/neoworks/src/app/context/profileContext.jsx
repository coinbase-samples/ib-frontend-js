import React, { useContext, useState, useEffect, createContext } from 'react';

import { AuthContext } from '../context/authContext';

import {
  //this is your imports for services
  fetchProfile,
} from '../services/profile';

const defaultState = {};

export const ProfileContext = createContext(defaultState);

const ProfileProvider = ({ children, userId }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const { sessionInfo } = useContext(AuthContext);
  console.log(sessionInfo.accessToken);

  useEffect(() => {
    const getProfile = async () => {
      const result = await fetchProfile(sessionInfo.accessToken, '1');
      setUserProfile(result);
      setLoading(false);
    };
    getProfile();
  }, [userId, sessionInfo.accessToken]);

  const state = { userProfile, loading };

  return (
    <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
