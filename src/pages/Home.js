  import React, { useState, useEffect } from 'react';
  import MovieSearch from '../components/MovieSearch';
  import MovieList from '../components/MovieList';
  import { getPopularMovies, searchMovies } from '../api';
  import Sidebar from '../components/Sidebar';

  function Home() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetchPopularMovies();
    }, []);

    const fetchPopularMovies = async () => {
      setIsLoading(true);
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setIsLoading(false);
    };

    const handleSearch = async (query) => {
      setIsLoading(true);
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setIsLoading(false);
    };

    return (
      <div className="home bg-gray-100 min-h-screen flex flex-col md:flex-row">
        <Sidebar />

        <main className="main-content flex-grow p-4 md:ml-54">
          <div className="welcome-box bg-white border border-gray-300 p-4 mb-4 rounded">
            <h2 className="text-xl font-bold mb-2">Welcome to Movie Mania</h2>
            <p className="text-gray-700">Browse movies, add them to watchlists and share them with friends.</p>
            <p className="text-gray-700">Just click the + to add a movie, the poster to see more details or ✓ to mark the movie as watched.</p>
          </div>
          
          <MovieSearch onSearch={handleSearch} />

          {isLoading ? (
            <p className="text-gray-700">Loading movies...</p>
          ) : (
            <MovieList movies={movies} />
          )}
        </main>
      </div>
    );
  }

  export default Home;
