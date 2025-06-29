import { useState, useEffect } from 'react';
import { AuthContext, User } from './AuthContext';
import type { ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        (async () => {
            const userData = await SecureStore.getItemAsync('user');
            const token = await SecureStore.getItemAsync('token');

            if (userData && token) {
                try {
                    setUser(JSON.parse(userData));
                    setIsLogged(true);
                } catch (err) {
                    console.error('Error al parsear user:', err);
                    logout();
                }
            }
        })();
    }, []);

    const login = async (userData: User) => {
        setUser(userData);
        setIsLogged(true);
        await SecureStore.setItemAsync('user', JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        setIsLogged(false);
        await SecureStore.deleteItemAsync('user');
        await SecureStore.deleteItemAsync('token');
    };

    return (
        <AuthContext.Provider value={{ user, isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
