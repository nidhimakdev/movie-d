import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    dispatch(logout());
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="md:hidden bg-gray-800 text-pink-500 p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Movie Mania</h1>
        <button onClick={toggleMobileMenu} className="text-3xl">
          ☰
        </button>
      </header>

      <aside className={`bg-gray-800 text-pink-500 h-screen w-64 flex flex-col justify-between transition-all duration-300 ease-in-out
        fixed md:sticky top-0 z-20
        ${isMobileMenuOpen ? 'left-0' : '-left-64 md:left-0'}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-8 text-pink-500 md:block hidden">Movie Mania</h1>
          
          <nav>
            <ul>
              <li>
                <Link to="/" className={`block py-2 px-4 rounded ${location.pathname === '/' ? 'bg-gray-900' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className={`block py-2 px-4 rounded ${location.pathname === '/watchlist' ? 'bg-gray-900' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/search" className={`block py-2 px-4 rounded ${location.pathname === '/search' ? 'bg-gray-900' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                  Search Movies
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-4">
            <span className="text-2xl">👤</span>
            <span className="ml-2 cursor-pointer" onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </>
  );
}

export default Sidebar;