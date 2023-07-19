import { ReactNode, createContext, useEffect, useState } from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from '@/services/apiClient';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signOut: () => void;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const TOKEN_KEY = 'nextauth.token';
export const REFRESH_KEY = 'nextauth.refreshToken';

export const AuthContext = createContext({} as AuthContextData);

let authChanel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, TOKEN_KEY);
  destroyCookie(undefined, REFRESH_KEY);

  authChanel.postMessage('signOut');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user?.email;

  useEffect(() => {
    authChanel = new BroadcastChannel('auth');
    authChanel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          Router.push('/');
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { [TOKEN_KEY]: token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email, permissions, roles } = response.data;
          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, TOKEN_KEY, token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, REFRESH_KEY, refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signOut, signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
