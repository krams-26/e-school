# Guide pour publier le projet sur GitHub

## État actuel
✅ Le dépôt Git est initialisé
✅ Tous les fichiers sont ajoutés
✅ Le premier commit est créé

## Étapes pour publier sur GitHub

### 1. Créer un nouveau dépôt sur GitHub

1. Connectez-vous à [GitHub](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite, puis sélectionnez **"New repository"**
3. Configurez votre dépôt :
   - **Repository name** : `e-school-main` (ou un autre nom de votre choix)
   - **Description** : "Application E-School - Système de gestion scolaire"
   - **Visibility** : Choisissez Public ou Private selon vos préférences
   - ⚠️ **NE COCHEZ PAS** "Initialize this repository with a README" (le README existe déjà)
4. Cliquez sur **"Create repository"**

### 2. Connecter votre dépôt local à GitHub

Une fois le dépôt créé sur GitHub, vous verrez des instructions. Utilisez la section **"...or push an existing repository from the command line"**.

Exécutez ces commandes dans PowerShell (remplacez `VOTRE_NOM_UTILISATEUR` par votre nom d'utilisateur GitHub) :

```powershell
# Naviguer vers le dossier du projet
cd c:\wamp64\www\e-school-main

# Ajouter le remote GitHub (remplacez l'URL par celle de votre dépôt)
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/e-school-main.git

# Renommer la branche principale en 'main' si nécessaire
git branch -M main

# Pousser le code sur GitHub
git push -u origin main
```

**Alternative avec SSH** (si vous avez configuré une clé SSH) :
```powershell
git remote add origin git@github.com:VOTRE_NOM_UTILISATEUR/e-school-main.git
git branch -M main
git push -u origin main
```

### 3. Authentification GitHub

Si vous êtes invité à vous connecter :
- Pour HTTPS : GitHub vous demandera vos identifiants ou un token d'accès personnel
- Créez un token si nécessaire : [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
- Pour SSH : Assurez-vous d'avoir configuré une clé SSH sur GitHub

### 4. Vérification

Après le push, rafraîchissez la page de votre dépôt GitHub. Vous devriez voir tous vos fichiers !

## Commandes Git utiles pour les mises à jour futures

Une fois le dépôt connecté, pour mettre à jour GitHub après chaque modification :

```powershell
# Voir les fichiers modifiés
git status

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit avec un message descriptif
git commit -m "Description de vos modifications"

# Envoyer les modifications sur GitHub
git push
```

## Fichiers à vérifier avant de pousser

⚠️ **Important** : Vérifiez que les fichiers sensibles ne sont pas dans le dépôt :

- `.env` - Fichiers d'environnement avec mots de passe/clefs API
- `node_modules/` - Dépendances (déjà dans .gitignore)
- Fichiers de configuration avec informations sensibles

Si un fichier `.env` a été commité, vous pouvez le supprimer de l'historique Git :
```powershell
# Ajouter .env au .gitignore s'il n'y est pas déjà
echo ".env" >> .gitignore

# Supprimer le fichier de Git (mais pas du système de fichiers)
git rm --cached .env

# Commit et push
git commit -m "Remove .env from repository"
git push
```

## Résolution de problèmes

### Erreur "remote origin already exists"
Si vous avez déjà un remote configuré :
```powershell
git remote remove origin
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/e-school-main.git
```

### Voir la configuration actuelle
```powershell
git remote -v
```

### Changer l'URL du remote
```powershell
git remote set-url origin https://github.com/VOTRE_NOM_UTILISATEUR/e-school-main.git
```

