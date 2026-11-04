import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    page.on('pageerror', (error) => {
        throw error;
    });
});

test('home renders, switches flavors and has no broken images', async ({ page }) => {
    await page.goto('/?lang=fr');
    await expect(page.locator('h1')).toContainText('Orange');
    await page.locator('#shop').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Saveur Pomme' }).last().click();
    await expect(page.locator('#product h2')).toContainText('Pomme');

    const broken = await page.locator('img').evaluateAll((imgs) =>
        imgs.filter((img) => img.complete && img.currentSrc && img.naturalWidth === 0).map((img) => img.currentSrc)
    );
    expect(broken).toEqual([]);
});

test('cart flow prepares an order', async ({ page }) => {
    await page.goto('/?lang=fr');
    const addButtons = page.getByRole('button', { name: /ajouter au panier/i });
    await addButtons.first().scrollIntoViewIfNeeded();
    await addButtons.first().click();
    await addButtons.nth(1).click();
    await expect(page.getByTestId('cart-count')).toHaveText('2');

    await page.getByRole('button', { name: /ouvrir le panier/i }).click();
    const drawer = page.getByRole('dialog', { name: 'Votre panier' });
    await expect(drawer).toBeVisible();
    await drawer.getByRole('button', { name: /ajouter une canette orange/i }).click();
    await expect(drawer.getByTestId('qty-orange')).toHaveText('2');

    await page.reload();
    await expect(page.getByTestId('cart-count')).toHaveText('3');
});

test('language switch translates the page', async ({ page }) => {
    await page.goto('/?lang=fr');
    await page.getByRole('button', { name: 'Switch to English' }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#faq h2')).toHaveText('FAQ');
    await expect(page.getByRole('button', { name: /does bavaria contain alcohol/i })).toBeVisible();
});

test('legal pages are reachable', async ({ page }) => {
    await page.goto('/mentions-legales?lang=fr');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mentions légales');
    await page.goto('/confidentialite?lang=en');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy policy');
});

test('SEO files are served', async ({ request }) => {
    expect((await request.get('/robots.txt')).ok()).toBeTruthy();
    expect(await (await request.get('/sitemap.xml')).text()).toContain('<urlset');
});
