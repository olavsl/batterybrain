import axios from 'axios';

// Set the base URL of your API
const api = axios.create({
  baseURL: '/api', // Update this to the correct server IP and port if needed
});

// Function to fetch all Raspberry Pi entries
export const fetchAllRPis = async () => {
  try {
    const response = await api.get('/rpis');
    return response.data;
  } catch (error) {
    console.error('Error fetching Raspberry Pi entries:', error);
    throw error;
  }
};
