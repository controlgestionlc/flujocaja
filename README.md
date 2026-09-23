# Flujo de Caja Consolidado

App web instalable (PWA) para PC y celular. Se aloja en GitHub Pages y guarda los datos en Firebase Firestore.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La app completa |
| `config.js` | Configuración de Firebase (lo único que se edita) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Hacen la app instalable y usable sin conexión |
| `firestore.rules` | Reglas de seguridad para pegar en Firebase |
| `plantilla_registro_flujo_caja.xlsx` | Plantilla del formato de carga REGISTRO FLUJO CAJA |

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

> Sin `config.js` configurado la app funciona en **modo local** (datos solo en ese navegador), útil para probar. En la pantalla de bienvenida hay datos de ejemplo, y en Ajustes el respaldo JSON para migrar luego a Firebase.

## Uso

1. **Empresas y cuentas:** crea cada empresa, sus cuentas corrientes y marca una como *por defecto*. Actualiza el saldo con la cartola: el flujo parte de ese saldo.
2. **Importar:** elige la empresa y sube el Excel con el formato **REGISTRO FLUJO CAJA**: `TIPO · DOCUMENTO · NUMERO DOC · FECHA EMISION · VENCIMIENTO · RUT · AUXILIAR · IMPORTE A PAGAR`. Un mismo archivo trae ingresos y egresos.
   - FACTURA, BOLETA y NOTAS quedan como documentos por cobrar o por pagar; REMUNERACIONES, IMPOSICIONES, IMPUESTOS, LEASING, etc. quedan en su categoría.
   - **No se duplican datos:** antes de cargar se valida fila por fila. Se omiten los documentos ya ingresados (mismo RUT + documento + número, cargados antes o a mano), los movimientos ya existentes (misma categoría + RUT + vencimiento) y las filas repetidas dentro del archivo. Las filas sin importe o fecha se informan como error.
   - Si un documento ya ingresado viene con otro importe o vencimiento, se muestra la diferencia y puedes elegir actualizarlo (sin crear otro registro).
3. **Clientes y proveedores (auxiliar):** en *Empresas y cuentas › Clientes y proveedores*. Se llena solo al importar documentos, con *Generar desde documentos*, importando un Excel con RUT y nombre, o creando registros a mano (el RUT se valida con dígito verificador).
4. **Movimientos manuales:** al elegir *Cobranza clientes* o *Pago proveedores* la app exige el cliente o proveedor (buscador dinámico por RUT o nombre, con opción de crearlo ahí mismo) y el N° de documento. Si después ese documento llega en el Excel, el importado reemplaza al manual y conserva su cuenta y fecha reprogramada.
5. **Otros movimientos manuales:** créditos, leasing, remuneraciones, impuestos, etc. Con *Repetir N cuotas* se genera la serie completa (mensual, semanal, quincenal, trimestral o anual). *Traspaso* crea el egreso y el ingreso en ambas cuentas; si son empresas distintas queda como préstamo entre relacionadas y se compensa en el consolidado.
6. **Flujo:** vista diaria, semanal o mensual por empresa, por cuenta o del holding completo. La columna *Vencido* reúne lo pendiente con fecha pasada. Clic en una celda muestra sus documentos; clic en una etiqueta (categoría, saldo inicial, totales, flujo neto, saldo final) o en el encabezado de un período, o en las tarjetas superiores (saldo bancos, por cobrar, por pagar, saldo final, saldo mínimo), abre una ventana con el detalle: por contraparte, por período, lista con pagar/editar y exportación a Excel. El gráfico de saldo final se puede ver en barras o en línea; clic en una barra o punto abre el período. Se exporta a Excel.
7. **Dar por pagado:** en Movimientos (botón *✓ Pagar* o selección múltiple › *Dar por pagado*) se indica fecha y cuenta de pago. Lo pagado sale del flujo proyectado y mueve el **saldo teórico** de la cuenta. *Revertir pago* lo devuelve a pendiente.
8. **Conciliación (semanal):** saldo teórico = último saldo real ingresado + pagos y cobros dados por pagados después de esa fecha. Cada semana se ingresa el saldo real de la cartola y la app muestra la diferencia. El análisis lista los compromisos pendientes con fecha en el período (★ = importe igual a la diferencia) para darlos por pagados, y permite registrar el documento faltante. Si la diferencia no se explica con pendientes, falta registrar documentos.
9. **Reprogramar:** en Movimientos, selecciona documentos › *Reprogramar fecha*. La fecha original se conserva y la reprogramación no se pierde al reimportar.

### Rutina semanal sugerida
Importar el REGISTRO FLUJO CAJA › dar por pagados los compromisos que pasaron por el banco › ingresar el saldo real de cada cuenta en Conciliación › revisar diferencias › revisar el flujo.

## Versiones
La versión se ve junto al nombre en la barra superior; al hacer clic se abre el historial de cambios y el botón *Buscar actualización*. La sesión se cierra desde el círculo con las iniciales del usuario. Ajustes contiene solo Respaldo y Limpieza, y la app siempre abre en Flujo de caja.
Al publicar una versión nueva se actualizan juntos `APP_VERSION` en `index.html` y `VERSION` en `sw.js` (ej. `1.2.0` / `fcc-1.2.0`); así los equipos instalados descargan el cambio.

Versión actual: **1.8.2**
