# Installation rapide E-School

## Étapes d'installation

### 1. Installer les dépendances

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### 2. Configurer la base de données

1. Créer la base de données `eschool` dans MySQL (via phpMyAdmin)

2. Créer le fichier `server/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=eschool
DB_PORT=3306
JWT_SECRET=votre_secret_jwt_changez_en_production
PORT=3000
FRONTEND_URL=http://localhost:8080
```

3. Créer le fichier `.env` à la racine:
```
VITE_API_URL=http://localhost:3000/api
```

### 3. Initialiser la base de données

```bash
cd server
npm run migrate
npm run seed
```

### 4. Démarrer l'application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Se connecter

- URL: http://localhost:8080
- Email: admin@eschool.com
- Mot de passe: password

## Comptes disponibles

- Admin: admin@eschool.com
- Enseignant: teacher@eschool.com  
- Élève: student@eschool.com
- Parent: parent@eschool.com

Tous avec le mot de passe: **password**

