import axios from 'axios';

// Set the base URL of your API
const api = axios.create({
    baseURL: 'http://51.120.13.32:5000', // Update this to the correct server IP and port if needed
});

// Function to fetch all Raspberry Pi entries
export const fetchAllRPis = async () => {
    try {
        const response = await api.get('/api/rpis');
        return response.data;
    } catch (error) {
        console.error('Error fetching Raspberry Pi entries:', error);
        throw error;
    }
};
