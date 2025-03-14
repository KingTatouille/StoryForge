// utils/storyGenerator.js - Version améliorée
import { SETTINGS, OBJECTS, PLOT_TEMPLATES } from '../data/constants';

// Classe pour représenter un personnage avec ses attributs
class CharacterModel {
  constructor(data) {
    this.name = data.name || 'Personnage';
    this.age = data.age || 30;
    this.occupation = data.occupation || 'aventurier';
    this.trait = data.trait || 'déterminé';
    this.goal = data.goal || 'trouver son destin';
    this.fear = data.fear || 'l\'échec';
    this.isMain = data.isMain || false;
    this.backstory = data.backstory || '';
  }

  // Format grammaticalement correct pour la peur
  getFearWithArticle() {
    // Liste de mots commençant par une voyelle
    const startsWithVowel = /^[aeiouyàáâäæãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿ]/i;
    
    // Mots qui requièrent un traitement spécial
    const specialCases = {
      'échec': 'l\'échec',
      'abandon': 'l\'abandon',
      'eau': 'l\'eau',
      'obscurité': 'l\'obscurité',
      'inconnu': 'l\'inconnu',
      'injustice': 'l\'injustice'
    };

    // Vérifie si le mot est un cas spécial
    if (specialCases[this.fear.toLowerCase()]) {
      return specialCases[this.fear.toLowerCase()];
    }
    
    // Ajoute l'article approprié
    if (startsWithVowel.test(this.fear)) {
      return `l'${this.fear}`;
    } else {
      return `le ${this.fear}`;
    }
  }

  // Format grammaticalement correct pour l'objectif
  getGoalWithVerb() {
    // Si l'objectif commence déjà par un verbe à l'infinitif, on le retourne tel quel
    if (/^(trouver|découvrir|obtenir|acquérir|atteindre|réaliser|comprendre|devenir|être|avoir|faire)/i.test(this.goal)) {
      return this.goal;
    }
    
    // Sinon on ajoute un verbe approprié
    return `trouver ${this.goal}`;
  }

  // Génère une description du personnage adaptée au genre
  describe(genre) {
    const descriptions = {
      fantasy: `${this.name}, un${this.age < 30 ? ' jeune' : ''} ${this.occupation} ${this.trait}, cherchant à ${this.getGoalWithVerb()} malgré sa peur de ${this.getFearWithArticle()}`,
      scifi: `${this.name}, un${this.age < 30 ? ' jeune' : ''} ${this.occupation} du futur, ${this.trait} et déterminé à ${this.getGoalWithVerb()} en dépit de sa crainte de ${this.getFearWithArticle()}`,
      adventure: `${this.name}, ${this.age} ans, ${this.occupation} ${this.trait} dont l'objectif est de ${this.getGoalWithVerb()} tout en affrontant ${this.getFearWithArticle()}`,
      mystery: `${this.name}, ${this.occupation} introverti de ${this.age} ans, ${this.trait} mais tourmenté par ${this.getFearWithArticle()}, cherchant à ${this.getGoalWithVerb()}`,
      romance: `${this.name}, ${this.age} ans, ${this.trait} ${this.occupation} qui aspire à ${this.getGoalWithVerb()} malgré ${this.getFearWithArticle()} qui le/la hante`,
      horror: `${this.name}, ${this.occupation} de ${this.age} ans, forcé d'affronter ${this.getFearWithArticle()} dans sa quête pour ${this.getGoalWithVerb()}`,
      comedy: `${this.name}, un${this.age < 30 ? ' jeune' : ''} ${this.occupation} ${this.trait} mais maladroit, qui tente désespérément de ${this.getGoalWithVerb()} tout en évitant ${this.getFearWithArticle()}`,
      historical: `${this.name}, ${this.occupation} ${this.trait} de ${this.age} ans vivant à une époque troublée, aspirant à ${this.getGoalWithVerb()} tout en craignant ${this.getFearWithArticle()}`
    };

    return descriptions[genre] || descriptions.adventure;
  }
}

