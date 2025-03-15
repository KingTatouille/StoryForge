// StoryGen - Moteur narratif cohérent
// Version 2.0

/**
 * Générateur d'histoires avancé avec une approche narrative cohérente
 * Cette version utilise un système de narration structuré plutôt que de simples templates
 */
class StoryGen {
  constructor() {
    this.worldElements = new Map();
    this.usedPhrases = new Set();
    this.storySegments = [];
    this.characterInfo = {};
  }

  /**
   * Génère une histoire complète basée sur les options fournies
   */
  generateStory(options) {
    // Initialisation de l'univers narratif
    this.initializeWorld(options);
    
    // Génération de la structure narrative en fonction du genre et de la complexité
    const narrative = this.createNarrativeStructure(options);

    // Construction de l'histoire section par section
    let storyText = this.constructStory(narrative, options);
    
    // Création du titre
    const title = this.createTitle(options);
    
    // Retourner l'histoire complète
    return {
      title: title,
      setting: options.setting,
      era: this.getEraDescription(options.era),
      content: storyText
    };
  }

  /**
   * Initialise l'univers narratif avec les éléments de base
   */
  initializeWorld(options) {
    // Réinitialiser les collections
    this.worldElements.clear();
    this.usedPhrases.clear();
    this.storySegments = [];
    
    // Extraire les informations du personnage principal
    const mainCharacter = options.characters.find(char => char.isMain) || options.characters[0];
    this.characterInfo = {
      name: mainCharacter.name || "le protagoniste",
      occupation: mainCharacter.occupation || "voyageur",
      trait: mainCharacter.trait || "déterminé",
      goal: mainCharacter.goal || "accomplir sa quête",
      fear: mainCharacter.fear || "l'échec",
      gender: this.determineGender(mainCharacter.name, mainCharacter)
    };
    
    // Ajouter les personnages secondaires
    this.supportingCharacters = options.characters
      .filter(char => !char.isMain)
      .map(char => ({
        name: char.name || "un compagnon",
        occupation: char.occupation || "allié",
        trait: char.trait || "loyal",
        goal: char.goal || "aider",
        fear: char.fear || "l'abandon",
        gender: this.determineGender(char.name, char),
        relationship: this.determineRelationship(mainCharacter, char)
      }));
    
    // Configurer le cadre et l'objet
    this.worldElements.set('setting', this.formatSetting(options.setting));
    this.worldElements.set('object', this.formatObject(options.object));
    
    // Générer les éléments spécifiques au genre
    this.generateGenreSpecificElements(options.genre);
  }

  /**
   * Détermine le genre grammatical du personnage (pour la conjugaison)
   */
  determineGender(name, character) {
    if (character.gender) return character.gender;
    
    // Liste de terminaisons typiquement féminines en français
    const femaleEndings = ['a', 'e', 'ie', 'ine', 'ette', 'elle', 'anne', 'enne', 'ise', 'iane'];
    // Exceptions notables masculines se terminant par 'e'
    const maleExceptions = ['alexandre', 'pierre', 'philippe', 'guillaume', 'maxime', 'jérôme'];
    
    // Vérifier si le nom est dans les exceptions masculines
    if (name && maleExceptions.some(exception => name.toLowerCase().includes(exception))) {
      return 'male';
    }
    
    // Vérifier les terminaisons féminines
    if (name && femaleEndings.some(ending => name.toLowerCase().endsWith(ending))) {
      return 'female';
    }
    
    // Par défaut, retourne masculin (convention grammaticale française)
    return 'male';
  }

  /**
   * Détermine la relation entre deux personnages
   */
  determineRelationship(mainChar, supportingChar) {
    const relationships = [
      'ami', 'mentor', 'rival', 'parent', 'frère', 'sœur',
      'guide', 'protégé', 'allié', 'connaissance', 'confident'
    ];
    
    return relationships[Math.floor(Math.random() * relationships.length)];
  }

