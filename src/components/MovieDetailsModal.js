import React from 'react';

function MovieDetailsModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="max-w-3xl w-full bg-white rounded-lg overflow-hidden shadow-xl p-4">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default MovieDetailsModal;