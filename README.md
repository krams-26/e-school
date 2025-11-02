# E-School - Plateforme de gestion scolaire

Plateforme complète de gestion scolaire connectant enseignants, élèves, parents et administrateurs.

## Technologies utilisées

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Base de données**: MySQL
- **UI**: Tailwind CSS + shadcn/ui
- **Authentification**: JWT

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- MySQL (via WAMP/XAMPP)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances frontend**
```bash
npm install
```

2. **Installer les dépendances backend**
```bash
cd server
npm install
```

3. **Configurer la base de données**

Créer la base de données `eschool` dans MySQL, puis:

```bash
cd server
npm run migrate
npm run seed
```

4. **Configurer les variables d'environnement**

Créez `server/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=eschool
DB_PORT=3306
JWT_SECRET=votre_secret_jwt_securise
PORT=3000
FRONTEND_URL=http://localhost:8080
```

Créez `.env` à la racine:
```
VITE_API_URL=http://localhost:3000/api
```

5. **Démarrer l'application**

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
- Backend API: http://localhost:3000/api

## Comptes de démonstration

- **Administrateur**: admin@eschool.com / password
- **Enseignant**: teacher@eschool.com / password
- **Élève**: student@eschool.com / password
- **Parent**: parent@eschool.com / password

## Support & Assistance

Pour toute assistance ou support technique, contactez-nous via Telegram:
- **Support**: [Contact Telegram](https://t.me/+243997204211)

## Développement

Développé avec ❤️ par [Ramazani L. Kevin] pour faciliter la gestion scolaire.

## Licence

Tous droits réservés © 2024 E-School
