# FluxCaja · Flujo de caja multiempresa

App web instalable (PWA) para PC y celular. Se aloja en GitHub Pages y guarda los datos en Firebase Firestore.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa |
| `config.js` | Configuración de Firebase (lo único que se edita) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Hacen la app instalable y usable sin conexión |
| `firestore.rules` | Reglas de seguridad para pegar en Firebase |
| `plantilla_documentos.xlsx` | Plantilla de importación si no se usa el export del ERP |

## Puesta en marcha

### 1. Firebase
1. Entra a console.firebase.google.com y crea un proyecto (o usa uno existente: las colecciones llevan prefijo `fc_`, así que no chocan con otras apps).
2. **Firestore Database** › Crear base de datos › modo producción › región `southamerica-east1` (São Paulo).
3. **Firestore › Reglas**: pega el contenido de `firestore.rules` y publica.
4. **Authentication** › Comenzar › habilita **Correo electrónico/contraseña** › pestaña Usuarios › agrega tu usuario (y los de quienes usarán la app).
5. **Configuración del proyecto** › Tus apps › icono Web `</>` › registra la app › copia el objeto `firebaseConfig` y pégalo en `config.js`.
6. **Authentication › Configuración › Dominios autorizados**: agrega `tuusuario.github.io`.

### 2. GitHub Pages
1. Crea un repositorio (ej. `fluxcaja`) y sube todos los archivos de esta carpeta, incluida `icons/`.
2. Settings › Pages › Source: *Deploy from a branch* › `main` / root › Save.
3. En 1-2 minutos queda en `https://tuusuario.github.io/fluxcaja/`.

### 3. Instalar
- **PC (Chrome/Edge):** icono de instalar en la barra de direcciones.
- **Android (Chrome):** menú ⋮ › Instalar app.
- **iPhone (Safari):** Compartir › Agregar a pantalla de inicio.

> Sin `config.js` configurado la app funciona en **modo local** (datos solo en ese navegador), útil para probar. En Ajustes hay datos de ejemplo y respaldo JSON para migrar luego a Firebase.

## Uso

1. **Empresas y cuentas:** crea cada empresa, sus cuentas corrientes y marca una como *por defecto*. Actualiza el saldo con la cartola: el flujo parte de ese saldo.
2. **Importar:** elige empresa y tipo (por pagar / por cobrar), sube el Excel y revisa el mapeo de columnas (se recuerda para la próxima vez).
   - Cada documento se identifica por empresa + RUT + tipo + folio, así que reimportar **actualiza** y no duplica.
   - Los que ya no vienen en el archivo se pueden marcar como pagados automáticamente (casilla activa por defecto).
   - Si el Excel trae una columna de cuenta bancaria (N° o alias), se asigna esa cuenta; si no, la cuenta por defecto.
3. **Movimientos manuales:** créditos, leasing, remuneraciones, impuestos, etc. Con *Repetir N cuotas* se genera la serie completa (mensual, semanal, quincenal, trimestral o anual). *Traspaso* crea el egreso y el ingreso en ambas cuentas; si son empresas distintas queda como préstamo entre relacionadas y se compensa en el consolidado.
4. **Flujo:** vista diaria, semanal o mensual por empresa, por cuenta o del holding completo. La columna *Vencido* reúne lo pendiente con fecha pasada. Clic en una celda muestra el detalle. Se exporta a Excel.
5. **Reprogramar:** en Movimientos, selecciona documentos › *Reprogramar fecha*. La fecha original se conserva y la reprogramación no se pierde al reimportar.

### Rutina sugerida
Actualizar saldos bancarios › importar CxP y CxC del ERP › marcar pagados los manuales que ya salieron › revisar el flujo.

## Actualizar la app
Tras cambiar `index.html`, sube la versión en `sw.js` (`fluxcaja-v1` → `fluxcaja-v2`) para que los equipos instalados tomen la nueva versión.