  /**
   * Formate le cadre avec l'article approprié
   */
  formatSetting(setting) {
    if (!setting) return "un lieu mystérieux";
    
    // Si le cadre commence déjà par un article
    if (/^(un |une |le |la |les |l'|des )/i.test(setting)) {
      return setting;
    }
    
    // Liste d'exceptions
    const masculine = [
      'château', 'palais', 'village', 'désert', 'monde', 'royaume',
      'pays', 'temple', 'manoir', 'univers', 'continent', 'océan'
    ];
    
    const feminine = [
      'forêt', 'ville', 'maison', 'île', 'planète', 'montagne',
      'vallée', 'région', 'contrée', 'demeure', 'cité', 'dimension'
    ];
    
    // Vérifier le genre du cadre
    if (masculine.some(word => setting.toLowerCase().includes(word))) {
      return `un ${setting}`;
    } else if (feminine.some(word => setting.toLowerCase().includes(word))) {
      return `une ${setting}`;
    }
    
    // Par défaut
    return `un ${setting}`;
  }

  /**
   * Formate l'objet avec l'article approprié
   */
  formatObject(object) {
    if (!object) return "un objet mystérieux";
    
    // Si l'objet commence déjà par un article
    if (/^(un |une |le |la |les |l'|des )/i.test(object)) {
      return object;
    }
    
    // Liste d'exceptions
    const masculine = [
      'grimoire', 'livre', 'sceptre', 'anneau', 'médaillon', 'artefact',
      'cristal', 'talisman', 'journal', 'bâton', 'glaive', 'codex'
    ];
    
    const feminine = [
      'épée', 'amulette', 'clé', 'relique', 'carte', 'pierre',
      'couronne', 'dague', 'potion', 'lance', 'boussole', 'gemme'
    ];
    
    // Vérifier le genre de l'objet
    if (masculine.some(word => object.toLowerCase().includes(word))) {
      return `un ${object}`;
    } else if (feminine.some(word => object.toLowerCase().includes(word))) {
      return `une ${object}`;
    }
    
    // Par défaut
    return `un ${object}`;
  }

  /**
   * Génère des éléments narratifs spécifiques au genre littéraire
   */
  generateGenreSpecificElements(genre) {
    switch(genre) {
      case 'fantasy':
        this.worldElements.set('creatures', this.selectRandomItems([
          'dragons', 'elfes', 'nains', 'orcs', 'gobelins', 'fées', 'trolls',
          'licornes', 'griffons', 'mages', 'sorciers', 'spectres'
        ], 2));
        
        this.worldElements.set('magicSystem', this.selectRandomItems([
          'la magie des éléments', 'la sorcellerie ancienne', 'les runes de pouvoir',
          'la force vitale', 'les enchantements célestes', 'la nécromancie',
          'la magie du sang', 'les arts mystiques'
        ], 1)[0]);
        
        this.worldElements.set('conflict', this.selectRandomItems([
          'une prophétie oubliée', 'un mal ancien qui s\'éveille', 'une guerre entre royaumes',
          'une quête pour restaurer l\'équilibre', 'une malédiction à briser',
          'un artefact de pouvoir convoité', 'une menace venue d\'un autre monde'
        ], 1)[0]);
        break;
        
      case 'scifi':
        this.worldElements.set('technology', this.selectRandomItems([
          'voyages interstellaires', 'intelligence artificielle', 'téléportation',
          'réalité virtuelle', 'nanites', 'modification génétique', 'cyborgs',
          'terraformation', 'voyages temporels'
        ], 2));
        
        this.worldElements.set('threat', this.selectRandomItems([
          'une espèce extraterrestre hostile', 'une IA devenue consciente',
          'un virus biotechnologique', 'une corporation sans scrupules',
          'une catastrophe environnementale', 'une anomalie spatio-temporelle',
          'une dictature technocratique'
        ], 1)[0]);
        break;
        
      case 'adventure':
        this.worldElements.set('locations', this.selectRandomItems([
          'ruines mystérieuses', 'cités perdues', 'îles inexplorées',
          'temples oubliés', 'grottes secrètes', 'jungles impénétrables',
          'montagnes escarpées', 'déserts impitoyables'
        ], 2));
        
        this.worldElements.set('objective', this.selectRandomItems([
          'un trésor légendaire', 'une civilisation perdue', 'un remède miraculeux',
          'un artéfact historique', 'une carte vers un lieu mythique',
          'des connaissances anciennes', 'un passage secret'
        ], 1)[0]);
        break;
        
      case 'mystery':
        this.worldElements.set('crime', this.selectRandomItems([
          'un meurtre inexpliqué', 'une disparition mystérieuse', 'un vol impossible',
          'une série d\'événements troublants', 'un secret de famille',
          'une conspiration', 'une menace voilée'
        ], 1)[0]);
        
        this.worldElements.set('clues', this.selectRandomItems([
          'une lettre cryptique', 'un témoin peu fiable', 'des empreintes étranges',
          'un objet hors de sa place', 'un comportement suspect',
          'un indice caché en plain vue', 'une coïncidence troublante'
        ], 2));
        break;
        
      // Autres genres...
      default:
        // Éléments génériques pour tout type d'histoire
        this.worldElements.set('challenges', this.selectRandomItems([
          'obstacles imprévus', 'adversaires déterminés', 'conditions difficiles',
          'pièges mortels', 'dilemmes moraux', 'conflits internes',
          'trahisons inattendues', 'échéances pressantes'
        ], 2));
    }
  }

  /**
   * Sélectionne aléatoirement plusieurs éléments d'un tableau
   */
  selectRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Crée la structure narrative complète de l'histoire
   */
  createNarrativeStructure(options) {
    const { genre, complexity, theme, plotType } = options;
    
    // Déterminer la longueur de l'histoire en fonction de la complexité
    const storyLength = (complexity && complexity.length) ? complexity.length : 5;
    const sectionCount = Math.max(3, Math.min(12, storyLength * 2));
    
    // Structure narrative de base
    const structure = {
      introduction: {
        required: true,
        weight: 1,
        subtypes: ['setting_introduction', 'character_introduction', 'mystery_introduction']
      },
      
      development: {
        required: true,
        weight: Math.max(1, storyLength - 2),
        subtypes: ['challenge_encounter', 'plot_development', 'character_development', 'world_building']
      },
      
      climax: {
        required: true,
        weight: 1,
        subtypes: ['confrontation', 'revelation', 'decision', 'sacrifice']
      },
      
      resolution: {
        required: true,
        weight: 1,
        subtypes: ['aftermath', 'reflection', 'new_beginning', 'circular_ending']
      }
    };
    
    // Génération de la séquence narrative
    const narrativeSequence = [];
    
    // Toujours commencer par l'introduction
    narrativeSequence.push({
      type: 'introduction',
      subtype: this.selectRandomItems(structure.introduction.subtypes, 1)[0]
    });
    
    // Générer les sections de développement en fonction de la longueur désirée
    const developmentCount = structure.development.weight;
    for (let i = 0; i < developmentCount; i++) {
      // Éviter les répétitions de subtypes consécutifs
      let availableSubtypes = [...structure.development.subtypes];
      if (i > 0 && narrativeSequence.length > 0) {
        const lastSubtype = narrativeSequence[narrativeSequence.length - 1].subtype;
        availableSubtypes = availableSubtypes.filter(subtype => subtype !== lastSubtype);
      }
      
      narrativeSequence.push({
        type: 'development',
        subtype: this.selectRandomItems(availableSubtypes, 1)[0]
      });
    }
    
    // Ajouter le climax
    narrativeSequence.push({
      type: 'climax',
      subtype: this.selectRandomItems(structure.climax.subtypes, 1)[0]
    });
    
    // Terminer par la résolution
    narrativeSequence.push({
      type: 'resolution',
      subtype: this.selectRandomItems(structure.resolution.subtypes, 1)[0]
    });
    
    // Enrichir chaque section avec des détails spécifiques au genre et au thème
    return narrativeSequence.map(section => this.enrichSection(section, options));
  }

  /**
   * Enrichit une section narrative avec des détails spécifiques
   */
  enrichSection(section, options) {
    const { genre, theme, plotType } = options;
    
    // Ajouter des éléments spécifiques selon le genre et le type de section
    const enrichedSection = { ...section, details: {} };
    
    // Détails communs à toutes les sections
    enrichedSection.details.tone = this.getToneForSection(section.type, options);
    enrichedSection.details.pacing = this.getPacingForSection(section.type);
    
    // Détails spécifiques selon le type de section
    switch(section.type) {
      case 'introduction':
        enrichedSection.details.focusCharacter = this.characterInfo.name;
        enrichedSection.details.setting = this.worldElements.get('setting');
        enrichedSection.details.mood = this.getMoodForGenre(genre);
        
        if (section.subtype === 'mystery_introduction') {
          enrichedSection.details.enigma = this.getEnigmaForGenre(genre);
        }
        break;
        
      case 'development':
        // Ajouter des obstacles appropriés
        const obstacles = this.getObstaclesForGenre(genre);
        enrichedSection.details.obstacle = this.selectRandomItems(obstacles, 1)[0];
        
        if (section.subtype === 'character_development') {
          enrichedSection.details.emotionalJourney = this.getEmotionalJourneyForTheme(theme);
        }
        break;
        
      case 'climax':
        enrichedSection.details.tension = 'maximale';
        enrichedSection.details.setting = this.getClimaticLocationForGenre(genre);
        
        if (section.subtype === 'confrontation') {
          enrichedSection.details.antagonist = this.getAntagonistForGenre(genre);
        } else if (section.subtype === 'revelation') {
          enrichedSection.details.twist = this.getTwistForGenre(genre);
        }
        break;
        
      case 'resolution':
        enrichedSection.details.outcome = this.getOutcomeForTheme(theme);
        enrichedSection.details.mood = this.getResolutionMoodForPlotType(plotType);
        break;
    }
    
    return enrichedSection;
  }

  /**
   * Détermine le ton narratif d'une section
   */
  getToneForSection(sectionType, options) {
    // Utiliser le ton spécifié dans les options s'il existe
    if (options.tone) {
      return options.tone;
    }
    
    // Sinon, déterminer un ton approprié selon le type de section
    switch(sectionType) {
      case 'introduction': return 'descriptif';
      case 'development': return 'dynamique';
      case 'climax': return 'intense';
      case 'resolution': return 'réflexif';
      default: return 'neutre';
    }
  }

  /**
   * Détermine le rythme narratif d'une section
   */
  getPacingForSection(sectionType) {
    switch(sectionType) {
      case 'introduction': return 'lent';
      case 'development': return 'modéré';
      case 'climax': return 'rapide';
      case 'resolution': return 'décroissant';
      default: return 'équilibré';
    }
  }

  /**
   * Détermine l'ambiance en fonction du genre
   */
  getMoodForGenre(genre) {
    const moodsByGenre = {
      'fantasy': ['mystérieuse', 'enchantée', 'majestueuse', 'légendaire'],
      'scifi': ['futuriste', 'technologique', 'étrangère', 'clinique'],
      'adventure': ['exotique', 'sauvage', 'dangereuse', 'inexplorée'],
      'mystery': ['brumeuse', 'inquiétante', 'intrigante', 'oppressante'],
      'horror': ['terrifiante', 'angoissante', 'malsaine', 'sinistre'],
      'romance': ['intime', 'chaleureuse', 'émotionnelle', 'passionnée']
    };
    
    const moods = moodsByGenre[genre] || ['intrigante', 'particulière', 'unique'];
    return this.selectRandomItems(moods, 1)[0];
  }

  /**
   * Génère une énigme appropriée au genre
   */
  getEnigmaForGenre(genre) {
    const enigmasByGenre = {
      'fantasy': [
        'une prophétie ancestrale qui semble désigner le protagoniste',
        'des symboles mystiques apparus dans le ciel',
        'la disparition soudaine de toute magie dans une région',
        'un artefact ancien qui s\'éveille après des siècles de sommeil'
      ],
      'scifi': [
        'un signal extraterrestre inexplicable',
        'une anomalie temporelle qui perturbe la réalité',
        'la découverte d\'une technologie impossible',
        'la disparition inexpliquée de toute une colonie'
      ],
      'mystery': [
        'un crime apparemment impossible',
        'la disparition d\'une personne importante sans laisser de traces',
        'un message codé trouvé sur la scène',
        'une série d\'incidents qui semblent reliés par un motif invisible'
      ],
      'adventure': [
        'une carte ancienne révélant l\'emplacement d\'un trésor légendaire',
        'des ruines inexplorées qui défient toute explication',
        'un phénomène naturel jamais documenté',
        'la découverte d\'une espèce inconnue'
      ]
    };
    
    const enigmas = enigmasByGenre[genre] || [
      'un mystère qui défie toute explication',
      'une série d\'événements troublants',
      'une question sans réponse évidente',
      'un phénomène inexpliqué qui intrigue tous les témoins'
    ];
    
    return this.selectRandomItems(enigmas, 1)[0];
  }

  /**
   * Génère des obstacles appropriés au genre
   */
  getObstaclesForGenre(genre) {
    const obstaclesByGenre = {
      'fantasy': [
        'un gardien magique protégeant un passage secret',
        'une barrière mystique infranchissable',
        'une créature légendaire hostile',
        'un sortilège complexe à déchiffrer',
        'une épreuve imposée par une entité puissante'
      ],
      'scifi': [
        'un dysfonctionnement critique des systèmes',
        'une intelligence artificielle devenue hostile',
        'une radiation mortelle bloquant la progression',
        'un champ de force de technologie inconnue',
        'une distorsion spatio-temporelle dangereuse'
      ],
      'adventure': [
        'un terrain particulièrement périlleux',
        'des conditions météorologiques extrêmes',
        'une tribu hostile contrôlant le seul passage',
        'une série de pièges mécaniques ingénieux',
        'une énigme géographique déroutante'
      ],
      'mystery': [
        'un témoin clé qui refuse de parler',
        'une piste qui mène délibérément dans la mauvaise direction',
        'un indice crucial qui semble contredire tous les autres',
        'une autorité qui entrave l\'enquête',
        'un suspect avec un alibi apparemment parfait'
      ]
    };
    
    const obstacles = obstaclesByGenre[genre] || [
      'un adversaire déterminé à faire échouer le protagoniste',
      'un obstacle naturel imposant',
      'un dilemme moral complexe',
      'une situation qui met à l\'épreuve la plus grande peur du protagoniste',
      'une limitation de temps critique'
    ];
    
    return obstacles;
  }

  /**
   * Détermine un parcours émotionnel en fonction du thème
   */
  getEmotionalJourneyForTheme(theme) {
    const journeysByTheme = {
      'redemption': 'de la culpabilité vers le pardon',
      'love': 'de la solitude vers la connexion',
      'power': 'de l\'impuissance vers la maîtrise',
      'identity': 'du doute vers la connaissance de soi',
      'survival': 'de la peur vers le courage',
      'freedom': 'de l\'oppression vers la libération',
      'justice': 'de l\'injustice vers l\'équilibre',
      'betrayal': 'de la confiance vers la méfiance puis la résilience'
    };
    
    return journeysByTheme[theme] || 'de l\'incertitude vers la détermination';
  }

  /**
   * Détermine un lieu approprié pour le climax selon le genre
   */
  getClimaticLocationForGenre(genre) {
    const locationsByGenre = {
      'fantasy': [
        'un temple ancien aux pouvoirs mystiques',
        'le sommet d\'une montagne sacrée',
        'une clairière entourée de menhirs millénaires',
        'la salle du trône d\'un château enchanté',
        'les profondeurs d\'une forêt magique'
      ],
      'scifi': [
        'le cœur du vaisseau-mère alien',
        'le centre de contrôle d\'une station spatiale',
        'un laboratoire de haute sécurité',
        'une planète à l\'atmosphère hostile',
        'une matrice virtuelle instable'
      ],
      'adventure': [
        'les ruines d\'une civilisation perdue',
        'une grotte cachée derrière une cascade',
        'le sommet d\'une montagne inexplorée',
        'une île au milieu d\'une mer démontée',
        'un temple englouti refaisant surface'
      ],
      'mystery': [
        'la scène originelle du crime revisitée',
        'un lieu secret où tous les suspects sont réunis',
        'une pièce cachée contenant la vérité',
        'un endroit significatif lié au mobile du coupable',
        'un lieu symbolique où le puzzle s\'assemble enfin'
      ]
    };
    
    const locations = locationsByGenre[genre] || [
      'un lieu chargé de signification symbolique',
      'un endroit qui représente le point culminant du voyage',
      'un site qui met en évidence le conflit central',
      'un espace qui condense tous les enjeux de l\'histoire'
    ];
    
    return this.selectRandomItems(locations, 1)[0];
  }

  /**
   * Génère un antagoniste approprié au genre
   */
  getAntagonistForGenre(genre) {
    const antagonistsByGenre = {
      'fantasy': [
        'un sorcier corrompu par un pouvoir interdit',
        'un roi-démon cherchant à envahir le monde mortel',
        'un dragon ancien gardien d\'un trésor légendaire',
        'un usurpateur ayant volé le trône légitime',
        'une entité primordiale cherchant à défaire la création'
      ],
      'scifi': [
        'une intelligence artificielle devenue consciente et hostile',
        'un dirigeant totalitaire utilisant la technologie pour contrôler la population',
        'une espèce extraterrestre aux intentions incompréhensibles',
        'un scientifique prêt à sacrifier l\'humanité au nom du progrès',
        'une corporation exploitant sans scrupules des ressources vitales'
      ],
      'adventure': [
        'un explorateur rival sans scrupules',
        'un chef mercenaire traquant le protagoniste',
        'un ancien allié transformé en ennemi par la cupidité',
        'un seigneur local tyrannique',
        'un phénomène naturel d\'une puissance dévastatrice'
      ],
      'mystery': [
        'l\'instigateur d\'un complot complexe',
        'un criminel méthodique aux motivations obscures',
        'une figure d\'autorité dissimulant la vérité',
        'un meurtrier caché parmi les alliés apparents',
        'un manipulateur brillant tirant les ficelles dans l\'ombre'
      ]
    };
    
    const antagonists = antagonistsByGenre[genre] || [
      'un adversaire qui représente l\'antithèse des valeurs du héros',
      'un ennemi possédant ce que le protagoniste désire le plus',
      'un opposant qui exploite la plus grande faiblesse du héros',
      'un rival partageant un passé complexe avec le protagoniste'
    ];
    
    return this.selectRandomItems(antagonists, 1)[0];
  }

  /**
   * Génère un rebondissement approprié au genre
   */
  getTwistForGenre(genre) {
    const twistsByGenre = {
      'fantasy': [
        'la prophétie a été mal interprétée depuis le début',
        'l\'objet magique recherché a un tout autre usage que celui imaginé',
        'l\'ennemi juré s\'avère être un allié sous une malédiction',
        'le mentor bienveillant était en réalité l\'architecte de tous les malheurs',
        'le protagoniste découvre qu\'il est lié par le sang à son pire ennemi'
      ],
      'scifi': [
        'la réalité entière s\'avère être une simulation',
        'le protagoniste découvre qu\'il est lui-même un androïde',
        'la mission de sauvetage était en fait une opération d\'extermination',
        'l\'ennemi alien cherchait en réalité à sauver l\'humanité d\'elle-même',
        'le voyage ne s\'est pas fait dans l\'espace mais dans le temps'
      ],
      'mystery': [
        'le coupable est celui qui a engagé le détective',
        'la victime était en réalité l\'instigateur du crime',
        'le crime apparent cache un mystère bien plus profond',
        'tous les indices pointaient vers la mauvaise personne intentionnellement',
        'le crime résout en fait une injustice plus ancienne'
      ],
      'adventure': [
        'le trésor recherché n\'a aucune valeur matérielle mais un pouvoir symbolique',
        'l\'expédition était basée sur une carte délibérément falsifiée',
        'le lieu de destination existe bien mais dans une autre dimension',
        'le véritable objectif de la quête n\'était pas la destination mais les épreuves du voyage',
        'le commanditaire de l\'expédition avait des motivations cachées'
      ]
    };
    
    const twists = twistsByGenre[genre] || [
      'une révélation qui remet en question toutes les certitudes établies',
      'une vérité cachée qui transforme la compréhension de toute l\'histoire',
      'un secret qui change la nature même de la quête du protagoniste',
      'une découverte qui inverse les rôles apparents de héros et de vilain'
    ];
    
    return this.selectRandomItems(twists, 1)[0];
  }

  /**
   * Détermine le dénouement en fonction du thème
   */
  getOutcomeForTheme(theme) {
    const outcomesByTheme = {
      'redemption': 'le pardon est obtenu mais à un prix élevé',
      'love': 'l\'amour triomphe des obstacles mais transforme ceux qui l\'éprouvent',
      'power': 'le pouvoir est acquis mais sa nature véritable est comprise',
      'identity': 'l\'identité est affirmée à travers les épreuves traversées',
      'survival': 'la survie est assurée mais laisse des cicatrices indélébiles',
      'freedom': 'la liberté est conquise mais avec la responsabilité qu\'elle implique',
      'justice': 'la justice est rendue mais révèle sa nature complexe et imparfaite',
      'betrayal': 'la trahison est surmontée et mène à une force nouvelle'
    };
    
    return outcomesByTheme[theme] || 'l\'objectif est atteint mais transforme profondément le protagoniste';
  }

  /**
   * Détermine l'ambiance de la résolution selon le type d'intrigue
   */
  getResolutionMoodForPlotType(plotType) {
    const moodsByPlotType = {
      'quest': 'accomplissement mêlé de nostalgie du voyage',
      'conflict': 'apaisement après la tempête',
      'transformation': 'acceptation du changement intérieur',
      'mystery': 'clarté nouvelle mais questions persistantes',
      'journey': 'retour transformé par l\'aventure'
    };
    
    return moodsByPlotType[plotType] || 'sentiment d\'achèvement nuancé par la transformation vécue';
  }

  /**
   * Construit l'histoire à partir de la structure narrative
   */
  constructStory(narrativeSequence, options) {
    // Initialiser le texte de l'histoire
    let storyText = '';
    
    // Générer chaque section de l'histoire
    narrativeSequence.forEach((section, index) => {
      // Créer un segment de texte pour cette section
      const sectionText = this.generateSectionText(section, options, index);
      
      // Ajouter au texte de l'histoire
      storyText += `<p>${sectionText}</p>\n\n`;
      
      // Ajouter des transitions entre sections majeures
      if (index < narrativeSequence.length - 1 && 
          section.type !== narrativeSequence[index + 1].type) {
        storyText += `<p>${this.createTransition(section.type, narrativeSequence[index + 1].type)}</p>\n\n`;
      }
    });
    
    return storyText;
  }

  /**
   * Génère le texte pour une section narrative spécifique
   */
  generateSectionText(section, options, sectionIndex) {
    // Extraction des données pour la génération
    const { type, subtype, details } = section;
    const mainChar = this.characterInfo;
    
    // Collection de phrases pour ce type de section
    let phrases = [];
    
    // Structure des phrases selon le type de section
    switch(type) {
      case 'introduction':
        phrases = this.getIntroductionPhrases(subtype, details, options);
        break;
        
      case 'development':
        phrases = this.getDevelopmentPhrases(subtype, details, options, sectionIndex);
        break;
        
      case 'climax':
        phrases = this.getClimaxPhrases(subtype, details, options);
        break;
        
      case 'resolution':
        phrases = this.getResolutionPhrases(subtype, details, options);
        break;
        
      default:
        phrases = ["L'histoire se poursuivit avec des événements inattendus."];
    }
    
    // Sélectionner une phrase non utilisée précédemment si possible
    let selectedPhrase = this.selectUnusedPhrase(phrases);
    
    // Remplacer les variables dans la phrase par les valeurs appropriées
    selectedPhrase = this.replacePlaceholders(selectedPhrase, options);
    
    return selectedPhrase;
  }

  /**
   * Sélectionne une phrase non utilisée précédemment
   */
  selectUnusedPhrase(phrases) {
    // Filtrer les phrases déjà utilisées
    const unusedPhrases = phrases.filter(phrase => !this.usedPhrases.has(phrase));
    
    // S'il reste des phrases non utilisées, en choisir une
    if (unusedPhrases.length > 0) {
      const selected = unusedPhrases[Math.floor(Math.random() * unusedPhrases.length)];
      this.usedPhrases.add(selected);
      return selected;
    }
    
    // Sinon, choisir parmi toutes les phrases
    const selected = phrases[Math.floor(Math.random() * phrases.length)];
    return selected;
  }

  /**
   * Remplace les placeholders dans le texte par les valeurs réelles
   */
  replacePlaceholders(text, options) {
    // Remplacer les références au personnage principal
    text = text.replace(/\{protagonist\}/g, this.characterInfo.name);
    text = text.replace(/\{protagonist_trait\}/g, this.characterInfo.trait);
    text = text.replace(/\{protagonist_goal\}/g, this.characterInfo.goal);
    text = text.replace(/\{protagonist_fear\}/g, this.characterInfo.fear);
    text = text.replace(/\{protagonist_occupation\}/g, this.characterInfo.occupation);
    
    // Remplacer les références au cadre et à l'objet
    text = text.replace(/\{setting\}/g, this.worldElements.get('setting'));
    text = text.replace(/\{object\}/g, this.worldElements.get('object'));
    
    // Remplacer les éléments spécifiques au genre
    for (const [key, value] of this.worldElements.entries()) {
      if (Array.isArray(value)) {
        // Si c'est un tableau, remplacer par une liste formatée
        const formattedList = this.formatList(value);
        text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), formattedList);
      } else {
        // Sinon, remplacer directement
        text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
      }
    }
    
    // Vérifier s'il reste des placeholders non remplacés
    const remainingPlaceholders = text.match(/\{([^}]+)\}/g);
    if (remainingPlaceholders) {
      // Remplacer les placeholders restants par des valeurs génériques
      remainingPlaceholders.forEach(placeholder => {
        const cleanPlaceholder = placeholder.replace(/[{}]/g, '');
        const replacement = this.getGenericReplacement(cleanPlaceholder);
        text = text.replace(placeholder, replacement);
      });
    }
    
