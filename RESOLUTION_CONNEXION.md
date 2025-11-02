# 🔧 Résolution du problème de connexion

## ✅ Corrections apportées

1. **Type de l'ID utilisateur** : Converti en string pour correspondre au type TypeScript
   - Modifié dans `server/routes/auth.js` (login et /me)

## 🔍 Problèmes possibles et solutions

### 1. Backend non démarré

**Symptôme** : Erreur "Impossible de se connecter au serveur distant"

**Solution** :
```bash
cd server
npm run dev
```

Vous devriez voir :
```
🚀 Serveur API E-School démarré sur le port 3000
📍 Base de données: eschool
🌐 Frontend URL: http://localhost:8080
```

### 2. Base de données non accessible

**Vérification** :
- WAMP doit être démarré (icône verte)
- MySQL doit être actif
- La base `eschool` doit exister

**Test dans phpMyAdmin** :
```sql
USE eschool;
SELECT email, role FROM users;
```

### 3. Données utilisateurs manquantes

**Si les utilisateurs n'existent pas** :
```bash
cd server
node scripts/seed.js
```

### 4. CORS ou URL API incorrecte

**Vérifier le fichier `.env` à la racine** :
```
VITE_API_URL=http://localhost:3000/api
```

**Vérifier le fichier `server/.env`** :
```
FRONTEND_URL=http://localhost:8080
```
(ou 8081 si le port 8080 est occupé)

### 5. Problème de mot de passe hashé

**Si les mots de passe ne matchent pas**, ré-exécutez le seed :
```bash
cd server
node scripts/seed.js
```

## 🧪 Test manuel de l'API

**Avec PowerShell** :
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"admin@eschool.com","password":"password"}'
```

**Avec curl** (si installé) :
```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@eschool.com\",\"password\":\"password\"}"
```

## 📋 Checklist de vérification

- [ ] WAMP/MySQL démarré
- [ ] Base de données `eschool` créée
- [ ] Tables créées (migration)
- [ ] Utilisateurs créés (seed)
- [ ] Backend démarré sur le port 3000
- [ ] Frontend démarré sur le port 8080/8081
- [ ] Fichier `.env` à la racine avec `VITE_API_URL`
- [ ] Fichier `server/.env` avec les bonnes configs
- [ ] Console navigateur ouverte pour voir les erreurs

## 🎯 Prochaines étapes

1. **Redémarrer le backend** :
   ```bash
   cd server
   npm run dev
   ```

2. **Vérifier dans le navigateur** (F12) :
   - Onglet Console : voir les erreurs
   - Onglet Network : voir les requêtes API

3. **Tester la connexion** :
   - Email: admin@eschool.com
   - Mot de passe: password

Si le problème persiste, vérifiez les logs du serveur backend pour voir les erreurs exactes.

