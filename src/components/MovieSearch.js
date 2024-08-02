import React, { useState } from 'react';

function MovieSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="movie-search mb-4 flex"> 
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded ml-2">Search</button> 
    </form>
  );
}

export default MovieSearch;