// Fonction utilitaire pour obtenir un article approprié pour un nom
function getArticleForNoun(noun) {
  const vowelRegex = /^[aeiouyàáâäæãåāèéêëēėęîïíīįìôöòóœøōõûüùúūÿ]/i;
  
  // Cas spéciaux
  const specialNouns = {
    'grimoire': 'un',
    'amulette': 'une',
    'épée': 'une',
    'clé': 'une',
    'appareil': 'un',
    'prototype': 'un',
    'IA': 'une',
    'portail': 'un',
    'carte': 'une',
    'artéfact': 'un',
    'journal': 'un',
    'boussole': 'une',
    'lettre': 'une',
    'objet': 'un',
    'photographie': 'une',
    'testament': 'un',
    'médaillon': 'un',
    'anneau': 'un',
    'livre': 'un',
    'miroir': 'un',
    'boîte': 'une',
    'poupée': 'une',
    'trophée': 'un',
    'cadeau': 'un',
    'costume': 'un',
    'document': 'un',
    'arme': 'une',
    'bijou': 'un',
    'royaume': 'un',
    'forêt': 'une',
    'château': 'un',
    'île': 'une',
    'station': 'une',
    'planète': 'une',
    'mégalopole': 'une',
    'colonie': 'une',
    'jungle': 'une',
    'désert': 'un',
    'montagnes': 'des',
    'ruines': 'des',
    'manoir': 'un',
    'ville': 'une',
    'université': 'une',
    'musée': 'un',
    'café': 'un',
    'plage': 'une',
    'jardin': 'un',
    'maison': 'une',
    'hôpital': 'un',
    'phare': 'un',
    'bureau': 'un',
    'réunion': 'une',
    'festival': 'un',
    'école': 'une',
    'cour': 'une',
    'village': 'un',
    'port': 'un'
  };

  // Recherche d'abord dans les cas spéciaux
  for (const [key, article] of Object.entries(specialNouns)) {
    if (noun.includes(key)) {
      return article;
    }
  }

  // Par défaut, utiliser l'article selon que le mot commence par une voyelle ou non
  return vowelRegex.test(noun) ? "l'" : "le";
}

