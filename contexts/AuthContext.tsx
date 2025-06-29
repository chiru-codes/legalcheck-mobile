import { createContext } from 'react';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    isLogged: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
