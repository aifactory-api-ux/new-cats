# COVERAGE REPORT

---

## Pruebas Funcionales de Botones

| Métrica | Valor |
|---------|-------|
| Estado | PARCIAL |
| Botones testeados | 17 |
| Botones pasados | 8 |
| Botones fallidos | 9 |

### Detalle de Botones

| Componente | Botón | Tipo | Estado |
|------------|-------|------|--------|
| BarraNavegacionSuperior | Catálogo | navigation (link) | PASS |
| BarraNavegacionSuperior | Carrito | navigation (link) | PASS |
| BarraNavegacionSuperior | Mi Cuenta | navigation (link) | PASS |
| Inicio | Ver Catálogo | click | PASS |
| Catalogo | TarjetaProducto | click | PASS |
| Pago | Pagar | submit | PASS |
| Paginacion | prev/next | click | PASS |
| SelectorCantidad | + y - | click | PASS |
| Catalogo | botones categoría | click | FAIL |
| Carrito | + y - cantidad | click | FAIL |
| Carrito | Proceder al Pago | click | FAIL |
| DetalleProducto | Agregar al carrito | click | FAIL |
| MiCuenta | Cerrar Sesión | click | FAIL |
| MiCuenta | submit formulario | submit | FAIL |
| Modal | botón cerrar | click | FAIL |
| Estados | botón deshabilitado | disabled | FAIL |
| Estados | botón loading | loading | FAIL |

### Botones No Testeados
- Botón 'Guardar' en ProfileForm.tsx (no interactuable en test environment)
- Botón de búsqueda en BarraNavegacionSuperior (onSearch no vinculadas a elementos visuales)
- Botón 'Ver más' en TarjetaProducto (si existe)

### Fallos Detectados

- `botones de categoría existen y filtran` — no se encontraron botones de categoría en /catalogo
  - Causa: los botones de categoría no son visibles o no existen en el estado actual de la página

- `botones + y - existen y cambian cantidad` — el carrito está vacío, no se renderizan los botones
  - Archivo: src/pages/Carrito.tsx
  - Causa: la página Carrito solo muestra botones cuando hay items en el carrito

- `botón Proceder al Pago existe` — no se encuentra el botón
  - Archivo: src/pages/Carrito.tsx
  - Causa: misma que arriba — el carrito está vacío y no muestra el botón

- `botón Agregar al carrito existe y es clickeable` — no se encuentra el botón
  - Archivo: src/pages/DetalleProducto.tsx
  - Causa: la ruta /producto/1 no carga correctamente o el producto no existe

- `botón Cerrar Sesión existe y es clickeable` — no se encuentra el botón
  - Archivo: src/pages/MiCuenta.tsx
  - Causa: la página /cuenta no carga correctamente

- `botón submit de formulario existe` — no se encuentra el botón
  - Archivo: src/pages/MiCuenta.tsx
  - Causa: misma que arriba

- `Modal botón cerrar existe` — no se encuentra el botón
  - Archivo: src/components/ui/Modal.tsx
  - Causa: el modal no se abre en la página de inicio sin una acción previa

- `botón deshabilitado no responde a clicks` — timeout esperando el botón
  - Archivo: src/pages/MiCuenta.tsx
  - Causa: la página no carga correctamente

- `botón en estado loading muestra texto Cargando` — no se encuentra el elemento
  - Archivo: src/components/ui/BotonPrimario.tsx
  - Causa: el estado loading no se activa en los tests