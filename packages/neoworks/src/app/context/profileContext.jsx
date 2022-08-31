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
  const [fetching, setFetching] = useState(false);

  const [userProfile, setUserProfile] = useState({});
  const { sessionInfo, attrInfo } = useContext(AuthContext);

  useEffect(() => {
    const sub = attrInfo.find((a) => a.Name === 'sub')?.Value;
    const getProfile = async () => {
      if (fetching && userProfile?.name && loading) {
        return;
      }
      setFetching(true);
      const result = await fetchProfile(sessionInfo.accessToken, sub);
      setUserProfile(result);
      setLoading(false);
      setFetching(false);
    };

    getProfile();
  }, [userId, sessionInfo.accessToken]);

  const state = { userProfile, loading };

  return (
    <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