    return text;
  }

  /**
   * Formate un tableau en liste textuelle
   */
  formatList(array) {
    if (!array || array.length === 0) return '';
    
    if (array.length === 1) return array[0];
    
    if (array.length === 2) return `${array[0]} et ${array[1]}`;
    
    return array.slice(0, -1).join(', ') + ' et ' + array[array.length - 1];
  }

  /**
   * Génère une valeur de remplacement générique pour un placeholder
   */
  getGenericReplacement(placeholder) {
    // Dictionnaire de valeurs génériques pour différents types de placeholders
    const genericReplacements = {
      'antagonist': 'un adversaire redoutable',
      'ally': 'un allié inattendu',
      'challenge': 'un défi considérable',
      'revelation': 'une vérité surprenante',
      'location': 'un lieu significatif',
      'action': 'une action décisive',
      'emotion': 'un sentiment profond',
      'decision': 'un choix crucial',
      'consequence': 'une conséquence inattendue',
      'obstacle': 'un obstacle imposant',
      'discovery': 'une découverte importante',
      'conflict': 'un conflit intense',
      'solution': 'une solution ingénieuse',
      'reward': 'une récompense méritée',
      'loss': 'une perte douloureuse',
      'transformation': 'une transformation profonde'
    };
    
    // Analyser le placeholder pour trouver des correspondances partielles
    for (const [key, value] of Object.entries(genericReplacements)) {
      if (placeholder.includes(key)) {
        return value;
      }
    }
    
    // Valeur par défaut si aucune correspondance n'est trouvée
    return 'cet élément';
  }

  /**
   * Obtient les phrases d'introduction selon le sous-type
   */
  getIntroductionPhrases(subtype, details, options) {
    const { setting } = details;
    const protagonist = this.characterInfo.name;
    
    // Phrases communes à tous les sous-types d'introduction
    const commonPhrases = [
      `Dans {setting}, {protagonist} se retrouva face à un destin qu'il n'aurait jamais imaginé.`,
      `L'histoire commence au cœur de {setting}, où {protagonist}, {protagonist_trait} {protagonist_occupation}, cherchait à {protagonist_goal}.`,
      `{setting} cachait bien des secrets, comme {protagonist} allait bientôt le découvrir.`
    ];
    
    // Phrases spécifiques au sous-type
    let specificPhrases = [];
    
    switch(subtype) {
      case 'setting_introduction':
        specificPhrases = [
          `{setting} s'étendait majestueusement sous un ciel {mood}, tandis que {protagonist} contemplait l'horizon avec détermination.`,
          `Les légendes de {setting} parlaient de {object}, mais {protagonist} n'aurait jamais imaginé s'y retrouver confronté.`,
          `Le vent murmurait d'étranges mélodies à travers {setting}, comme pour avertir {protagonist} des défis à venir.`,
          `{setting} n'avait pas toujours été ainsi ; les anciens racontaient qu'autrefois, avant {conflict}, ce lieu était tout autre.`
        ];
        break;
        
      case 'character_introduction':
        specificPhrases = [
          `{protagonist}, {protagonist_trait} {protagonist_occupation} dont la réputation n'était plus à faire, arriva à {setting} avec un objectif précis : {protagonist_goal}.`,
          `Depuis que {protagonist} avait découvert {protagonist_fear}, sa vie avait pris un tournant inattendu qui l'avait mené jusqu'à {setting}.`,
          `Ce qui distinguait {protagonist} des autres {protagonist_occupation}s, ce n'était pas tant {protagonist_trait}, mais plutôt sa détermination à {protagonist_goal} malgré tous les obstacles.`,
          `Personne à {setting} ne connaissait encore {protagonist}, mais cela allait bientôt changer de façon spectaculaire.`
        ];
        break;
        
      case 'mystery_introduction':
        specificPhrases = [
          `Tout commença lorsque {protagonist} découvrit {enigma} au cœur de {setting}, un mystère qui allait bouleverser toutes ses certitudes.`,
          `{enigma} - ces mots résonnaient dans l'esprit de {protagonist} alors qu'il explorait les recoins de {setting}.`,
          `La rumeur qui avait attiré {protagonist} jusqu'à {setting} concernait {enigma}, une énigme que personne n'avait réussi à résoudre.`,
          `Ce fut en cherchant {object} que {protagonist} tomba par hasard sur {enigma}, déclenchant une série d'événements qui dépassaient l'entendement.`
        ];
        break;
    }
    
    // Combiner les phrases communes et spécifiques
    return [...specificPhrases, ...commonPhrases];
  }

  /**
   * Obtient les phrases de développement selon le sous-type
   */
  getDevelopmentPhrases(subtype, details, options, sectionIndex) {
    const { obstacle } = details;
    const protagonist = this.characterInfo.name;
    
    // Phrases communes à tous les sous-types de développement
    const commonPhrases = [
      `Le chemin de {protagonist} s'avérait plus complexe qu'il ne l'avait initialement imaginé.`,
      `Face à {obstacle}, {protagonist} dut faire appel à toutes ses ressources.`,
      `Cette épreuve allait mettre à l'épreuve la détermination de {protagonist} comme jamais auparavant.`
    ];
    
    // Phrases spécifiques au sous-type
    let specificPhrases = [];
    
    switch(subtype) {
      case 'challenge_encounter':
        specificPhrases = [
          `{protagonist} se retrouva confronté à {obstacle}, un défi qui semblait insurmontable à première vue.`,
          `Ce fut alors qu'apparut {obstacle}, se dressant entre {protagonist} et son objectif avec une détermination égale à la sienne.`,
          `{obstacle} n'était pas un obstacle que {protagonist} avait anticipé, ce qui rendait la situation d'autant plus périlleuse.`,
          `La présence inattendue de {obstacle} força {protagonist} à reconsidérer sa stratégie initiale.`
        ];
        break;
        
      case 'plot_development':
        specificPhrases = [
          `Une révélation inattendue vint bouleverser les plans de {protagonist} : {conflict} n'était que la partie visible d'un dessein bien plus vaste.`,
          `Plus {protagonist} progressait, plus il devenait évident que {object} cachait un secret bien plus important que quiconque ne l'avait soupçonné.`,
          `Les indices s'assemblaient peu à peu, révélant à {protagonist} une vérité troublante sur {setting} et son histoire oubliée.`,
          `Ce qui avait commencé comme une simple quête pour {protagonist_goal} prenait désormais une dimension que {protagonist} n'aurait jamais imaginée.`
        ];
        break;
        
      case 'character_development':
        specificPhrases = [
          `Face à {obstacle}, {protagonist} sentit quelque chose changer en lui, comme si cette épreuve révélait une facette inconnue de sa personnalité.`,
          `Pour la première fois, {protagonist} dut confronter {protagonist_fear}, une peur qui l'avait toujours habité mais qu'il avait jusqu'alors réussi à éviter.`,
          `Le voyage de {protagonist} prenait une tournure inattendue : {emotionalJourney}.`,
          `Dans un moment de calme au milieu de la tempête, {protagonist} réfléchit à son parcours et réalisa à quel point il avait déjà changé.`
        ];
        break;
        
      case 'world_building':
        specificPhrases = [
          `Les anciennes légendes de {setting} prenaient vie sous les yeux de {protagonist}, révélant un monde bien plus complexe qu'il n'y paraissait.`,
          `{protagonist} découvrit que {setting} cachait une histoire oubliée, étroitement liée à {object} et aux mystères qui l'entouraient.`,
          `À mesure que {protagonist} explorait {setting}, le voile se levait sur des vérités ancestrales que le temps avait tenté d'effacer.`,
          `{setting} n'était pas simplement un lieu; c'était un témoignage vivant d'une époque révolue dont {protagonist} commençait à peine à saisir l'importance.`
        ];
        break;
    }
    
    // Combiner les phrases communes et spécifiques
    return [...specificPhrases, ...commonPhrases];
  }

  /**
   * Obtient les phrases de climax selon le sous-type
   */
  getClimaxPhrases(subtype, details, options) {
    const { setting, antagonist, twist } = details;
    const protagonist = this.characterInfo.name;
    
    // Phrases communes à tous les sous-types de climax
    const commonPhrases = [
      `Le moment de vérité était arrivé pour {protagonist}.`,
      `Tout convergeait vers cet instant crucial où le destin de tout serait décidé.`,
      `{protagonist} savait que tout ce qui s'était passé jusqu'à présent n'était qu'un prélude à cette confrontation décisive.`
    ];
    
    // Phrases spécifiques au sous-type
    let specificPhrases = [];
    
    switch(subtype) {
      case 'confrontation':
        specificPhrases = [
          `Au cœur de {setting}, {protagonist} fit face à {antagonist} dans un affrontement dont l'issue déterminerait bien plus que leur propre destin.`,
          `{antagonist} se dressait devant {protagonist}, incarnation de tout ce contre quoi il s'était battu jusqu'à présent.`,
          `Le moment tant redouté était arrivé : {protagonist} et {antagonist} s'affrontaient enfin, avec {object} comme enjeu ultime.`,
          `{protagonist} rassembla tout son courage pour affronter {antagonist}, sachant que cette confrontation serait la plus difficile de toute sa vie.`
        ];
        break;
        
      case 'revelation':
        specificPhrases = [
          `La vérité éclata comme un coup de tonnerre : {twist}.`,
          `{protagonist} resta sans voix face à la révélation qui changeait tout : {twist}.`,
          `Au moment où tout semblait perdu, {protagonist} comprit enfin : {twist}.`,
          `Les pièces du puzzle s'assemblèrent brutalement dans l'esprit de {protagonist} : {twist}.`
        ];
        break;
        
      case 'decision':
        specificPhrases = [
          `{protagonist} se retrouva face à un choix impossible : sacrifier {object} ou abandonner {protagonist_goal}.`,
          `Tout se résumait à cet instant de décision où {protagonist} devait choisir entre deux voies aussi difficiles l'une que l'autre.`,
          `Le temps des hésitations était révolu ; {protagonist} devait maintenant prendre la décision qui définirait non seulement son destin, mais aussi celui de {setting}.`,
          `Face à l'adversité, {protagonist} comprit que la vraie épreuve n'était pas le combat, mais le choix qu'il devait faire maintenant.`
        ];
        break;
        
      case 'sacrifice':
        specificPhrases = [
          `Pour sauver ce qui était vraiment important, {protagonist} dut faire le sacrifice ultime.`,
          `Il devenait évident que le prix à payer pour {protagonist_goal} était bien plus élevé que {protagonist} ne l'avait imaginé.`,
          `"Parfois, le plus grand héroïsme réside dans ce à quoi on est prêt à renoncer," pensa {protagonist} en faisant son choix déchirant.`,
          `Face à l'inévitable, {protagonist} comprit que certaines victoires ne s'obtiennent qu'au prix d'une perte irréparable.`
        ];
        break;
    }
    
    // Combiner les phrases communes et spécifiques
    return [...specificPhrases, ...commonPhrases];
  }

  /**
   * Obtient les phrases de résolution selon le sous-type
   */
  getResolutionPhrases(subtype, details, options) {
    const { outcome, mood } = details;
    const protagonist = this.characterInfo.name;
    
    // Phrases communes à tous les sous-types de résolution
    const commonPhrases = [
      `Ainsi s'achevait cette aventure, mais {protagonist} savait que ce n'était que le début d'une nouvelle histoire.`,
      `Quand tout fut terminé, {protagonist} contempla le chemin parcouru avec un regard nouveau.`,
      `L'épreuve était surmontée, mais {protagonist} n'était plus la même personne qu'au début de cette aventure.`
    ];
    
    // Phrases spécifiques au sous-type
    let specificPhrases = [];
    
    switch(subtype) {
      case 'aftermath':
        specificPhrases = [
          `Les conséquences de cette aventure se feraient sentir longtemps : {outcome}.`,
          `{setting} avait changé, tout comme {protagonist}. Rien ne serait plus jamais comme avant.`,
          `Tandis que le calme revenait, {protagonist} put enfin mesurer l'ampleur de ce qui s'était produit : {outcome}.`,
          `Le prix de la victoire était élevé, mais {protagonist} savait qu'il avait fait le bon choix malgré tout.`
        ];
        break;
        
      case 'reflection':
        specificPhrases = [
          `Seul avec ses pensées, {protagonist} méditait sur les leçons apprises au cours de cette quête : {outcome}.`,
          `"{outcome}," pensa {protagonist} en contemplant {object} qui avait été au cœur de toute cette histoire.`,
          `Cette aventure avait appris à {protagonist} une vérité fondamentale sur lui-même qu'il n'oublierait jamais.`,
          `Dans le silence qui suivit, {protagonist} comprit que sa plus grande découverte n'était pas {object}, mais la connaissance de soi qu'il avait acquise.`
        ];
        break;
        
      case 'new_beginning':
        specificPhrases = [
          `Un nouveau chapitre s'ouvrait pour {protagonist}, empreint de {mood}.`,
          `Fort de cette expérience, {protagonist} tourna son regard vers de nouveaux horizons, prêt à affronter ce que l'avenir lui réservait.`,
          `Cette fin n'était qu'un commencement déguisé, et {protagonist} le savait mieux que quiconque.`,
          `Le voyage s'achevait ici, mais {protagonist} sentait déjà l'appel d'une nouvelle aventure.`
        ];
        break;
        
      case 'circular_ending':
        specificPhrases = [
          `{protagonist} se retrouva là où tout avait commencé, mais avec un regard entièrement nouveau sur le monde.`,
          `La boucle était bouclée, mais {protagonist} n'était plus la même personne qui avait entamé ce voyage.`,
          `En retournant à son point de départ, {protagonist} réalisa combien le chemin parcouru l'avait transformé.`,
          `Il est des voyages qui nous ramènent à notre point de départ, mais avec une compréhension profondément changée de ce que nous y avions laissé.`
        ];
        break;
    }
    
    // Combiner les phrases communes et spécifiques
    return [...specificPhrases, ...commonPhrases];
  }

  /**
   * Crée une transition entre deux sections majeures
   */
  createTransition(fromType, toType) {
    const transitions = {
      'introduction_to_development': [
        "Les événements se précipitèrent alors, mettant à l'épreuve la détermination du protagoniste.",
        "Ce qui avait commencé comme une simple curiosité allait bientôt se transformer en une quête bien plus importante.",
        "Les premiers pas étaient faits ; le véritable voyage pouvait commencer.",
        "Mais les défis ne faisaient que commencer, et l'horizon s'assombrissait déjà."
      ],
      'development_to_climax': [
        "Tous les chemins convergeaient inexorablement vers une confrontation finale.",
        "Le moment de vérité approchait, et il n'y aurait pas de retour en arrière possible.",
        "Les événements s'accélérèrent soudain, menant à un point de non-retour.",
        "Tout ce qui s'était passé jusqu'à présent n'était qu'un prélude à ce qui allait suivre."
      ],
      'climax_to_resolution': [
        "Quand la poussière retomba, rien n'était plus comme avant.",
        "Dans le silence qui suivit la tempête, il était temps de contempler ce qui restait.",
        "L'écho de ce qui venait de se produire résonnait encore, mais une page était définitivement tournée.",
        "Après l'orage vient le calme, et il était temps de panser les blessures et de réfléchir à l'avenir."
      ]
    };
    
    const key = `${fromType}_to_${toType}`;
    const options = transitions[key] || [
      "Le temps passa, marquant une nouvelle étape dans cette histoire.",
      "Les événements prirent alors une tournure inattendue.",
      "Un nouveau chapitre s'ouvrait dans cette aventure."
    ];
    
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Crée un titre pour l'histoire
   */
  createTitle(options) {
    const { genre, theme } = options;
    const mainCharName = this.characterInfo.name;
    const setting = this.worldElements.get('setting');
    const object = this.worldElements.get('object');
    
    // Modèles de titres par genre
    const titleTemplatesByGenre = {
      'fantasy': [
        `La Légende de ${object}`,
        `Le Secret de ${setting}`,
        `${mainCharName} et la Quête de ${object}`,
        `Les Chroniques de ${setting}`,
        `Le Dernier Gardien de ${setting}`
      ],
      'scifi': [
        `${setting}: Protocole ${Math.floor(Math.random() * 9000) + 1000}`,
        `L'Anomalie de ${object}`,
        `Les Derniers Jours de ${setting}`,
        `${mainCharName}: Horizon Zéro`,
        `La Convergence`
      ],
      'adventure': [
        `À la Recherche de ${object}`,
        `${mainCharName} et le Trésor de ${setting}`,
        `L'Expédition Perdue`,
        `Les Secrets de ${setting}`,
        `Au-delà des Frontières`
      ],
      'mystery': [
        `L'Énigme de ${setting}`,
        `${mainCharName} et l'Affaire du ${object}`,
        `Meurtres à ${setting}`,
        `Les Ombres de ${setting}`,
        `Le Mystère du ${object}`
      ]
    };
    
    // Sélectionner des modèles pour ce genre
    const titleTemplates = titleTemplatesByGenre[genre] || [
      `Le Voyage de ${mainCharName}`,
      `Les Secrets de ${setting}`,
      `La Quête de ${object}`,
      `${mainCharName}: Destinée`,
      `Au Cœur de ${setting}`
    ];
    
    // Choisir un titre aléatoirement
    return titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  }

  /**
   * Obtient une description de l'ère sélectionnée
   */
  getEraDescription(eraCode) {
    const eras = {
      'ancient': "Antiquité (3000 av. J.-C. - 476)",
      'medieval': "Époque médiévale (476-1492)",
      'renaissance': "Renaissance (1400-1600)",
      'industrial': "Révolution industrielle (1760-1840)",
      'modern': "Époque moderne (1900-présent)",
      'future_near': "Futur proche (2030-2100)",
      'future_far': "Futur lointain (après 2100)",
      'alternate': "Histoire alternative"
    };
    
    return eras[eraCode] || "Époque indéterminée";
  }
}

// Exporter une instance unique du générateur
const storyGen = new StoryGen();

// Fonction d'interface pour l'intégration facile
export function generateAIStory(options) {
  return storyGen.generateStory(options);
}