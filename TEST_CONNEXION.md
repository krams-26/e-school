# Test de connexion - Diagnostic

## Problèmes identifiés et corrigés

### ✅ Correction 1: Type de l'ID utilisateur
- **Problème**: L'ID retourné par MySQL est un nombre, mais le frontend attend une string
- **Solution**: Convertir l'ID en string dans les réponses API

### 🔍 Vérifications à faire

1. **Vérifier que le backend tourne:**
   ```bash
   cd server
   npm run dev
   ```
   Vous devriez voir: `🚀 Serveur API E-School démarré sur le port 3000`

2. **Vérifier la connexion à la base de données:**
   - Vérifiez que WAMP/MySQL est démarré
   - Vérifiez que la base `eschool` existe
   - Testez dans phpMyAdmin que les utilisateurs existent

3. **Vérifier les données utilisateurs:**
   ```sql
   SELECT email, role FROM users;
   ```
   Vous devriez voir les 4 comptes.

4. **Tester l'API directement:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@eschool.com\",\"password\":\"password\"}"
   ```

### 📝 Comptes de test

- admin@eschool.com / password
- teacher@eschool.com / password
- student@eschool.com / password
- parent@eschool.com / password

### 🐛 Si ça ne fonctionne toujours pas

1. Ouvrez la console du navigateur (F12)
2. Regardez les erreurs dans l'onglet Network
3. Vérifiez que l'URL de l'API est correcte dans `.env`
4. Vérifiez que CORS est bien configuré

