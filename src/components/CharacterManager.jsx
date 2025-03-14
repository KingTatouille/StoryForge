import React from 'react';
import CharacterCard from './CharacterCard';

const CharacterManager = ({ 
  characters, 
  onAddCharacter, 
  onUpdateCharacter, 
  onSetMainCharacter, 
  onRemoveCharacter 
}) => {
  return (
    <div>
      <div id="characters-container">
        {characters.map(character => (
          <CharacterCard 
            key={character.id}
            character={character}
            onUpdateCharacter={onUpdateCharacter}
            onSetMainCharacter={onSetMainCharacter}
            onRemoveCharacter={onRemoveCharacter}
          />
        ))}
      </div>
      <button 
        className="btn-add-character"
        onClick={() => onAddCharacter(false)}
      >
        <i className="fas fa-user-plus"></i> Ajouter un personnage
      </button>
    </div>
  );
};

export default CharacterManager;