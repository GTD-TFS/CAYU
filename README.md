# Campo WebApp (prueba PC)

App ligera para recogida de datos en campo con persistencia local fuerte y exportación JSON compatible con `generador-json-bookmarklet-offline.html`.

## Probar rápido

1. Abrir `campo-webapp/index.html` en el navegador.
2. Si el navegador bloquea recursos en `file://`, ejecutar servidor local:
   - `cd "/Users/javierbejarnavarrete/Desktop/SUPER APPS/Extranjería/campo-webapp"`
   - `python3 -m http.server 8080`
   - abrir `http://localhost:8080`

## Funciones

- Pantalla `Datos generales` ampliada con bloques de CNC, rescate, embarcación, viaje, estado CATE y policías intervinientes.
- Pantalla `Integrantes`: alta, edición y borrado.
- `Sexo` normalizado a `Masculino` / `Femenino`.
- Autocompletado con países africanos en `lugar nacimiento`, `país` y `nacionalidad`.
- Persistencia automática en `localStorage` tras cada cambio.
- `Guardar JSON`: descarga sesión compatible con el esquema de la app principal.
- `Cargar JSON`: permite reanudar sesión desde JSON compatible.
- `Limpiar`: borra almacenamiento local tras confirmación.

## Compatibilidad JSON

Se exporta con estructura:
- `schemaVersion`
- `commonData`
- `people[]` con `baseFields` completos y `extraFields`
- `screen2EditsByPersonId`
- `screen3Selection`
- `metadata`

Campos no mostrados en formulario de integrantes se fijan para compatibilidad:
- `tipoDocumento = "NIE"`
- `numDocumento = ""`
- `hablaCastellano = "NO"`
