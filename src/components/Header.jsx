import React from 'react';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#">StoryForge</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Accueil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Bibliothèque</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">À propos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 hero-content">
              <h1 className="hero-title">Créez des histoires captivantes</h1>
              <p className="hero-subtitle">Libérez votre créativité avec notre générateur d'histoires intelligent qui s'adapte à vos préférences et personnages.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
