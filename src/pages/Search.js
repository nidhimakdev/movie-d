import React, { useState } from 'react';
import { searchMovies } from '../api';
import MovieList from '../components/MovieList';
import Sidebar from '../components/Sidebar';

function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div className="search bg-gray-100 min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-grow p-4 md:ml-54">
        <div className="header bg-white border border-gray-300 p-4 mb-4 rounded-lg">
          <h2 className="text-2xl font-bold">Search Movies</h2>
        </div>
        <form onSubmit={handleSearch} className="search-form mb-4 flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a movie title"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded ml-2 hover:bg-pink-600 focus:outline-none">
            Search
          </button>
        </form>
        <MovieList movies={movies} />
      </main>
    </div>
  );
}

export default Search;