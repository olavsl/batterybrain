import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '../types/User';
import axios from 'axios';

interface UserContextType {
  profile: User | null;
  setProfile: (profile: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token && !profile) {
      // Fetch user profile if it's not set
      axios
        .get<User>('https://www.googleapis.com/oauth2/v1/userinfo', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setProfile(response.data))
        .catch(() => {
          // Clear tokens and profile if the token is invalid
          localStorage.removeItem('googleToken');
          localStorage.removeItem('tokenExpiry');
          setProfile(null);
        });
    }
  }, [profile]);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
