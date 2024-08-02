import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../store/watchlistSlice';
import Sidebar from '../components/Sidebar';

function Watchlist() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const watchlist = useSelector((state) => state.watchlist[email] || []);

  const handleRemove = (movieId) => {
    dispatch(removeFromWatchlist({ email, movieId }));
  };

  return (
    <div className="watchlist bg-gray-100 min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-grow p-4 md:ml-54">
        <div className="header bg-white border border-gray-300 p-4 mb-4 rounded-lg">
          <h2 className="text-2xl font-bold">My Watchlist</h2>
        </div>
        {watchlist.length > 0 ? (
          <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {watchlist.map((movie) => (
              <div key={movie.id} className="movie-card bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {movie.poster_path ? (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className="w-full h-64 object-cover" 
                  />
                ) : (
                  <div className="no-poster w-full h-64 bg-gray-300 flex items-center justify-center">No poster available</div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-600">{new Date(movie.release_date).getFullYear()}</p>
                  <p className="text-sm text-gray-600 mt-1">Rating: {movie.vote_average.toFixed(1)}/10</p>
                  <button 
                    className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none" 
                    onClick={() => handleRemove(movie.id)}
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-700 mt-4">
            No Movies Added!
          </div>
        )}
      </main>
    </div>
  );
}

export default Watchlist;