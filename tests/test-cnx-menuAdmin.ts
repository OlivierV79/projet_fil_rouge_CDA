import { test, expect } from '@playwright/test';

test('connexion admin et affichage du menu admin', async ({ page }) => {
  // Aller sur la page de connexion
  await page.goto('http://localhost:5173/login');

  // Remplir le formulaire de connexion
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'admin');
  await page.click('button[type="submit"]');

  // Vérifier que l'URL est redirigée vers l'accueil (ou une autre page attendue)
  await expect(page).toHaveURL('http://localhost:5173/');

  // Vérifier la présence des entrées de menu spécifiques à l'admin
  await expect(page.locator('nav')).toContainText('Accueil');
  await expect(page.locator('nav')).toContainText('Statistiques');
  await expect(page.locator('nav')).toContainText('Gestion membres');
  await expect(page.locator('nav')).toContainText('Suivi rdv');
  await expect(page.locator('nav')).toContainText('Documents');
  await expect(page.locator('nav')).toContainText('Déconnexion');
});

