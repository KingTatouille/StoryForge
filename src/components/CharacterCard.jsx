import React from 'react';

const CharacterCard = ({ 
  character, 
  onUpdateCharacter, 
  onSetMainCharacter, 
  onRemoveCharacter 
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateCharacter(character.id, name, value);
  };

  return (
    <div className={`character-card ${character.isMain ? 'main-character' : ''}`} id={character.id}>
      <div className="character-header">
        <h4>
          <i className="fas fa-user me-2"></i> 
          <span className="character-title">
            {character.isMain ? 'Personnage principal' : 'Personnage'}
          </span>
        </h4>
        <div className="character-controls">
          {character.isMain ? (
            <span className="main-character-badge">
              <i className="fas fa-star me-1"></i> Principal
            </span>
          ) : (
            <div className="btn-group btn-group-sm">
              <button 
                className="btn btn-custom-primary make-main-btn"
                onClick={() => onSetMainCharacter(character.id)}
              >
                <i className="fas fa-star"></i> Principal
              </button>
              <button 
                className="btn btn-danger remove-character-btn"
                onClick={() => onRemoveCharacter(character.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor={`${character.id}-name`} className="form-label">Nom</label>
          <input 
            type="text" 
            id={`${character.id}-name`} 
            name="name"
            className="form-control"
            placeholder="Nom du personnage"
            value={character.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor={`${character.id}-age`} className="form-label">Âge</label>
          <input 
            type="number" 
            id={`${character.id}-age`} 
            name="age"
            className="form-control"
            value={character.age}
            min="1" 
            max="1000"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor={`${character.id}-occupation`} className="form-label">Occupation</label>
          <input 
            type="text" 
            id={`${character.id}-occupation`} 
            name="occupation"
            className="form-control"
            placeholder="Métier ou rôle"
            value={character.occupation}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor={`${character.id}-trait`} className="form-label">Trait principal</label>
          <input 
            type="text" 
            id={`${character.id}-trait`} 
            name="trait"
            className="form-control"
            placeholder="Caractéristique principale"
            value={character.trait}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor={`${character.id}-goal`} className="form-label">Objectif</label>
          <input 
            type="text" 
            id={`${character.id}-goal`} 
            name="goal"
            className="form-control"
            placeholder="Ce que cherche le personnage"
            value={character.goal}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor={`${character.id}-fear`} className="form-label">Peur/Faiblesse</label>
          <input 
            type="text" 
            id={`${character.id}-fear`} 
            name="fear"
            className="form-control"
            placeholder="Ce que craint le personnage"
            value={character.fear}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor={`${character.id}-backstory`} className="form-label">Histoire personnelle (optionnel)</label>
          <textarea 
            id={`${character.id}-backstory`} 
            name="backstory"
            className="form-control"
            rows="3"
            placeholder="Quelques éléments sur le passé du personnage..."
            value={character.backstory}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;