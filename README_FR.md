<table>
  <tr>
    <td><img src="./assets/exchange.png" alt="Aperçu" width="60" style="margin-right: 10px;"></td>
    <td><h1>Web Page de Convertisseur de Devises</h1></td>
  </tr>
</table>


## Description
Ce projet est un **Web Page de Convertisseur de Devises** basé sur l'API **Frankfurter**. Il permet aux utilisateurs de sélectionner une devise de base et une devise cible pour afficher le taux de change actuel ainsi qu'un graphique de l'évolution des taux sur les 30 derniers jours.

## Fonctionnalités
- Sélection dynamique des devises avec affichage des drapeaux nationaux.
- Mise à jour automatique du taux de change en fonction des devises sélectionnées.
- Conversion en temps réel en fonction du montant saisi.
- Affichage d'un graphique interactif retraçant l'évolution du taux de change sur les 30 derniers jours.
- Interface moderne et responsive utilisant **HTML, CSS (Tailwind CSS) et JavaScript**.

## Technologies utilisées
- **HTML5** et **CSS3** avec **Tailwind CSS** pour le style.
- **JavaScript (ES6)** pour la logique et les interactions.
- **Chart.js** pour l'affichage du graphique.
- **API Frankfurter** pour la récupération des taux de change.
- **Flag Icons** pour afficher les drapeaux des devises.

## Installation et exécution locale
### Prérequis
- Un navigateur Web moderne (Chrome, Firefox, Edge, etc.).
- Une connexion Internet pour récupérer les taux de change via l'API.

### Étapes d'installation
1. **Cloner le projet**
   ```sh
   git clone https://github.com/YuetongLU7/WebSemaine_Diogo_Yuetong.git
   ```
2. **Accéder au dossier du projet**
   ```sh
   cd WebSemaine_Diogo_Yuetong
   ```
3. **Ouvrir le fichier `index.html` dans un navigateur**
   - Vous pouvez **double-cliquer** sur le fichier `index.html`.
   - Ou, si vous utilisez Python, lancer un serveur local :
     ```sh
     python -m http.server
     ```
     Ensuite, ouvrez `http://localhost:8000` dans votre navigateur.

## Exemple de capture d'écran
![Capture d'écran de l'application](./assets/screenshot.png)

## Améliorations

### 1️⃣ Appels API imbriqués : Récupération optimisée des données
Nous avons mis en place des **appels API imbriqués** pour optimiser la récupération des données. Nous commençons par récupérer et mettre à jour dynamiquement les devises disponibles avant de procéder à la récupération du taux de change, garantissant ainsi une **exécution fluide** et évitant les appels API redondants.

### 2️⃣ Mise à Jour Dynamique des Listes Déroulantes
Les devises ne sont plus codées en dur. Désormais, elles sont récupérées dynamiquement via l'**API Frankfurter**, garantissant que nos menus déroulants contiennent toujours une liste à jour des devises supportées.

### 3️⃣ Empêcher la Sélection de la Même Devise
Pour éviter que l'utilisateur ne sélectionne **la même devise** dans les champs **base** et **cible** :
   - Lorsqu'une devise est sélectionnée comme devise de base, elle est **retirée** de la liste des devises cibles.
   - Lorsqu'une devise est sélectionnée comme devise cible, elle est **retirée** de la liste des devises de base.
   - Si une collision se produit, une **devise alternative valide** est automatiquement sélectionnée.

### 4️⃣ Récupération des Taux de Change : `fetchExchangeRate()`
Cette fonction interroge l’**API Frankfurter** pour récupérer les données de taux de change. Elle traite les données JSON reçues et extrait les taux de change pertinents pour la conversion.

### 5️⃣ Affichage en Temps Réel : `updateTextSnippet()`
Cette fonction met à jour **en temps réel** le taux de change affiché, en indiquant **l’heure exacte de la mise à jour** et en affichant le taux pour **1 unité** de la devise de base.

### 6️⃣ Graphique de l'Évolution du Taux de Change : `updateChartWithRate()`
Le graphique affiche l'évolution du taux de change sur les **30 derniers jours** :
   - L'**axe des x** représente **les dates**.
   - L'**axe des y** représente **les taux de change**.
   - Le graphique est mis à jour dynamiquement à chaque changement de devises.

### 7️⃣ Bonnes Pratiques de Développement et Clean Code
Nous avons appliqué les **principes de Clean Code d'Uncle Bob**, garantissant :
   - **Des fonctions à responsabilité unique**.
   - **Une conception modulaire et réutilisable**.
   - **Un code clair et facilement maintenable**.
   - **La gestion des environnements Python avec `uv`**.

---

## Utilisation
1. **Sélectionnez une devise de base et une devise cible**.
2. **Saisissez un montant** pour voir la conversion instantanée.
3. **Consultez le graphique des taux de change** des 30 derniers jours.

## API utilisée
Le projet utilise **Frankfurter API** pour récupérer les taux de change.
- Documentation officielle : [https://www.frankfurter.app](https://www.frankfurter.app)

## Auteurs
- **Yuetong LU** & **Diogo Jorge Basso**

---

📌 Ce projet a été réalisé dans le cadre de la **Web Semaine Mines Nancy** et suit les exigences pédagogiques en matière de communication avec une API externe et d'affichage dynamique sur une page web.