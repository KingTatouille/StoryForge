import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>StoryForge</h5>
            <p className="text-muted">Créez des histoires uniques et captivantes en quelques clics.</p>
          </div>
          <div className="col-md-3">
            <h5>Liens</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">Accueil</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Bibliothèque</a></li>
              <li><a href="#" className="text-decoration-none text-muted">À propos</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">Aide</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Support</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="text-center text-muted mb-0">© 2023 StoryForge. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;