import axios from 'axios';

export const PixabayAPI = {
  apiKey: '39979032-c72900008a85800a5a967ce49',
  baseUrl: 'https://pixabay.com/api/',

  fetchImages: async (query, page = 1) => {
    try {
      const response = await axios.get(
        `${PixabayAPI.baseUrl}?key=${PixabayAPI.apiKey}&q=${query}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  },
};
