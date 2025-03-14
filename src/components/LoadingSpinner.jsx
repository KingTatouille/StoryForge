import React from 'react';

const LoadingSpinner = () => {
  return (
    <div id="loading-animation">
      <div className="loading-spinner"></div>
      <p>Génération de l'histoire en cours...</p>
    </div>
  );
};

export default LoadingSpinner;