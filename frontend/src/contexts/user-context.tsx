// frontend/src/contexts/user-context.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useGraphQLQuery } from '@/hooks/use-graphql-query';
import { ME_QUERY } from '@/graphql/queries/me';
import { removeAuthToken, setAuthToken as setToken, getAuthToken } from '@/lib/auth';

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type UserContextType = {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { data, loading, error, refetch } = useGraphQLQuery(ME_QUERY, {
    skip: !getAuthToken(),
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
      setIsAuthenticated(true);
    } else if (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
    setInitialized(true);
  }, [data, error]);

  const login = (token: string) => {
    setToken(token);
    refetch();
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading: loading || !initialized,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);