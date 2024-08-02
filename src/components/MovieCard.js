import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist } from '../store/watchlistSlice';
import { getMovieDetails } from '../api';
import MovieDetailsModal from './MovieDetailsModal';

function MovieCard({ movie, showDetailsButton }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const watchlist = useSelector((state) => state.watchlist[email] || []);
  const isMovieInWatchlist = watchlist.some(watchlistMovie => watchlistMovie.id === movie.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToWatchlist = () => {
    if (!isMovieInWatchlist) {
      dispatch(addToWatchlist({ email, movie }));
    }
  };

  const handleShowDetails = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      const details = await getMovieDetails(movie.id);
      setMovieDetails(details);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovieDetails(null);
  };

  const posterUrl =`https://image.tmdb.org/t/p/w500${movie.poster_path}`
  

  return (
    <div className="movie-card border border-gray-200 rounded-md overflow-hidden shadow-sm">
      {movie.poster_path ? (
        <img src={posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">No poster available</div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date.split('-')[0]}</p>
        <button 
          className={`mt-2 px-4 py-1 bg-gray-800 text-white rounded ${isMovieInWatchlist ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={handleAddToWatchlist} 
          disabled={isMovieInWatchlist}
        >
          {isMovieInWatchlist ? 'Added' : 'Add to Watchlist'}
        </button>
        {showDetailsButton && (
          <button 
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded ml-2"
            onClick={handleShowDetails}
          >
            Show Details
          </button>
        )}
      </div>

      <MovieDetailsModal isOpen={isModalOpen} onClose={closeModal}>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading movie details...</p>
          </div>
        ) : movieDetails && (
          <div>
            <h2 className="text-xl font-bold mb-4">{movieDetails.title} ({movieDetails.release_date.split('-')[0]})</h2>
            <div className="flex">
              <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} className="w-48 h-auto rounded-md mr-4" />
              <div>
                <p className="text-gray-700">{movieDetails.overview}</p>
                <p className="text-gray-600 mt-2">Popularity: {movieDetails.popularity.toFixed(2)}</p>
                <p className="text-gray-600">Vote Average: {movieDetails.vote_average.toFixed(1)}/10</p>
                <p className="text-gray-600">Vote Count: {movieDetails.vote_count}</p>
                <p className="text-gray-600">Original Language: {movieDetails.original_language.toUpperCase()}</p>
                <p className="text-gray-600">Adult: {movieDetails.adult ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        )}
      </MovieDetailsModal>
    </div>
  );
}

export default MovieCard;