import React, { useState, useEffect, useContext } from 'react';

import {
  signInWithEmail as signInCognito,
  signOut,
  getAttributes as getCognitoAttributes,
  setAttribute as setCognitoAttribute,
  getSession as getCognitoSession,
} from './cognito';

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export interface IAuth {
  sessionInfo?: {
    username?: string;
    email?: string;
    sub?: string;
    accessToken?: string;
    refreshToken?: string;
  };
  attrInfo?: any;
  authStatus?: AuthStatus;
  signInWithEmail?: any;
  signOut?: any;
  getSession?: any;
  getAttributes?: any;
}

const defaultState: IAuth = {
  sessionInfo: {},
  authStatus: AuthStatus.Loading,
};

type Props = {
  children?: React.ReactNode;
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  return authStatus === AuthStatus.SignedIn ? children : null;
};

export const AuthIsNotSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  return authStatus === AuthStatus.SignedOut ? children : null;
};

const AuthProvider = ({ children }: Props) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  const [sessionInfo, setSessionInfo] = useState({});
  const [attrInfo, setAttrInfo] = useState([]);

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session: any = await getSession();

        window.localStorage.setItem(
          'accessToken',
          `${session.accessToken.jwtToken}`
        );
        window.localStorage.setItem(
          'refreshToken',
          `${session.refreshToken.token}`
        );
        // TODO set any new session related attributes (logged in devices?)
        await setAttribute({
          Name: 'website',
          Value: 'https://github.com/dbroadhurst/aws-cognito-react',
        });
        const attr: any = await getAttributes();
        setAttrInfo(attr);
        setAuthStatus(AuthStatus.SignedIn);

        const email = attr.find((i: any) => i.Name === 'email')?.Value;
        setSessionInfo({
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
          email,
          username: attr?.username,
        });
      } catch (err) {
        setAuthStatus(AuthStatus.SignedOut);
      }
    }
    getSessionInfo();
  }, [setAuthStatus, authStatus]);

  if (authStatus === AuthStatus.Loading) {
    return null;
  }

  async function signInWithEmail(username: string, password: string) {
    try {
      await signInCognito(username, password);
      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  }

  async function getSession() {
    const session = await getCognitoSession();
    return session;
  }

  async function getAttributes() {
    const attr = await getCognitoAttributes();
    return attr;
  }

  async function setAttribute(attr: any) {
    const res = await setCognitoAttribute(attr);
    return res;
  }

  const state: IAuth = {
    authStatus,
    sessionInfo,
    attrInfo,
    signInWithEmail,
    signOut,

    getSession,

    getAttributes,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
