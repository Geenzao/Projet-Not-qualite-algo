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

et dans un fichier eslintrc.js :

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: ["airbnb-base", "eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        "no-console": "off",
        "import/prefer-default-export": "off",
        "linebreak-style": ["error", "unix"],
        "prettier/prettier": [
            "error",
            {
                endOfLine: "lf",
                tabWidth: 4,
                semi: true,
                singleQuote: false,
                trailingComma: "none",
                printWidth: 180
            }
        ]
    }
};
```

Cela permet d'avoir des messages d'erreur en temps reel pour expliquer ce qui ne va pas dans le code.
