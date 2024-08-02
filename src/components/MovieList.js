import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('');
  const moviesPerPage = 8;

  useEffect(() => {
    setFilteredMovies(movies);
    setCurrentPage(1);
  }, [movies]);

  useEffect(() => {
    let result = [...movies];

    if (selectedGenre) {
      result = result.filter(movie => movie.genre_ids.includes(Number(selectedGenre)));
    }

    if (sortBy === 'popularity') {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.vote_average - a.vote_average);
    }

    setFilteredMovies(result);
    setCurrentPage(1);
  }, [movies, selectedGenre, sortBy]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];

  
  return (
    <div className="container mx-auto px-4">
      <div className="filters mb-6 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="genre-select" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre-select"
            className="w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort-select"
            className="w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Default</option>
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      {filteredMovies.length > 0 ? (
        <>
          <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showDetailsButton />
            ))}
          </div>
          <div className="pagination flex flex-wrap justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                className={`m-1 px-3 py-1 text-sm rounded-md ${
                  currentPage === number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-gray-700 text-center mt-8">
          No movies found. Please try different filters or search terms.
        </div>
      )}
    </div>
  );
}



export default MovieList;