import {API_URL_MANAGEMENT, Axios} from './index'

const PATH = 'auth';

export const registerUser = async (email: string, password: string, admin: boolean) => {
    try {
        const response = await Axios.post(`${API_URL_MANAGEMENT}/${PATH}/register`, {
                email,
                password,
                admin,
            },
            {withCredentials: true});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await Axios.post(`${API_URL_MANAGEMENT}/${PATH}/login`, {
            email,
            password,
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkAuthAndFetch = async () => {
    try {
        const response = await Axios.get(`${API_URL_MANAGEMENT}/${PATH}/check`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        console.error("Auth check failed:", err);
        return null; // או לזרוק שגיאה עם throw err;
    }
};