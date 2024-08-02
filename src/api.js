import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  if (query?.length > 0) {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
      }
    });
    return response.data.results || [];
  } else {
    return getPopularMovies();
  }
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    }
  });
  return response.data;
};

export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    }
  });
  return response.data.results.slice(0, 20); 
};