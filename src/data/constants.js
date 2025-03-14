export const SETTINGS = {
    fantasy: ['un royaume enchanté', 'une forêt mystique', 'un château ancien', 'une île flottante'],
    scifi: ['une station spatiale', 'une planète lointaine', 'une mégalopole futuriste', 'une colonie sous-marine'],
    adventure: ['une jungle dense', 'un désert inexploré', 'des montagnes escarpées', 'des ruines antiques'],
    mystery: ['un manoir isolé', 'une petite ville brumeuse', 'une université prestigieuse', 'un musée après la fermeture'],
    romance: ['un café parisien', 'une plage au coucher du soleil', 'un jardin secret', 'une ville côtière pittoresque'],
    horror: ['une maison abandonnée', 'un hôpital désaffecté', 'un phare isolé', 'une forêt sombre'],
    comedy: ['un bureau dysfonctionnel', 'une réunion de famille', 'un festival local', 'une école de théâtre'],
    historical: ['la cour royale', 'un village médiéval', 'une ville pendant la révolution industrielle', 'un port maritime']
  };
  
  export const OBJECTS = {
    fantasy: ['un grimoire ancien', 'une amulette magique', 'une épée légendaire', 'une clé ornée'],
    scifi: ['un appareil alien', 'un prototype expérimental', 'une IA consciente', 'un portail dimensionnel'],
    adventure: ['une carte au trésor', 'un artéfact perdu', 'un journal mystérieux', 'une boussole unique'],
    mystery: ['une lettre anonyme', 'un objet disparu', 'une photographie énigmatique', 'un testament contesté'],
    romance: ['un médaillon avec portrait', 'une lettre d\'amour non envoyée', 'un anneau de famille', 'un livre dédicacé'],
    horror: ['un miroir ancien', 'une boîte scellée', 'une poupée inquiétante', 'un livre relié en cuir'],
    comedy: ['un trophée ridicule', 'un cadeau embarrassant', 'un appareil qui ne fonctionne jamais correctement', 'un costume absurde'],
    historical: ['un document royal', 'une arme d\'époque', 'un bijou de famille', 'une carte nautique']
  };
  
  export const ERAS = [
    { value: 'ancient', text: 'Antiquité' },
    { value: 'medieval', text: 'Médiéval' },
    { value: 'renaissance', text: 'Renaissance' },
    { value: 'industrial', text: 'Révolution industrielle' },
    { value: 'modern', text: 'Époque moderne' },
    { value: 'future_near', text: 'Futur proche' },
    { value: 'future_far', text: 'Futur lointain' },
    { value: 'alternate', text: 'Histoire alternative' }
  ];
  
  export const PLOT_TYPES = [
    { value: 'quest', text: 'Quête' },
    { value: 'conflict', text: 'Conflit' },
    { value: 'transformation', text: 'Transformation' },
    { value: 'mystery', text: 'Mystère' },
    { value: 'journey', text: 'Voyage' }
  ];
  
  export const THEMES = [
    { value: 'redemption', text: 'Rédemption' },
    { value: 'love', text: 'Amour' },
    { value: 'power', text: 'Pouvoir' },
    { value: 'identity', text: 'Identité' },
    { value: 'survival', text: 'Survie' },
    { value: 'freedom', text: 'Liberté' },
    { value: 'justice', text: 'Justice' },
    { value: 'betrayal', text: 'Trahison' }
  ];
  
  export const POVS = [
    { value: 'first', text: 'Première personne' },
    { value: 'third_limited', text: 'Troisième personne limitée' },
    { value: 'third_omniscient', text: 'Troisième personne omnisciente' },
    { value: 'second', text: 'Deuxième personne' }
  ];
  
  export const TONES = [
    { value: 'serious', text: 'Sérieux' },
    { value: 'humorous', text: 'Humoristique' },
    { value: 'melancholic', text: 'Mélancolique' },
    { value: 'optimistic', text: 'Optimiste' },
    { value: 'dark', text: 'Sombre' },
    { value: 'whimsical', text: 'Fantaisiste' },
    { value: 'ironic', text: 'Ironique' },
    { value: 'nostalgic', text: 'Nostalgique' }
  ];
  
  export const PLOT_TEMPLATES = {
    fantasy: {
      quest: 'Dans les terres mystiques de {setting}, {character} entame une quête périlleuse pour retrouver {object}, un artefact dont le pouvoir pourrait changer le destin du royaume.',
      conflict: 'Au cœur de {setting}, une lutte ancestrale oppose {character} à {antagonist}, tous deux convoitant {object} pour des raisons qui dépassent la simple possession.',
      transformation: 'Lorsque {character} découvre {object} dans les profondeurs de {setting}, une magie ancienne commence à se manifester, déclenchant une transformation qui révèlera sa véritable nature.',
      mystery: 'Dans {setting}, où les légendes et la réalité s\'entremêlent, {character} doit percer le mystère entourant {object} avant que les forces obscures ne s\'en emparent.',
      journey: '{character} quitte son village pour explorer {setting}, guidé par la promesse que {object} pourrait répondre aux questions qui hantent ses rêves depuis l\'enfance.'
    },
    scifi: {
      quest: 'Dans le labyrinthe technologique de {setting}, {character} se lance dans une mission cruciale pour récupérer {object}, une technologie qui pourrait sauver l\'humanité d\'une extinction imminente.',
      conflict: '{character} s\'oppose à {antagonist} pour le contrôle de {object}, une innovation qui redéfinira les rapports de force dans {setting} et peut-être dans toute la galaxie.',
      transformation: 'Après avoir été exposé à {object} dans le secteur restreint de {setting}, {character} subit des modifications cellulaires qui remettent en question la définition même de l\'humanité.',
      mystery: 'Une anomalie détectée dans {setting} conduit {character} à enquêter sur {object}, révélant une conspiration qui dépasse les frontières du temps et de l\'espace.',
      journey: 'En route vers {setting}, {character} découvre {object} à bord de son vaisseau, déclenchant une série d\'événements qui transformeront un simple voyage en odyssée interstellaire.'
    },
    adventure: {
      quest: 'Carte en main, {character} s\'aventure dans {setting} à la recherche de {object}, affrontant {obstacle} avec pour seules armes son courage et sa détermination.',
      conflict: 'L\'exploration de {setting} tourne à la course contre la montre lorsque {character} doit récupérer {object} avant {antagonist}, dont les intentions menacent l\'équilibre du monde.',
      transformation: 'Ce qui commence comme une simple expédition dans {setting} devient un voyage initiatique lorsque {character} découvre {object}, révélant des forces insoupçonnées.',
      mystery: 'Les légendes entourant {object} attirent {character} vers {setting}, où chaque indice dévoile un pan d\'une vérité plus vaste et plus ancienne que l\'Histoire.',
      journey: 'Poussé par son désir de réaliser son objectif, {character} traverse {setting} avec pour seul indice l\'existence de {object}, ignorant encore comment cette quête le transformera.'
    },
    mystery: {
      quest: 'Une série d\'événements inexplicables dans {setting} pousse {character} à rechercher {object}, dont la disparition semble liée à des secrets bien gardés.',
      conflict: 'Alors que {character} enquête sur {object} dans les recoins sombres de {setting}, {antagonist} tente d\'effacer toute trace de la vérité.',
      transformation: 'L\'enquête sur {object} conduit {character} dans les profondeurs de {setting}, mais aussi dans les zones d\'ombre de son propre passé.',
      mystery: 'Chaque indice concernant {object} plonge {character} plus profondément dans le labyrinthe de mystères que renferme {setting}, où personne n\'est vraiment ce qu\'il semble être.',
      journey: 'Une lettre anonyme attire {character} vers {setting}, où la découverte de {object} n\'est que le premier pas dans un dédale de mensonges et de vérités à demi révélées.'
    },
    romance: {
      quest: 'Dans l\'atmosphère envoûtante de {setting}, {character} se lance à la recherche de {object}, sans se douter que cette quête le mènera vers une rencontre qui changera sa vie.',
      conflict: 'Au cœur de {setting}, {character} et {antagonist} sont rivaux pour la possession de {object}, mais cette compétition cache des sentiments bien plus profonds.',
      transformation: 'La découverte fortuite de {object} dans {setting} révèle à {character} une sensibilité dont il ignorait l\'existence jusqu\'alors.',
      mystery: '{character} suit la piste de {object} à travers {setting}, ne réalisant pas que chaque indice le rapproche d\'une personne destinée à bouleverser son monde.',
      journey: 'Un voyage imprévu vers {setting}, avec {object} comme seul guide, conduit {character} vers une destination qu\'aucune carte ne pourrait indiquer : le cœur d\'un autre.'
    },
    horror: {
      quest: 'La recherche obsessionnelle de {object} conduit {character} dans les profondeurs oubliées de {setting}, où l\'attendent des horreurs indicibles.',
      conflict: 'En s\'opposant à {antagonist} pour le contrôle de {object}, {character} libère une force ancienne qui dormait dans les ténèbres de {setting}.',
      transformation: 'Le contact avec {object} dans les confins de {setting} déclenche en {character} une métamorphose aussi fascinante que terrifiante.',
      mystery: 'Les étranges phénomènes liés à {object} attirent {character} dans les recoins sombres de {setting}, où la réalité elle-même semble se déformer.',
      journey: 'Ce qui devait être un simple passage par {setting} devient un cauchemar sans fin lorsque {character} entre en possession de {object}.'
    },
    comedy: {
      quest: 'La quête improbable de {character} pour retrouver {object} dans les recoins de {setting} déclenche une série de situations aussi absurdes qu\'hilarantes.',
      conflict: 'Dans {setting}, {character} et {antagonist} se livrent une guerre acharnée pour {object}, avec des conséquences de plus en plus loufoques.',
      transformation: 'Après avoir découvert {object} dans {setting}, {character} subit une transformation qui défie toutes les lois de la logique et du bon sens.',
      mystery: 'Enquêter sur les mystères de {object} dans {setting} entraîne {character} dans une spirale de quiproquos et de rencontres improbables.',
      journey: 'Le voyage de {character} à travers {setting}, avec {object} comme seul compagnon, devient rapidement le road trip le plus catastrophique de l\'histoire.'
    },
    historical: {
      quest: 'Dans la tourmente de {setting}, {character} entame une quête périlleuse pour retrouver {object}, dont la valeur dépasse de loin le simple aspect matériel.',
      conflict: 'Les tensions qui traversent {setting} atteignent leur paroxysme lorsque {character} et {antagonist} s\'affrontent pour le contrôle de {object}, symbole d\'un pouvoir convoité.',
      transformation: 'La découverte de {object} dans les méandres de {setting} provoque en {character} une prise de conscience qui transcende les conventions de son époque.',
      mystery: 'Les rumeurs concernant {object} conduisent {character} à explorer les aspects méconnus de {setting}, dévoilant des secrets enfouis depuis des générations.',
      journey: 'Traversant {setting} avec pour seule boussole la recherche de {object}, {character} devient le témoin privilégié d\'une époque en pleine mutation.'
    }
  };
  