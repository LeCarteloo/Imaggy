import { createContext, ReactNode, useContext, useMemo } from 'react';
import type { UserInterface } from '../types/types';

type UserProviderProps = { children: ReactNode; user: UserInterface };

const UserContext = createContext<UserInterface | undefined>(undefined);

export const UserProvider = ({ children, user }: UserProviderProps) => {
  return (
    <UserContext.Provider value={useMemo(() => user, [user])}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      'useUserContext hook can only be used within UserContext provider'
    );
  }

  return context;
};

export default UserContext;
