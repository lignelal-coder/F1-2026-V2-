## F1 2026 — Prédictions

- **App en ligne :** [https://allliiiii-58q4w22b0-lignelal-coders-projects.vercel.app/](https://allliiiii-58q4w22b0-lignelal-coders-projects.vercel.app/)
- **Projet Vercel :** [alliiig — Overview](https://vercel.com/lignelal-coders-projects/alliiig)

---

## Contenu

Ce dossier contient l’application de prédictions F1 2026 (HTML, CSS, JS) et des *assets* front-end (fichiers compilés/minifiés) : JavaScript, CSS et CSS Modules, plus des images.

## Structure

- `assets/js/` : bundles JavaScript (`.js`)
- `assets/css/` : feuilles de style globales (`.css`)
- `assets/css-modules/` : CSS Modules (`*.module.css`)
- `assets/img/` : images (ex. PNG)
- `duplicates/` : doublons conservés (ex. téléchargements répétés)

## Fonctionnalités récentes (ajoutées ensemble)

- **Proxy API Ergast** : fonction serverless Vercel `api/ergast-results.js` qui appelle l’API Ergast côté serveur (plus de blocage CORS). Le front utilise « Récupérer auto » vers `/api/ergast-results?round=…&year=…`.
- **Parties (rooms)** :
  - Connexion d’abord (identifiants Allan, Alexandre, Mathéo), puis choix de partie.
  - **Créer une partie** : bouton « Créer une nouvelle partie » → affichage du code et du lien à partager → « Entrer dans cette partie ».
  - **Rejoindre par code** : champ « Rejoindre avec un code » + bouton Rejoindre (après connexion).
  - **Liste des parties** : chargement des parties depuis Supabase avec bouton Rejoindre par partie.
  - **Changer de partie** : bouton « Changer de partie » dans le header (quitte la room et revient au lobby).
- **Sauvegarde** : bouton Sauvegarder + sauvegarde automatique au blur ; possibilité de sauvegarder un état vide.
- **Scores** : 3 / 2 / 1 point(s) pour 1er / 2e / 3e (course et sprint).
- **Verrou J-1** : modifications possibles jusqu’à la veille du GP ; si pas encore de prédiction, on peut encore en saisir une.
- **UI** : aside gauche fixe au scroll (sticky), noms complets des pilotes sous les images, nom d’écurie à la place du « code pilote » dans les prédictions, icônes pilote + écurie, médailles or/argent/bronze.
- **Admin résultats** : section « Résultats officiels (admin) » visible et utilisable uniquement pour Allan (maître de jeu).
- **Supabase** : état partagé par `roomCode` (une ligne par partie), polling toutes les 10 s pour la synchro entre joueurs.

## Notes

- Le fichier `assets/css/el_main.css` correspond à l’ancien fichier sans extension `m=el_main_css` (contenu texte CSS).
- Les fichiers `duplicates/265831400(1..3)` sont des doublons strictement identiques à `assets/img/265831400.png` (hash identique). Tu peux les supprimer si tu n’en as pas besoin.

