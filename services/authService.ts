import api from './api';
import axios from 'axios';
import Constants from 'expo-constants';

interface LoginCredentials {
    username: string;
    password: string;
}

const API_URL = Constants.expoConfig?.extra?.API_URL;

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
    requestLawyer: (lawyerData: Record<string, any>) => api.post('/api/lawyers/request', lawyerData),
};
