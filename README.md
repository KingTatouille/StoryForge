# StoryForge

StoryForge est un générateur d'histoires interactif qui utilise une IA narrative pour créer des histoires uniques et captivantes basées sur vos préférences de genre, personnages, et paramètres narratifs.

## 📋 Fonctionnalités

- Génération d'histoires dans 8 genres différents (Fantasy, Sci-Fi, Aventure, Mystère, Romance, Horreur, Comédie, Historique)
- Création et personnalisation de personnages avec traits, objectifs et peurs
- Paramètres narratifs avancés (ton, point de vue, complexité)
- Deux modes de génération: Simple (templates) et IA Avancé (plus créatif)
- Sauvegarde, impression et partage des histoires générées
- Interface utilisateur intuitive et réactive avec thème clair/sombre

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 16.0 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Cloner et configurer le projet

```bash
# 1. Cloner le repository
git clone https://github.com/KingTatouille/StoryForge.git

# 2. Se déplacer dans le répertoire du projet
cd StoryForge

# 3. Installer les dépendances
npm install
# ou si vous utilisez yarn
# yarn

# 4. Lancer le serveur de développement
npm run dev
# ou
# yarn dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 💡 Utilisation de Vite

Ce projet est construit avec [Vite](https://vitejs.dev/), un outil de build moderne qui offre:

- Un serveur de développement ultra-rapide avec rechargement à chaud (HMR)
- Une optimisation de production prête à l'emploi
- Une configuration minimale requise

### Commandes disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview

# Lancer le linter
npm run lint
```

## 🏗️ Structure du projet

```
storyforge/
├── public/           # Ressources statiques
├── src/
│   ├── components/   # Composants React réutilisables
│   ├── data/         # Constantes et données
│   ├── utils/        # Utilitaires, dont le générateur d'histoires
│   ├── App.jsx       # Composant principal de l'application
│   ├── main.jsx      # Point d'entrée
│   └── index.css     # Styles globaux et Tailwind
├── index.html        # Fichier HTML principal
├── vite.config.js    # Configuration de Vite
├── tailwind.config.js # Configuration de Tailwind CSS
└── package.json      # Dépendances et scripts
```

## 🛠️ Technologies utilisées

- [React 19](https://react.dev/) - Bibliothèque UI
- [Vite 6](https://vitejs.dev/) - Outil de build
- [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utilitaire
- [ESLint 9](https://eslint.org/) - Linter JavaScript

## 📝 Comment contribuer

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

Créé avec ❤️ pour les amateurs d'histoires et les créateurs en herbe.
