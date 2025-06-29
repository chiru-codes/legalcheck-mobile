import api from './api';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface LoginCredentials {
    username: string;
    password: string;
}

const API_URL = 'http://192.168.18.110:8080';

export const authService = {
    login: (credentials: LoginCredentials) => api.post('/auth/login', credentials),
    register: (userData: Record<string, unknown>) => api.post('/auth/register', userData),
    getMe: () => api.get('/api/users/me'),
    verify: (token: string) => axios.get(`${API_URL}/auth/verify?token=${token}`),
    updateLawyer: (
        userId: string,
        lawyerData: {
            tuitionNumber: string;
            yearExperience: number;
            province: string;
            specializations: string[];
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
        }
    ) => {
        return api.put(`/api/lawyers/${userId}`, lawyerData);
    },
};