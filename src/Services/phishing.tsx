import {API_URL_SIMULATION, Axios} from './index'
import axios from "axios";

const PATH = 'phishing';
export const sendPhishingEmail = async (email: string) => {
    try {
        const response = await Axios.post(`${API_URL_SIMULATION}/${PATH}/send`, {email}, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const fetchTable = async () => {
    try {
        const response = await axios.get(`${API_URL_SIMULATION}/${PATH}/table`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};