# Projet-Not-qualite-algo

## 1. Linting des commits

Nous avons ajouter un fichier commit-msg dans lequel nous avons mis : npx --no -- commitlint --edit "$i"
Ce fichier est executé lorsque l'utilisateur commit. On va alors vérifier si le message de commit respecte un format spécifique (par exemple, le format conventionnel comme feat:, fix:, etc.).
Cela permet de standardiser les messages de commit dans un projet et si le message ne respecte pas les règles définies, le commit est rejeté, ce qui aide à maintenir une historique Git propre et cohérente.

Il y avait un probleme avec git qui configurait les retours a la ligne avec CRLF au lieu de LF. Nous avons donc configuré git pour qu'il laisse les fichiers en LF avec cette commande : git config --global core.autocrlf input

## Prettier

Pour prettier, il nous a suffit d'installer prettier via cette commande : npm install --save-dev prettier
Et une fois cela fait, nous avons créer un fichier .prettierrc dans lequel nous avons mis nos regles de formattage :

```json
{
    "tabWidth": 4,
    "semi": true,
    "singleQuote": false,
    "trailingComma": "none",
    "printWidth": 180,
    "endOfLine": "lf",
    "formatOnSave": true
}
```

Pour le formattage lors de la sauvegarde, il fallait aller dans le settings.json de l'IDE et mettre ces deux lignes :

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
}
```

Pour ce qui est de ESLint, j'ai mis cette ligne dans le settings.json :

```json
{
    "eslint.format.enable": true
}
```

J'ai ensuite configuré ESlint pour ce projet en incluant l'intégration de prettier (eslint-config-prettier pour désactiver les configs eslint qui sont en conflict avec Prettier puis eslint-plugin-prettier pour la syncronisation).

Cela permet d'intégrer la config, et pour notre IDE d'avoir des messages d'erreur en temps reel pour expliquer ce qui ne va pas dans le code.
On ignore aussi le dossier dist/ qui va plus tard contenir le build TS.
Nous avons donc mis la règle de passer en ES modules et plus en CommonJS. Nous ne pouvons plus utiliser require().

## 3. TypeScript

Pour passer en TypeScript il a fallu installer les modules correspondants
Les voilà:

```shell
ts-loader
source-map-loader
typescript-eslint
ts-node
```

Il faut créer un fichier `tsconfig.json` dans lequel on spécifie des options comme le répertoire de sortie du build.
Nous avons choisi le largement utilisé ./dist
Après avoir ajouté les scripts node correspondants à TypeScript, il a fallu ensuite convertir les fichiers JS en TS.
Enfin il a fallu configurer ESLINT pour ajouter les modules TS.

## 4. Debugging et Performance

Pour débugguer le projet avec --inspect on fait : node --inspect src/index.js  
On ouvre notre navigateur et on va dans la section inspecteur par exemple : chrome://inspect  
On clique sur "Open dedicated DevTools for Node". On va dans l'onglet source pour charger le fichier JS et on clique sur un numéro de ligne pour mettre un breakpoint,
puis on rafraichit la page pour déclencher le breakpoint ça permet d'inspecter les variables et exécuter ligne par ligne.  
  
Pour voir les performances avec autocannon on fait : npm install -g autocannon  
Puis on le met dans les dépendances de `package.json`. On lance notre application avec : npm run dev  

Pour tester on va simuler 100 utilisateurs en simultanés, pour voir comment l'application gère un nombre élevé de requêtes concurrentes.
En testant sur 10 secondes ce qui permet d'avoir des statistiques fiables sans bloquer l'application.
Et on va faire une pipeline de 10 qui va envoyer plusieurs requêtes sans attendre la réponse précédente et
cela permet de tester les requêtes en rafale et voir si le serveur tient.  

Puis dans un autre terminal on fait : ```autocannon -c 100 -p 10 -d 10 http://localhost:3009/posts```
Pour lancer 100 connexions pendant 10 secondes avec une pipeline de 10, sur notre route (GET) "posts" car elle récupère tous les posts, donc potentiellement plus lourde.
On a comme résultats une latence trop longue (5000ms en moyenne, 9500ms max), un nombre de requête trop faible (8req/s en moyenne, 9req/s max),
on a 30% des requêtes qui échouent 610/2000 et un débit de 4.29 MB/sec.  
  
Ensuite on fait : ```autocannon -c 100 -p 10 -d 10 http://localhost:3009/posts/1```  
Pour lancer 100 connexions pendant 10 secondes avec une pipeline de 10, sur notre route (GET) "posts/1"  pour tester la rapidité de récupération d'un post.
On a comme résultats une latence un peu longue (1500ms en moyenne, 2000ms max), un bon nombre de requête (623req/s en moyenne, 719req/s max)
et un débit de 1,11 MB/sec.  

## 5. Test Unitaires et End to End

Pour les test unitaire avec vitest, il a fallu installer vitest via :

```shell
npm install vitest @testing-library/react @testing-library/jest-dom --save-dev
```

Vitest va permettre de lancer des tests sur les principale fonctionnalité juste en lancant une commande :

```shell
npm test
```

Avec cette commande on va lancer des tests sur getPostById, createPost et updatePost. Ces test sont situé dans `src/test/PostServices.test.ts`

Pour ce qui est des test End to End, nous devons d'avord installer playwright :

```shell
npm init playwright@latest
```

Les tests end to end sont situé dans `src/test/e2e` et sont lu automatiquement lors du lancement des test. Voci l'ordre des commandes a éffectuer :

```shell
npm run dev
npm run test:e2e
```

## 6. Monitoring et Reporting d'Erreurs

Nous avons installé Sentry en utilisant [cette documentation](https://docs.sentry.io/platforms/javascript/guides/node/).
Nous avons opté pour la version gratuite non self-hostée (SaaS) car ceci est un projet test.
Grâce au wizard d'installation de Sentry nous avons fait en sorte d'envoyer les source maps pour avoir les piles d'appel. Elles seront update dans le script de build.

Pour faire une erreur volontaire, voilà la procédure:

```typescript
const Sentry = require("@sentry/node");

Sentry.startSpan(
    {
        op: "test",
        name: "My First Test Span"
    },
    () => {
        try {
            throw new Error("This is a test error");
        } catch (e) {
            Sentry.captureException(e);
        }
    }
);
```

Elle se retrouve bien sur notre compte Sentry.
