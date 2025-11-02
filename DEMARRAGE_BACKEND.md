# 🚀 Guide de démarrage du backend

## ✅ Vérifications effectuées

- ✅ Base de données accessible
- ✅ 4 utilisateurs créés et valides
- ✅ Mots de passe hashés correctement

## 📝 Pour démarrer le backend

### Option 1: Démarrage en développement (avec rechargement auto)
```bash
cd server
npm run dev
```

### Option 2: Démarrage simple
```bash
cd server
node server.js
```

## 🔍 Vérifier que le backend tourne

Une fois démarré, vous devriez voir :
```
🚀 Serveur API E-School démarré sur le port 3000
📍 Base de données: eschool
🌐 Frontend URL: http://localhost:8080
```

## 🧪 Tester l'API

Dans un nouveau terminal PowerShell :
```powershell
$body = @{
    email = "admin@eschool.com"
    password = "password"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -ContentType "application/json" -Body $body
```

Si vous obtenez un token, l'API fonctionne !

## ⚠️ Problèmes courants

### Port 3000 déjà utilisé
Changez le port dans `server/.env` :
```
PORT=3001
```
Puis mettez à jour le frontend `.env` :
```
VITE_API_URL=http://localhost:3001/api
```

### Erreur de connexion MySQL
1. Vérifiez que WAMP est démarré
2. Vérifiez les paramètres dans `server/.env`

### Le frontend ne peut pas se connecter
1. Vérifiez que `FRONTEND_URL` dans `server/.env` correspond au port du frontend (8080 ou 8081)
2. Vérifiez que CORS est bien configuré dans `server/server.js`

## 🎯 Après démarrage

1. Le backend doit tourner sur http://localhost:3000
2. Le frontend doit être sur http://localhost:8080 (ou 8081)
3. Testez la connexion avec admin@eschool.com / password

