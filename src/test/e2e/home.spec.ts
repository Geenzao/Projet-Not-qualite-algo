import { test, expect } from "@playwright/test";

test("Page d'accueil - Vérification du contenu", async ({ page }) => {
    // accés à la page d'accueil
    await page.goto("http://localhost:3009");

    // vérification de la présence du titre principal
    const title = page.locator("h1");
    await expect(title).toBeVisible();

    // verification du contenu exact du titre
    await expect(title).toHaveText("Bienvenue sur Super Blog");

    // vérification de la présence du lien vers la liste des articles
    const link = page.locator('a[href="/posts"]');
    await expect(link).toBeVisible();
    await expect(link).toHaveText("Voir la liste des articles");
});
