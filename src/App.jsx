import React, { useState, useEffect } from 'react';
import { generateStory } from './utils/storyGenerator';
import { SETTINGS, OBJECTS } from './data/constants';

function App() {
  // États pour les paramètres de l'histoire
  const [genre, setGenre] = useState('adventure');
  const [characters, setCharacters] = useState([]);
  const [settings, setSettings] = useState({
    setting: '',
    object: '',
    era: 'modern',
    plotType: 'quest',
    theme: 'identity'
  });
  const [complexity, setComplexity] = useState({
    length: 5,
    detail: 5,
    twist: 5
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    pov: 'third_limited',
    tone: 'serious'
  });
  
  // États pour l'UI
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [generatedStory, setGeneratedStory] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Initialisation du personnage principal lors du chargement initial
  useEffect(() => {
    addCharacter(true);
  }, []);
  
  // Mettre à jour les options en fonction du genre sélectionné
  useEffect(() => {
    // Réinitialiser les valeurs setting et object lors du changement de genre
    setSettings(prev => ({
      ...prev,
      setting: '',
      object: ''
    }));
  }, [genre]);
  
  // Fonction pour déterminer l'année/époque basée sur l'ère
  const determineYear = (era) => {
    const yearRanges = {
      ancient: 'Antiquité (3000 av. J.-C. - 476)',
      medieval: 'Époque médiévale (476-1492)',
      renaissance: 'Renaissance (1400-1600)',
      industrial: 'Révolution industrielle (1760-1840)',
      modern: 'Époque moderne (1900-présent)',
      future_near: 'Futur proche (2030-2100)',
      future_far: 'Futur lointain (après 2100)',
      alternate: 'Histoire alternative'
    };
    
    return yearRanges[era] || 'Époque indéterminée';
  };
  
  // Fonction pour ajouter un personnage
  const addCharacter = (isMain = false) => {
    const newCharacter = {
      id: `char-${Date.now()}`,
      name: '',
      age: 30,
      occupation: '',
      trait: '',
      goal: '',
      fear: '',
      backstory: '',
      isMain: isMain
    };
    
    if (isMain) {
      // Si c'est un personnage principal, remplacer l'ancien personnage principal
      const updatedCharacters = characters.map(char => ({
        ...char,
        isMain: false
      }));
      setCharacters([...updatedCharacters, newCharacter]);
    } else {
      setCharacters([...characters, newCharacter]);
    }
  };
  
  // Fonction pour mettre à jour un personnage
  const updateCharacter = (id, field, value) => {
    const updatedCharacters = characters.map(char => 
      char.id === id ? { ...char, [field]: value } : char
    );
    setCharacters(updatedCharacters);
  };
  
  // Fonction pour définir un personnage comme principal
  const setMainCharacter = (id) => {
    const updatedCharacters = characters.map(char => ({
      ...char,
      isMain: char.id === id
    }));
    setCharacters(updatedCharacters);
  };
  
  // Fonction pour supprimer un personnage
  const removeCharacter = (id) => {
    const updatedCharacters = characters.filter(char => char.id !== id);
    setCharacters(updatedCharacters);
  };
  
  // Fonction pour mettre à jour les paramètres de l'histoire
  const updateSettings = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Fonction pour mettre à jour les paramètres de complexité
  const updateComplexity = (field, value) => {
    setComplexity(prev => ({
      ...prev,
      [field]: parseInt(value)
    }));
  };
  
  // Fonction pour mettre à jour les paramètres avancés
  const updateAdvancedSettings = (field, value) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Afficher une notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Calculer le pourcentage de complexité globale
  const calculateComplexity = () => {
    return ((complexity.length + complexity.detail + complexity.twist) / 30) * 100;
  };
  
  // Obtenir un élément aléatoire d'un tableau
  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  // Fonction principale pour générer l'histoire
  const handleGenerateStory = () => {
    try {
      // Vérification de base
      if (characters.length === 0) {
        showNotification("Ajoutez au moins un personnage!", "error");
        return;
      }
      
      // Récupérer le personnage principal
      const mainCharacter = characters.find(char => char.isMain) || characters[0];
      
      // Récupérer les valeurs ou des valeurs par défaut
      const storyOptions = {
        genre,
        characters,
        mainCharacter,
        setting: settings.setting || getRandomElement(SETTINGS[genre] || SETTINGS.adventure),
        object: settings.object || getRandomElement(OBJECTS[genre] || OBJECTS.adventure),
        era: settings.era,
        plotType: settings.plotType,
        theme: settings.theme,
        length: complexity.length,
        detail: complexity.detail,
        twist: complexity.twist,
        pov: advancedSettings.pov,
        tone: advancedSettings.tone
      };
      
      // Afficher l'animation de chargement
      setIsLoading(true);
      
      // Simuler un délai pour l'effet de chargement
      setTimeout(() => {
        const result = generateStory(storyOptions);
        
        // Ajouter l'époque déterminée à partir de l'ère
        result.era = determineYear(settings.era);
        
        setGeneratedStory(result);
        setIsLoading(false);
        
        // Faire défiler jusqu'à l'histoire générée
        const storyOutput = document.getElementById('story-output');
        if (storyOutput) {
          storyOutput.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      showNotification(`Une erreur est survenue: ${error.message}`, "error");
      setIsLoading(false);
    }
  };

  // Genres disponibles
  const genres = [
    { id: 'fantasy', name: 'Fantasy', icon: 'magic', color: 'bg-purple-600 hover:bg-purple-700' },
    { id: 'scifi', name: 'Sci-Fi', icon: 'rocket', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'adventure', name: 'Aventure', icon: 'mountain', color: 'bg-amber-500 hover:bg-amber-600' },
    { id: 'mystery', name: 'Mystère', icon: 'magnifying-glass', color: 'bg-indigo-800 hover:bg-indigo-900' },
    { id: 'romance', name: 'Romance', icon: 'heart', color: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'horror', name: 'Horreur', icon: 'ghost', color: 'bg-gray-800 hover:bg-gray-900' },
    { id: 'comedy', name: 'Comédie', icon: 'face-laugh', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { id: 'historical', name: 'Historique', icon: 'landmark', color: 'bg-amber-800 hover:bg-amber-900' }
  ];

  // Obtenir la couleur du genre sélectionné
  const getGenreColor = () => {
    const selectedGenre = genres.find(g => g.id === genre) || genres[0];
    return selectedGenre.color.split(' ')[0]; // Retourne seulement la première classe de couleur
  };

  // Ères disponibles
  const eras = [
    { value: 'ancient', text: 'Antiquité' },
    { value: 'medieval', text: 'Médiéval' },
    { value: 'renaissance', text: 'Renaissance' },
    { value: 'industrial', text: 'Révolution industrielle' },
    { value: 'modern', text: 'Époque moderne' },
    { value: 'future_near', text: 'Futur proche' },
    { value: 'future_far', text: 'Futur lointain' },
    { value: 'alternate', text: 'Histoire alternative' }
  ];

  // Types d'intrigue disponibles
  const plotTypes = [
    { value: 'quest', text: 'Quête' },
    { value: 'conflict', text: 'Conflit' },
    { value: 'transformation', text: 'Transformation' },
    { value: 'mystery', text: 'Mystère' },
    { value: 'journey', text: 'Voyage' }
  ];

  // Thèmes disponibles
  const themes = [
    { value: 'redemption', text: 'Rédemption' },
    { value: 'love', text: 'Amour' },
    { value: 'power', text: 'Pouvoir' },
    { value: 'identity', text: 'Identité' },
    { value: 'survival', text: 'Survie' },
    { value: 'freedom', text: 'Liberté' },
    { value: 'justice', text: 'Justice' },
    { value: 'betrayal', text: 'Trahison' }
  ];

  // Points de vue disponibles
  const povs = [
    { value: 'first', text: 'Première personne' },
    { value: 'third_limited', text: 'Troisième personne limitée' },
    { value: 'third_omniscient', text: 'Troisième personne omnisciente' },
    { value: 'second', text: 'Deuxième personne' }
  ];

  // Tons disponibles
  const tones = [
    { value: 'serious', text: 'Sérieux' },
    { value: 'humorous', text: 'Humoristique' },
    { value: 'melancholic', text: 'Mélancolique' },
    { value: 'optimistic', text: 'Optimiste' },
    { value: 'dark', text: 'Sombre' },
    { value: 'whimsical', text: 'Fantaisiste' },
    { value: 'ironic', text: 'Ironique' },
    { value: 'nostalgic', text: 'Nostalgique' }
  ];

  // Fonction pour copier l'histoire dans le presse-papier
  const copyStoryToClipboard = () => {
    if (generatedStory) {
      navigator.clipboard.writeText(generatedStory.content.replace(/<\/?p>/g, '\n').replace(/<br\s*\/?>/g, '\n'))
        .then(() => {
          showNotification('Histoire copiée dans le presse-papier!', 'success');
        })
        .catch(() => {
          showNotification('Impossible de copier l\'histoire', 'error');
        });
    }
  };

  // Fonction pour imprimer l'histoire
  const printStory = () => {
    if (generatedStory) {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>Histoire générée</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap');
              body { font-family: 'Merriweather', serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.8; }
              .header { background-color: #f0f0f0; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
              h1 { margin-top: 0; font-family: 'Montserrat', sans-serif; color: #4338ca; }
              .meta { font-style: italic; color: #666; margin-bottom: 1rem; }
              .content { font-size: 1.1rem; }
              .content p:first-of-type::first-letter { font-size: 3em; float: left; line-height: 0.8; margin-right: 0.1em; color: #4338ca; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${generatedStory.title}</h1>
              <div class="meta">
                <div>Cadre: ${generatedStory.setting}</div>
                <div>Époque: ${generatedStory.era}</div>
              </div>
            </div>
            <div class="content">
              ${generatedStory.content}
            </div>
          </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      } else {
        showNotification('Impossible d\'ouvrir la fenêtre d\'impression', 'error');
      }
    }
  };

  // Fonction pour sauvegarder l'histoire
  const saveStory = () => {
    if (generatedStory) {
      const content = generatedStory.content.replace(/<\/?p>/g, '\n\n').replace(/<br\s*\/?>/g, '\n');
      const element = document.createElement('a');
      const file = new Blob([
        `${generatedStory.title}\n\n`,
        `Cadre: ${generatedStory.setting}\n`,
        `Époque: ${generatedStory.era}\n\n`,
        content
      ], {type: 'text/plain'});
      
      element.href = URL.createObjectURL(file);
      element.download = 'histoire-generee.txt';
      
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      showNotification('Histoire sauvegardée!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      {/* Navbar */}
      <nav className="bg-indigo-600 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fas fa-book-open text-2xl"></i>
            <span className="text-xl font-bold">StoryForge</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-indigo-100 transition-colors">Accueil</a>
            <a href="#" className="hover:text-indigo-100 transition-colors">Bibliothèque</a>
            <a href="#" className="hover:text-indigo-100 transition-colors">À propos</a>
          </div>
          <button className="md:hidden text-2xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Créez des histoires captivantes</h1>
            <p className="text-xl opacity-90">Libérez votre créativité avec notre générateur d'histoires intelligent qui s'adapte à vos préférences et personnages.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Sélection de genre */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition-all hover:shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Genre de l'histoire</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {genres.map(g => (
                <div 
                  key={g.id}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-transform transform hover:-translate-y-1 ${
                    genre === g.id 
                      ? 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 border-2 border-indigo-500 shadow-md' 
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                  }`}
                  onClick={() => setGenre(g.id)}
                >
                  <div className={`w-12 h-12 rounded-full ${g.color} flex items-center justify-center mb-2 text-white`}>
                    <i className={`fas fa-${g.icon} text-xl`}></i>
                  </div>
                  <span className="font-medium text-center">{g.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personnages */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition-all hover:shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Personnages</h2>
            
            {/* Liste des personnages */}
            <div className="space-y-4">
              {characters.map(character => (
                <div 
                  key={character.id} 
                  className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-5 ${character.isMain ? 'border-l-4 border-indigo-500' : ''}`}
                >
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="font-semibold flex items-center text-lg">
                      <i className="fas fa-user mr-2 text-indigo-500"></i>
                      {character.isMain ? 'Personnage principal' : 'Personnage'}
                    </h3>
                    <div>
                      {character.isMain ? (
                        <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-full flex items-center">
                          <i className="fas fa-star mr-1"></i> Principal
                        </span>
                      ) : (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setMainCharacter(character.id)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1 rounded-md transition-colors"
                          >
                            <i className="fas fa-star mr-1"></i> Principal
                          </button>
                          <button 
                            onClick={() => removeCharacter(character.id)}
                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md transition-colors"
                          >
                            <i className="fas fa-trash-alt mr-1"></i> Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                      <input
                        type="text"
                        value={character.name}
                        onChange={(e) => updateCharacter(character.id, 'name', e.target.value)}
                        placeholder="Nom du personnage"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Âge</label>
                      <input
                        type="number"
                        value={character.age}
                        onChange={(e) => updateCharacter(character.id, 'age', e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={character.occupation}
                        onChange={(e) => updateCharacter(character.id, 'occupation', e.target.value)}
                        placeholder="Métier ou rôle"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trait principal</label>
                      <input
                        type="text"
                        value={character.trait}
                        onChange={(e) => updateCharacter(character.id, 'trait', e.target.value)}
                        placeholder="Caractéristique principale"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objectif</label>
                      <input
                        type="text"
                        value={character.goal}
                        onChange={(e) => updateCharacter(character.id, 'goal', e.target.value)}
                        placeholder="Ce que cherche le personnage"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peur/Faiblesse</label>
                      <input
                        type="text"
                        value={character.fear}
                        onChange={(e) => updateCharacter(character.id, 'fear', e.target.value)}
                        placeholder="Ce que craint le personnage"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Histoire personnelle (optionnel)</label>
                      <textarea
                        value={character.backstory}
                        onChange={(e) => updateCharacter(character.id, 'backstory', e.target.value)}
                        placeholder="Quelques éléments sur le passé du personnage..."
                        rows="3"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bouton ajouter personnage */}
            <button 
              onClick={() => addCharacter(false)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <i className="fas fa-user-plus mr-2"></i> Ajouter un personnage
            </button>
          </div>
        </div>

        {/* Paramètres de l'histoire */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition-all hover:shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Paramètres de l'histoire</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cadre</label>
                <select
                  value={settings.setting}
                  onChange={(e) => updateSettings('setting', e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                >
                  <option value="">Choisir un cadre ou laisser aléatoire</option>
                  {(SETTINGS[genre] || SETTINGS.adventure).map((setting, index) => (
                    <option key={index} value={setting}>{setting}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objet clé</label>
                <select
                  value={settings.object}
                  onChange={(e) => updateSettings('object', e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                >
                  <option value="">Choisir un objet ou laisser aléatoire</option>
                  {(OBJECTS[genre] || OBJECTS.adventure).map((object, index) => (
                    <option key={index} value={object}>{object}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Époque</label>
                <select
                  value={settings.era}
                  onChange={(e) => updateSettings('era', e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                >
                  {eras.map(era => (
                    <option key={era.value} value={era.value}>{era.text}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type d'intrigue</label>
                <select
                  value={settings.plotType}
                  onChange={(e) => updateSettings('plotType', e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                >
                  {plotTypes.map(plotType => (
                    <option key={plotType.value} value={plotType.value}>{plotType.text}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thème principal</label>
                <select
                  value={settings.theme}
                  onChange={(e) => updateSettings('theme', e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                >
                  {themes.map(theme => (
                    <option key={theme.value} value={theme.value}>{theme.text}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Complexité */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition-all hover:shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">Complexité de l'histoire</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Longueur</label>
                  <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">{complexity.length}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={complexity.length}
                  onChange={(e) => updateComplexity('length', e.target.value)}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-md appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Niveau de détail</label>
                  <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">{complexity.detail}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={complexity.detail}
                  onChange={(e) => updateComplexity('detail', e.target.value)}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-md appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rebondissements</label>
                  <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">{complexity.twist}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={complexity.twist}
                  onChange={(e) => updateComplexity('twist', e.target.value)}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-md appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Complexité globale</label>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                  style={{ width: `${calculateComplexity()}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Paramètres avancés (collapsible) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition-all hover:shadow-lg">
          <div 
            className="p-6 cursor-pointer"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Paramètres avancés</h2>
              <button className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                <i className={`fas fa-chevron-${showAdvanced ? 'up' : 'down'} text-xl`}></i>
              </button>
            </div>
          </div>
          
          {showAdvanced && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Point de vue</label>
                  <select
                    value={advancedSettings.pov}
                    onChange={(e) => updateAdvancedSettings('pov', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                  >
                    {povs.map(pov => (
                      <option key={pov.value} value={pov.value}>{pov.text}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ton</label>
                  <select
                    value={advancedSettings.tone}
                    onChange={(e) => updateAdvancedSettings('tone', e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700"
                  >
                    {tones.map(tone => (
                      <option key={tone.value} value={tone.value}>{tone.text}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bouton de génération */}
        <div className="text-center my-10">
          <button 
            onClick={handleGenerateStory}
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Génération en cours...
              </span>
            ) : (
              <span className="flex items-center">
                Générer l'histoire <i className="fas fa-magic ml-2"></i>
              </span>
            )}
          </button>
        </div>

        {/* Histoire générée */}
        <div id="story-output">
          {generatedStory && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden mb-10 transform transition-all hover:shadow-2xl animate-fade-in">
              <div className={`bg-gradient-to-r from-${getGenreColor()} to-indigo-600 text-white p-6`}>
                <h3 className="text-2xl font-bold mb-2">{generatedStory.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm opacity-90">
                  <span className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-1"></i> {generatedStory.setting}
                  </span>
                  <span className="flex items-center">
                    <i className="fas fa-history mr-1"></i> {generatedStory.era}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 prose dark:prose-invert max-w-none prose-lg" dangerouslySetInnerHTML={{ __html: generatedStory.content }}></div>
              
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-center gap-3">
                <button 
                  onClick={copyStoryToClipboard}
                  className="inline-flex items-center px-4 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-md transition-colors"
                >
                  <i className="fas fa-copy mr-2"></i> Copier
                </button>
                <button 
                  onClick={printStory}
                  className="inline-flex items-center px-4 py-2 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white rounded-md transition-colors"
                >
                  <i className="fas fa-print mr-2"></i> Imprimer
                </button>
                <button 
                  onClick={saveStory}
                  className="inline-flex items-center px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-md transition-colors"
                >
                  <i className="fas fa-download mr-2"></i> Sauvegarder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">StoryForge</h3>
              <p className="text-gray-400">Créez des histoires uniques et captivantes en quelques clics.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Bibliothèque</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">À propos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Aide</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
            © 2023 StoryForge. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 py-2 px-4 rounded-md shadow-lg text-white ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 
          'bg-blue-500'
        } flex items-center z-50 animate-notification-enter`}>
          <i className={`fas fa-${
            notification.type === 'success' ? 'check-circle' : 
            notification.type === 'error' ? 'exclamation-circle' : 
            'info-circle'
          } mr-2`}></i>
          {notification.message}
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center max-w-md mx-4">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-600 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium text-gray-800 dark:text-gray-200">Génération de l'histoire en cours...</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">Un peu de patience, nous créons une histoire incroyable pour vous.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;