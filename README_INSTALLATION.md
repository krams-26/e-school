# Guide d'installation E-School

## Prérequis

- Node.js (v18 ou supérieur)
- MySQL (via WAMP)
- npm ou yarn

## Installation

### 1. Installer les dépendances frontend

```bash
npm install
```

### 2. Installer les dépendances backend

```bash
cd server
npm install
```

### 3. Configuration de la base de données

1. Créer la base de données `eschool` dans MySQL (via phpMyAdmin ou ligne de commande)
2. Copier le fichier `.env.example` vers `.env` dans le dossier `server`:

```bash
cd server
copy .env.example .env
```

3. Modifier `server/.env` avec vos paramètres:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=eschool
DB_PORT=3306
JWT_SECRET=votre_secret_jwt_tres_securise
PORT=3000
FRONTEND_URL=http://localhost:8080
```

### 4. Configuration frontend

Créer un fichier `.env` à la racine du projet:

```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=E-School
```

### 5. Initialiser la base de données

```bash
cd server
npm run migrate
npm run seed
```

### 6. Démarrer l'application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Accès à l'application

- Frontend: http://localhost:8080
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/health

## Comptes de démonstration

Après le seed, vous pouvez vous connecter avec:
- **Admin**: admin@eschool.com / password
- **Enseignant**: teacher@eschool.com / password
- **Élève**: student@eschool.com / password
- **Parent**: parent@eschool.com / password

## Structure du projet

```
e-school-main/
├── server/              # Backend API
│   ├── routes/         # Routes API
│   ├── middleware/      # Middleware (auth, etc.)
│   ├── config/         # Configuration DB
│   └── scripts/        # Migrations et seeds
├── src/                # Frontend React
│   ├── components/     # Composants React
│   ├── pages/         # Pages de l'application
│   ├── contexts/       # Contextes React
│   └── lib/           # Utilitaires (API client)
└── package.json        # Dépendances frontend
```

## Commandes disponibles

### Backend
- `npm start` - Démarrer en production
- `npm run dev` - Démarrer en développement (nodemon)
- `npm run migrate` - Créer les tables
- `npm run seed` - Remplir avec données de test

### Frontend
- `npm run dev` - Démarrer en développement
- `npm run build` - Build production
- `npm run preview` - Prévisualiser le build

## Problèmes courants

### Erreur de connexion MySQL
Vérifiez que MySQL est démarré dans WAMP et que les paramètres dans `.env` sont corrects.

### CORS errors
Vérifiez que `FRONTEND_URL` dans `server/.env` correspond à l'URL du frontend.

### Port déjà utilisé
Changez le port dans `vite.config.ts` (frontend) ou `server/.env` (backend).