// Formater correctement un objet avec son article
function formatObjectWithArticle(object) {
  // Si l'objet commence déjà par un article, on le retourne tel quel
  if (/^(un |une |le |la |les |l'|des )/i.test(object)) {
    return object;
  }
  
  // Sinon, on ajoute l'article approprié
  return `${getArticleForNoun(object)} ${object}`;
}

// Formater correctement un cadre avec son article
function formatSettingWithArticle(setting) {
  // Si le cadre commence déjà par un article, on le retourne tel quel
  if (/^(un |une |le |la |les |l'|des )/i.test(setting)) {
    return setting;
  }
  
  // Sinon, on ajoute l'article approprié
  return `${getArticleForNoun(setting)} ${setting}`;
}

// Obtenir un élément aléatoire d'un tableau
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Générer l'antagoniste si nécessaire
function generateAntagonist(genre) {
  const antagonists = {
    fantasy: "un sorcier maléfique aux pouvoirs obscurs",
    scifi: "une intelligence artificielle devenue consciente",
    adventure: "un chasseur de trésors rival sans scrupules",
    mystery: "un manipulateur caché dans l'ombre",
    romance: "un rival séduisant mais mystérieux",
    horror: "une entité ancienne assoiffée de vengeance",
    comedy: "un rival ridiculeusement incompétent mais chanceux",
    historical: "un adversaire politique ambitieux et sans scrupules"
  };
  
  return antagonists[genre] || antagonists.adventure;
}

// Générer l'obstacle si nécessaire
function generateObstacle(genre) {
  const obstacles = {
    fantasy: "des créatures anciennes gardant un secret immémorial",
    scifi: "des systèmes de sécurité avancés et des drones militaires",
    adventure: "des pièges mortels et l'hostilité d'une nature sauvage",
    mystery: "des témoins réticents et des indices contradictoires",
    romance: "des malentendus et des préjugés sociaux",
    horror: "des phénomènes inexplicables et des présences menaçantes",
    comedy: "une succession de circonstances improbables et embarrassantes",
    historical: "les tensions politiques et les conventions sociales rigides"
  };
  
  return obstacles[genre] || obstacles.adventure;
}

// Fonction principale pour générer une histoire
export const generateStory = (options) => {
  // Créer des modèles de personnages
  const characters = options.characters.map(char => new CharacterModel(char));
  const mainChar = characters.find(char => char.isMain) || characters[0];
  const supportingChars = characters.filter(char => !char.isMain);
  
  // Formater correctement l'objet et le cadre avec les articles appropriés
  const formattedObject = formatObjectWithArticle(options.object);
  const formattedSetting = formatSettingWithArticle(options.setting);
  
  // Obtenir le template de base pour le type d'intrigue
  let template = PLOT_TEMPLATES[options.genre]?.[options.plotType] || PLOT_TEMPLATES.adventure.quest;
  
  // Remplacer les placeholders
  template = template.replace('{character}', mainChar.describe(options.genre));
  template = template.replace('{setting}', formattedSetting);
  template = template.replace('{object}', formattedObject);
  
  // Générer l'antagoniste et l'obstacle si nécessaire
  if (template.includes('{antagonist}')) {
    const antagonist = generateAntagonist(options.genre);
    template = template.replace('{antagonist}', antagonist);
  }
  
  if (template.includes('{obstacle}')) {
    const obstacle = generateObstacle(options.genre);
    template = template.replace('{obstacle}', obstacle);
  }
  
  // Construire l'histoire de base
  let content = `<p>${template}</p>`;
  
  // En fonction du genre, générer le reste de l'histoire
  switch (options.genre) {
    case 'fantasy':
      content += generateFantasyContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    case 'scifi':
      content += generateSciFiContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    case 'adventure':
      content += generateAdventureContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    case 'mystery':
      content += generateMysteryContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    case 'romance':
      content += generateRomanceContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    case 'horror':
      content += generateHorrorContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    case 'comedy':
      content += generateComedyContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    case 'historical':
      content += generateHistoricalContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
      break;
    default:
      content += generateAdventureContent(mainChar, supportingChars, options, formattedSetting, formattedObject);
  }
  
  // Construire l'objet d'histoire complet
  return {
    title: `Une histoire de ${getGenreName(options.genre)}`,
    setting: options.setting,
    era: determineYear(options.era),
    content: content
  };
};

// Fonctions pour générer le contenu par genre
function generateFantasyContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  let content = '';
  
  // Ajouter du détail en fonction des facteurs de complexité
  if (options.length > 3) {
    content += `
    <p>Dans ce monde où la magie imprègne chaque parcelle de terre, ${mainChar.name} n'est pas un ${mainChar.occupation} ordinaire. ${mainChar.trait.charAt(0).toUpperCase() + mainChar.trait.slice(1)} et déterminé, son passé est marqué par ${mainChar.backstory || "des événements qui l'ont forgé"}.</p>
    `;
  }
  
  if (options.length > 6) {
    // Ajouter les personnages secondaires
    if (supportingChars.length > 0) {
      content += `<p>Dans sa quête, ${mainChar.name} n'est pas seul. `;
      
      supportingChars.forEach((char, index) => {
        if (index === 0) {
          content += `${char.name}, ${char.trait} ${char.occupation}, apporte ${index % 2 === 0 ? 'sa sagesse' : 'sa force'}`;
        } else if (index === supportingChars.length - 1) {
          content += ` et ${char.name}, dont le talent de ${char.occupation} s'avère indispensable`;
        } else {
          content += `, ${char.name} avec ses connaissances de ${char.occupation}`;
        }
      });
      
      content += `.</p>`;
    }
  }
  
  // Ajouter des rebondissements en fonction du facteur de twist
  if (options.twist > 7) {
    content += `
    <p>Mais l'histoire prend un tournant inattendu lorsque ${mainChar.name} découvre que ${formattedObject} cache un secret bien plus sombre que prévu. Ce qui semblait être une simple quête se transforme en un combat pour le destin même de ${formattedSetting}.</p>
    `;
  }
  
  // Ajouter une conclusion
  content += `
  <p>Après bien des épreuves, ${mainChar.name} comprend que sa véritable quête n'était pas de trouver ${formattedObject}, mais de ${options.theme === 'identity' ? 'découvrir sa véritable identité' : 'apprendre à surmonter ' + mainChar.getFearWithArticle()}. Dans ce monde de magie et de mystère, parfois le plus grand pouvoir est celui que l'on trouve en soi-même.</p>
  `;
  
  return content;
}

function generateSciFiContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  let content = '';
  
  // Développer en fonction de la complexité
  if (options.detail > 4) {
    content += `
    <p>Dans ce futur où la technologie définit l'humanité, ${formattedSetting} est devenu le symbole d'une civilisation à la croisée des chemins. Les implants neuronaux, les voyages interstellaires et la manipulation génétique font partie du quotidien.</p>
    `;
  }
  
  if (options.length > 5) {
    // Intégrer les personnages secondaires
    if (supportingChars.length > 0) {
      content += `<p>La mission de ${mainChar.name} est soutenue par une équipe aux compétences diverses : `;
      
      supportingChars.forEach((char, index) => {
        const role = ["expert en systèmes", "spécialiste tactique", "négociateur", "hacker"][index % 4];
        
        if (index === 0) {
          content += `${char.name}, ${char.occupation} et ${role}`;
        } else if (index === supportingChars.length - 1) {
          content += ` et ${char.name}, un ${char.occupation} dont les connaissances s'avèrent cruciales`;
        } else {
          content += `, ${char.name} qui maîtrise les technologies de ${char.occupation}`;
        }
      });
      
      content += `.</p>`;
    }
  }
  
  // Élémemt de tension scientifique
  content += `
  <p>Alors que les lois de la physique sont repoussées aux confins de l'univers connu, ${mainChar.name} doit faire face à une question fondamentale : est-ce que la technologie nous sauvera ou nous détruira? ${formattedObject} pourrait bien détenir la réponse, mais à quel prix?</p>
  `;
  
  // Conclusion avec thème
  content += `
  <p>Dans un monde où l'humanité a conquis les étoiles mais peine à se comprendre elle-même, la quête de ${mainChar.name} révèle une vérité universelle : même à l'ère des intelligences artificielles et des voyages interstellaires, c'est notre capacité à ${options.theme === 'identity' ? 'préserver notre humanité' : 'surmonter nos peurs fondamentales comme ' + mainChar.getFearWithArticle()} qui détermine notre destin.</p>
  `;
  
  return content;
}

function generateAdventureContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  let content = '';
  
  // Développer l'histoire en fonction des options
  content += `
  <p>L'appel de l'aventure résonne dans l'âme de ${mainChar.name} depuis toujours. ${formattedSetting} représente bien plus qu'une simple destination - c'est la promesse de révélations qui pourraient changer le cours de l'histoire.</p>
  
  <p>Entre falaises escarpées et rivières tumultueuses, chaque pas rapproche ${mainChar.name} de ${formattedObject}, mais aussi du danger. La nature elle-même semble mettre à l'épreuve sa détermination et sa volonté de surmonter ${mainChar.getFearWithArticle()}.</p>
  `;
  
  // Ajouter une conclusion
  content += `
  <p>Au terme de cette odyssée périlleuse, ${mainChar.name} découvre que la véritable valeur de sa quête n'était pas dans la découverte de ${formattedObject}, mais dans les leçons apprises en chemin. Parfois, le plus grand trésor est la transformation intérieure qui nous permet de devenir qui nous étions destinés à être.</p>
  `;
  
  return content;
}

function generateMysteryContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  let content = '';
  
  // Développer l'atmosphère du mystère
  content += `
  <p>Dans ${formattedSetting}, où les ombres semblent plus profondes et les silences plus lourds de sens, ${mainChar.name} se retrouve à démêler une toile d'intrigues où rien n'est ce qu'il semble être. La découverte de ${formattedObject} n'est que le premier morceau d'un puzzle bien plus vaste.</p>
  
  <p>Chaque indice résolu soulève davantage de questions. Chaque vérité découverte révèle de nouveaux mensonges. Et dans ce jeu de miroirs et d'illusions, ${mainChar.name} doit faire face à sa plus grande crainte : ${mainChar.getFearWithArticle()}.</p>
  `;
  
  // Conclusion avec révélation
  content += `
  <p>La vérité finit par émerger, aussi improbable qu'inévitable. En résolvant l'énigme de ${formattedObject}, ${mainChar.name} dévoile non seulement les secrets enfouis dans les recoins de ${formattedSetting}, mais aussi une partie de lui-même qu'il n'avait jamais eu le courage d'affronter.</p>
  `;
  
  return content;
}

function generateRomanceContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  // Définir le personnage romantique (partenaire)
  const loveInterest = supportingChars[0] || {
    name: mainChar.gender === 'homme' ? 'Emma' : 'Ethan',
    trait: 'mystérieux',
    occupation: 'artiste',
    goal: 'trouver sa passion',
    fear: 'l\'abandon'
  };
  
  let content = '';
  
  // Développer l'histoire
  content += `
  <p>Entre eux, ${formattedObject} devient le symbole d'une connexion qui défie la raison. Leurs chemins si différents - ${mainChar.name} cherchant à ${mainChar.getGoalWithVerb()}, et ${loveInterest.name} fuyant ${loveInterest.fear} - semblent pourtant destinés à se croiser.</p>
  
  <p>Mais la route vers l'amour véritable est semée d'obstacles. Les malentendus, les secrets du passé, et la peur d'être vulnérable menacent de séparer ce que le destin a réuni.</p>
  `;
  
  // Conclusion
  content += `
  <p>Au crépuscule d'un jour ordinaire dans ${formattedSetting}, ${mainChar.name} comprend que l'amour n'est pas seulement une destination, mais un voyage. Et parfois, il faut avoir le courage de risquer son cœur pour découvrir que certaines personnes valent tous les risques.</p>
  `;
  
  return content;
}

function generateHorrorContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  let content = '';
  
  // Développer l'atmosphère
  content += `
  <p>Les ombres s'allongent anormalement. Des bruits inexplicables résonnent dans les murs. Et chaque nuit, la frontière entre réalité et cauchemar s'estompe un peu plus, confrontant ${mainChar.name} à des visions de plus en plus terrifiantes.</p>
  
  <p>Bientôt, ${mainChar.name} comprend que ${formattedObject} est lié à une histoire sanglante que les habitants de ${formattedSetting} ont tenté d'effacer. Une histoire dont les échos continuent de résonner dans le présent, réclamant de nouveaux sacrifices.</p>
  `;
  
  // Conclusion horrifique
  content += `
  <p>Alors que ${mainChar.getFearWithArticle()} devient une réalité tangible dans les couloirs sombres de ${formattedSetting}, ${mainChar.name} doit affronter une vérité glaçante : parfois, les monstres les plus terrifiants ne sont pas ceux qui nous poursuivent dans l'obscurité, mais ceux qui ont toujours été tapis au plus profond de nous-mêmes.</p>
  `;
  
  return content;
}

function generateComedyContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  let content = '';
  
  // Développer les situations comiques
  content += `
  <p>Entre une grand-mère ninja, un perroquet qui récite du Shakespeare et un groupe de touristes qui le prennent pour un guide local célèbre, ${mainChar.name} tente désespérément de maintenir l'apparence de normalité. Mais comment rester crédible quand ${formattedObject} décide de se comporter de façon totalement imprévisible au pire moment possible?</p>
  
  <p>"Ce n'est pas ce que vous croyez!" devient la phrase préférée de ${mainChar.name}, généralement prononcée dans des positions compromettantes ou juste avant qu'un gâteau à la crème ne vienne s'écraser sur quelqu'un d'important.</p>
  `;
  
  // Conclusion
  content += `
  <p>Au terme de ce tourbillon de catastrophes en série, ${mainChar.name} réalise que parfois, le meilleur plan est de n'avoir aucun plan. Et que ${mainChar.getFearWithArticle()}, qu'il redoutait tant, s'avère finalement être la source de sa plus grande force : la capacité à rire de lui-même.</p>
  `;
  
  return content;
}

function generateHistoricalContent(mainChar, supportingChars, options, formattedSetting, formattedObject) {
  let content = '';
  
  // Développer le contexte historique
  content += `
  <p>Alors que les grandes puissances s'affrontent et que les idées nouvelles bousculent l'ordre établi, ${formattedObject} devient l'enjeu d'une lutte silencieuse dont les répercussions pourraient bien changer le cours des événements.</p>
  
  <p>Entre loyautés divisées et secrets d'État, ${mainChar.name} doit choisir son camp dans un monde où chaque décision peut conduire à la gloire... ou à l'échafaud. Son objectif de ${mainChar.getGoalWithVerb()} semble plus lointain que jamais lorsque le poids de l'époque vient peser sur ses épaules.</p>
  `;
  
  // Conclusion
  content += `
  <p>Dans les pages jaunies des livres d'histoire, certains noms sont gravés en lettres d'or, d'autres oubliés dans les marges. Mais alors que ${formattedSetting} s'apprête à tourner une page décisive, ${mainChar.name} comprend que la véritable grandeur réside parfois dans ces destins anonymes qui, sans le savoir, ont infléchi le cours du temps.</p>
  `;
  
  return content;
}

// Obtenir le nom d'un genre
function getGenreName(genre) {
  const names = {
    fantasy: 'fantasy',
    scifi: 'science-fiction',
    adventure: 'aventure',
    mystery: 'mystère',
    romance: 'romance',
    horror: 'horreur',
    comedy: 'comédie',
    historical: 'histoire'
  };
  
  return names[genre] || 'aventure';
}

// Déterminer l'année/époque en fonction de l'ère
function determineYear(era) {
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
}