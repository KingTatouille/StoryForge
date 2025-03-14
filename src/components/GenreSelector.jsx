import React from 'react';

const GenreSelector = ({ selectedGenre, onGenreSelect }) => {
  const genres = [
    { id: 'fantasy', name: 'Fantasy', icon: 'hat-wizard' },
    { id: 'scifi', name: 'Science-Fiction', icon: 'rocket' },
    { id: 'adventure', name: 'Aventure', icon: 'mountain' },
    { id: 'mystery', name: 'Mystère', icon: 'search' },
    { id: 'romance', name: 'Romance', icon: 'heart' },
    { id: 'horror', name: 'Horreur', icon: 'ghost' },
    { id: 'comedy', name: 'Comédie', icon: 'theater-masks' },
    { id: 'historical', name: 'Historique', icon: 'landmark' }
  ];

  return (
    <div className="genre-grid">
      {genres.map(genre => (
        <div 
          key={genre.id}
          className={`genre-item genre-${genre.id} ${selectedGenre === genre.id ? 'selected' : ''}`}
          onClick={() => onGenreSelect(genre.id)}
        >
          <div className="genre-icon">
            <i className={`fas fa-${genre.icon}`}></i>
          </div>
          <div className="genre-title">{genre.name}</div>
        </div>
      ))}
    </div>
  );
};

export default GenreSelector;