# Projet-Not-qualite-algo

## 1. Linting des commits

Nous avons ajouter un fichier commit-msg dans lequel nous avons mis : npx --no -- commitlint --edit "$i"
Ce fichier est executé lorsque l'utilisateur commit. On va alors vérifier si le message de commit respecte un format spécifique (par exemple, le format conventionnel comme feat:, fix:, etc.).
Cela permet de standardiser les messages de commit dans un projet et si le message ne respecte pas les règles définies, le commit est rejeté, ce qui aide à maintenir une historique Git propre et cohérente.
