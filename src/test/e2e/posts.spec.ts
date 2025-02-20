import { test, expect } from "@playwright/test";

test("Page liste des articles - Vérification du contenu", async ({ page }) => {
    // accès à la page des articles
    await page.goto("http://localhost:3009/posts");

    // vérification de la présence du titre principal
    const title = page.locator("h1");
    await expect(title).toBeVisible();

    // vérification du contenu exact du titre
    await expect(title).toHaveText("Liste des articles");

    // vérification de la présence du bouton "Créer un article"
    const createButton = page.locator('a[href="/posts/new"]');
    await expect(createButton).toBeVisible();
    await expect(createButton).toHaveText("Nouvel article");

    // vérification du fonctionnement du bouton "Créer un article"
    await createButton.click();
    await expect(page).toHaveURL("http://localhost:3009/posts/new");
});
