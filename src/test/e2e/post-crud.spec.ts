import { test, expect } from "@playwright/test";

test("Création et modification d'un article", async ({ page }) => {
    // données de test
    const testArticle = {
        title: "Mon nouvel article",
        content: "Ceci est le contenu de mon article",
        author: "Testeur E2E"
    };

    const updatedArticle = {
        title: "Article modifié",
        content: "Contenu mis à jour"
    };

    // étape 1 : Création de l'article
    await page.goto("http://localhost:3009/posts/new");

    // remplissage du formulaire
    await page.fill('input[name="title"]', testArticle.title);
    await page.fill('textarea[name="content"]', testArticle.content);
    await page.fill('input[name="author"]', testArticle.author);

    // soumission du formulaire
    await page.click('button[type="submit"]');

    // vérification de la redirection vers la liste des articles
    await expect(page).toHaveURL("http://localhost:3009/posts");

    // vérification de la présence de l'article dans la liste
    const articleTitle = page.locator(`h2 a >> text="${testArticle.title}"`).last();
    await expect(articleTitle).toBeVisible();

    // étape 2 : Modification de l'article
    await articleTitle.click();

    // vérification de la redirection vers la page de l'article
    await expect(page).toHaveURL(/\/posts\/\d+/);

    // accès à la page de modification
    await page.click('text="Modifier l\'article"');

    // modification du formulaire
    await page.fill('input[name="title"]', updatedArticle.title);
    await page.fill('textarea[name="content"]', updatedArticle.content);

    // soumission du formulaire
    await page.click('button[type="submit"]');

    // vérification de la redirection vers la page de l'article modifié
    await expect(page).toHaveURL(/\/posts\/\d+/);

    // vérification du contenu modifié
    const updatedTitle = page.locator("h1");
    await expect(updatedTitle).toHaveText(updatedArticle.title);
    const updatedContent = page.locator(".prose p");
    await expect(updatedContent).toHaveText(updatedArticle.content);

    // étape 3 : Vérification dans la liste des articles
    await page.click('text="← Retour aux articles"');

    // vérification de la présence de l'article modifié dans la liste
    const modifiedArticleTitle = page.locator(`h2 a >> text="${updatedArticle.title}"`).last();
    await expect(modifiedArticleTitle).toBeVisible();
});
