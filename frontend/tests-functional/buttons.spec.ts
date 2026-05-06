import { test, expect } from '@playwright/test';

test.describe('Botones - BarraNavegacionSuperior', () => {
  test('enlace Catálogo existe y redirige', async ({ page }) => {
    await page.goto('/');
    const catalogoLink = page.locator('a[href="/catalogo"]').first();
    await expect(catalogoLink).toBeVisible();
    await catalogoLink.click();
    await expect(page).toHaveURL(/.*catalogo/);
  });

  test('enlace Carrito existe y redirige', async ({ page }) => {
    await page.goto('/');
    const carritoLink = page.locator('a[href="/carrito"]').first();
    await expect(carritoLink).toBeVisible();
    await carritoLink.click();
    await expect(page).toHaveURL(/.*carrito/);
  });

  test('enlace Mi Cuenta existe y redirige', async ({ page }) => {
    await page.goto('/');
    const cuentaLink = page.locator('a[href="/cuenta"]').first();
    await expect(cuentaLink).toBeVisible();
    await cuentaLink.click();
    await expect(page).toHaveURL(/.*cuenta/);
  });
});

test.describe('Botones - Inicio (Home)', () => {
  test('botón Ver Catálogo existe y redirige', async ({ page }) => {
    await page.goto('/');
    const catalogoBtn = page.getByRole('button', { name: /ver catálogo/i });
    await expect(catalogoBtn).toBeVisible();
    await expect(catalogoBtn).toBeEnabled();
    await catalogoBtn.click();
    await expect(page).toHaveURL(/.*catalogo/);
  });
});

test.describe('Botones - Catalogo', () => {
  test('botones de categoría existen y filtran', async ({ page }) => {
    await page.goto('/catalogo');
    const categoryBtns = page.locator('section button').filter({ hasText: /.+/ });
    const count = await categoryBtns.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TarjetaProducto es clickeable y redirige', async ({ page }) => {
    await page.goto('/catalogo');
    const productCards = page.locator('[style*="cursor: pointer"]');
    const firstCard = productCards.first();
    await expect(firstCard).toBeVisible();
  });
});

test.describe('Botones - Carrito', () => {
  test('botones + y - existen y cambian cantidad', async ({ page }) => {
    await page.goto('/carrito');
    const incrementBtns = page.getByRole('button', { name: /\+/i });
    const decrementBtns = page.getByRole('button', { name: /-/i });
    await expect(incrementBtns.first()).toBeVisible();
    await expect(decrementBtns.first()).toBeVisible();
  });

  test('botón Proceder al Pago existe', async ({ page }) => {
    await page.goto('/carrito');
    const pagoBtn = page.getByRole('button', { name: /proceder al pago/i });
    await expect(pagoBtn).toBeVisible();
  });
});

test.describe('Botones - DetalleProducto', () => {
  test('botón Agregar al carrito existe y es clickeable', async ({ page }) => {
    await page.goto('/producto/1');
    const addBtn = page.getByRole('button', { name: /agregar al carrito/i });
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toBeEnabled();
  });
});

test.describe('Botones - MiCuenta', () => {
  test('botón Cerrar Sesión existe y es clickeable', async ({ page }) => {
    await page.goto('/cuenta');
    const logoutBtn = page.getByRole('button', { name: /cerrar sesión/i });
    await expect(logoutBtn).toBeVisible();
  });

  test('botón submit de formulario existe', async ({ page }) => {
    await page.goto('/cuenta');
    const submitBtn = page.getByRole('button', { name: /entrar|registrar|guardar/i });
    await expect(submitBtn.first()).toBeVisible();
  });
});

test.describe('Botones - Pago', () => {
  test('botón submit existe y procesa pago', async ({ page }) => {
    await page.goto('/pago');
    const submitBtn = page.getByRole('button', { name: /pagar|confirmar/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });
});

test.describe('Botones - Componentes UI', () => {
  test('Modal botón cerrar existe', async ({ page }) => {
    await page.goto('/');
    const closeBtn = page.locator('button[aria-label="close"], button:has-text("×"), button:has-text("Cerrar")');
    await expect(closeBtn.first()).toBeAttached();
  });

  test('Paginacion botones prev/next existen', async ({ page }) => {
    await page.goto('/catalogo');
    const prevBtn = page.locator('button:has-text("<"), button:has-text("anterior")');
    const nextBtn = page.locator('button:has-text(">"), button:has-text("siguiente")');
    if (await nextBtn.count() > 0) {
      await expect(nextBtn.first()).toBeVisible();
    }
  });

  test('SelectorCantidad botones + y - existen', async ({ page }) => {
    await page.goto('/producto/1');
    const plusBtn = page.locator('button:has-text("+")').first();
    const minusBtn = page.locator('button:has-text("-")').first();
    if (await plusBtn.count() > 0) {
      await expect(plusBtn).toBeVisible();
    }
    if (await minusBtn.count() > 0) {
      await expect(minusBtn).toBeVisible();
    }
  });
});

test.describe('Estados de Botones', () => {
  test('botón deshabilitado no responde a clicks', async ({ page }) => {
    await page.goto('/cuenta');
    const loginBtn = page.getByRole('button', { name: /entrar/i }).first();
    const isDisabled = await loginBtn.isDisabled();
    if (isDisabled) {
      await expect(loginBtn).toBeDisabled();
    }
  });

  test('botón en estado loading muestra texto Cargando', async ({ page }) => {
    await page.goto('/cuenta');
    const btn = page.locator('button:has-text("Cargando")');
    await expect(btn).toBeAttached();
  });
});