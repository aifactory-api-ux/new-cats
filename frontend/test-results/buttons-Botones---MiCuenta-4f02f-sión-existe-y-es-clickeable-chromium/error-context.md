# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buttons.spec.ts >> Botones - MiCuenta >> botón Cerrar Sesión existe y es clickeable
- Location: tests-functional/buttons.spec.ts:82:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /cerrar sesión/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /cerrar sesión/i })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - link "🐱 New Cats" [ref=e6] [cursor=pointer]:
        - /url: /
      - link "Catálogo" [ref=e7] [cursor=pointer]:
        - /url: /catalogo
    - generic [ref=e8]:
      - searchbox "Buscar..." [ref=e9]
      - link "🛒 Carrito" [ref=e10] [cursor=pointer]:
        - /url: /carrito
      - link "Mi Cuenta" [ref=e11] [cursor=pointer]:
        - /url: /cuenta
  - main [ref=e12]:
    - heading "Iniciar Sesión" [level=1] [ref=e13]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: Correo *
        - textbox [ref=e17]
      - generic [ref=e18]:
        - generic [ref=e19]: Contraseña *
        - textbox [ref=e20]
      - button "Iniciar Sesión" [ref=e21] [cursor=pointer]
      - paragraph [ref=e22]: ¿No tienes cuenta? Regístrate
  - contentinfo [ref=e23]:
    - paragraph [ref=e24]: © 2026 New Cats. Todos los derechos reservados.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Botones - BarraNavegacionSuperior', () => {
  4   |   test('enlace Catálogo existe y redirige', async ({ page }) => {
  5   |     await page.goto('/');
  6   |     const catalogoLink = page.locator('a[href="/catalogo"]').first();
  7   |     await expect(catalogoLink).toBeVisible();
  8   |     await catalogoLink.click();
  9   |     await expect(page).toHaveURL(/.*catalogo/);
  10  |   });
  11  | 
  12  |   test('enlace Carrito existe y redirige', async ({ page }) => {
  13  |     await page.goto('/');
  14  |     const carritoLink = page.locator('a[href="/carrito"]').first();
  15  |     await expect(carritoLink).toBeVisible();
  16  |     await carritoLink.click();
  17  |     await expect(page).toHaveURL(/.*carrito/);
  18  |   });
  19  | 
  20  |   test('enlace Mi Cuenta existe y redirige', async ({ page }) => {
  21  |     await page.goto('/');
  22  |     const cuentaLink = page.locator('a[href="/cuenta"]').first();
  23  |     await expect(cuentaLink).toBeVisible();
  24  |     await cuentaLink.click();
  25  |     await expect(page).toHaveURL(/.*cuenta/);
  26  |   });
  27  | });
  28  | 
  29  | test.describe('Botones - Inicio (Home)', () => {
  30  |   test('botón Ver Catálogo existe y redirige', async ({ page }) => {
  31  |     await page.goto('/');
  32  |     const catalogoBtn = page.getByRole('button', { name: /ver catálogo/i });
  33  |     await expect(catalogoBtn).toBeVisible();
  34  |     await expect(catalogoBtn).toBeEnabled();
  35  |     await catalogoBtn.click();
  36  |     await expect(page).toHaveURL(/.*catalogo/);
  37  |   });
  38  | });
  39  | 
  40  | test.describe('Botones - Catalogo', () => {
  41  |   test('botones de categoría existen y filtran', async ({ page }) => {
  42  |     await page.goto('/catalogo');
  43  |     const categoryBtns = page.locator('section button').filter({ hasText: /.+/ });
  44  |     const count = await categoryBtns.count();
  45  |     expect(count).toBeGreaterThan(0);
  46  |   });
  47  | 
  48  |   test('TarjetaProducto es clickeable y redirige', async ({ page }) => {
  49  |     await page.goto('/catalogo');
  50  |     const productCards = page.locator('[style*="cursor: pointer"]');
  51  |     const firstCard = productCards.first();
  52  |     await expect(firstCard).toBeVisible();
  53  |   });
  54  | });
  55  | 
  56  | test.describe('Botones - Carrito', () => {
  57  |   test('botones + y - existen y cambian cantidad', async ({ page }) => {
  58  |     await page.goto('/carrito');
  59  |     const incrementBtns = page.getByRole('button', { name: /\+/i });
  60  |     const decrementBtns = page.getByRole('button', { name: /-/i });
  61  |     await expect(incrementBtns.first()).toBeVisible();
  62  |     await expect(decrementBtns.first()).toBeVisible();
  63  |   });
  64  | 
  65  |   test('botón Proceder al Pago existe', async ({ page }) => {
  66  |     await page.goto('/carrito');
  67  |     const pagoBtn = page.getByRole('button', { name: /proceder al pago/i });
  68  |     await expect(pagoBtn).toBeVisible();
  69  |   });
  70  | });
  71  | 
  72  | test.describe('Botones - DetalleProducto', () => {
  73  |   test('botón Agregar al carrito existe y es clickeable', async ({ page }) => {
  74  |     await page.goto('/producto/1');
  75  |     const addBtn = page.getByRole('button', { name: /agregar al carrito/i });
  76  |     await expect(addBtn).toBeVisible();
  77  |     await expect(addBtn).toBeEnabled();
  78  |   });
  79  | });
  80  | 
  81  | test.describe('Botones - MiCuenta', () => {
  82  |   test('botón Cerrar Sesión existe y es clickeable', async ({ page }) => {
  83  |     await page.goto('/cuenta');
  84  |     const logoutBtn = page.getByRole('button', { name: /cerrar sesión/i });
> 85  |     await expect(logoutBtn).toBeVisible();
      |                             ^ Error: expect(locator).toBeVisible() failed
  86  |   });
  87  | 
  88  |   test('botón submit de formulario existe', async ({ page }) => {
  89  |     await page.goto('/cuenta');
  90  |     const submitBtn = page.getByRole('button', { name: /entrar|registrar|guardar/i });
  91  |     await expect(submitBtn.first()).toBeVisible();
  92  |   });
  93  | });
  94  | 
  95  | test.describe('Botones - Pago', () => {
  96  |   test('botón submit existe y procesa pago', async ({ page }) => {
  97  |     await page.goto('/pago');
  98  |     const submitBtn = page.getByRole('button', { name: /pagar|confirmar/i });
  99  |     await expect(submitBtn).toBeVisible();
  100 |     await expect(submitBtn).toBeEnabled();
  101 |   });
  102 | });
  103 | 
  104 | test.describe('Botones - Componentes UI', () => {
  105 |   test('Modal botón cerrar existe', async ({ page }) => {
  106 |     await page.goto('/');
  107 |     const closeBtn = page.locator('button[aria-label="close"], button:has-text("×"), button:has-text("Cerrar")');
  108 |     await expect(closeBtn.first()).toBeAttached();
  109 |   });
  110 | 
  111 |   test('Paginacion botones prev/next existen', async ({ page }) => {
  112 |     await page.goto('/catalogo');
  113 |     const prevBtn = page.locator('button:has-text("<"), button:has-text("anterior")');
  114 |     const nextBtn = page.locator('button:has-text(">"), button:has-text("siguiente")');
  115 |     if (await nextBtn.count() > 0) {
  116 |       await expect(nextBtn.first()).toBeVisible();
  117 |     }
  118 |   });
  119 | 
  120 |   test('SelectorCantidad botones + y - existen', async ({ page }) => {
  121 |     await page.goto('/producto/1');
  122 |     const plusBtn = page.locator('button:has-text("+")').first();
  123 |     const minusBtn = page.locator('button:has-text("-")').first();
  124 |     if (await plusBtn.count() > 0) {
  125 |       await expect(plusBtn).toBeVisible();
  126 |     }
  127 |     if (await minusBtn.count() > 0) {
  128 |       await expect(minusBtn).toBeVisible();
  129 |     }
  130 |   });
  131 | });
  132 | 
  133 | test.describe('Estados de Botones', () => {
  134 |   test('botón deshabilitado no responde a clicks', async ({ page }) => {
  135 |     await page.goto('/cuenta');
  136 |     const loginBtn = page.getByRole('button', { name: /entrar/i }).first();
  137 |     const isDisabled = await loginBtn.isDisabled();
  138 |     if (isDisabled) {
  139 |       await expect(loginBtn).toBeDisabled();
  140 |     }
  141 |   });
  142 | 
  143 |   test('botón en estado loading muestra texto Cargando', async ({ page }) => {
  144 |     await page.goto('/cuenta');
  145 |     const btn = page.locator('button:has-text("Cargando")');
  146 |     await expect(btn).toBeAttached();
  147 |   });
  148 | });
```