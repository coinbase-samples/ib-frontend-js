import React, { useContext, useState, useEffect, createContext } from 'react';

import { AuthContext } from '../context/authContext';

import { fetchProfile, updateProfile } from '../services/profile';

const defaultState = {};

export const ProfileContext = createContext(defaultState);

const ProfileProvider = ({ children, userId }) => {
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

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
  }, []);

  const updateUserProfile = async (body) => {
    try {
      setUpdatingProfile(true);
      const result = await updateProfile(
        sessionInfo.accessToken,
        body,
        userProfile.userId
      );
      setUserProfile(result);
      setUpdatingProfile(false);
      return result;
    } catch (e) {
      console.log(e);
      setUpdatingProfile(false);
    }
  };

  const state = {
    userProfile,
    loading,
    updateUserProfile,
    updatingProfile,
    setUpdatingProfile,
  };

  return (
    <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
