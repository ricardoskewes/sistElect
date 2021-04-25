# Sistema Electoral – HackMX 2021
## Reto IBM
Un sistema electoral moderno y eficiente, como propuesta para las siguientes elecciones.

---

El equipo 27: Pingüinos Tácticos, para el reto IBM decidimos hacer un sistema de votaciones híbrido, que combina el método actual de conteo de votos con una propuesta innovadora, utilizando TI...


---

## Prototipo 1

### Descripción general

Esta propuesta considera un servidor [server.js](backend/s/server/server.js) y una interfaz de usuario [ui.html](frontend/observadores/ui.html) que están en constante comunicación.

El servidor se dedica únicamente a distribuir información de una IU a otra: de los cuentavotos a los observadores.

```
NOTA: No hay una IU para los cuentavotos en esta propuesta (aún), solo para los observadores.
```

En [ui.html](frontend/observadores/ui.html) el observador elige una casilla (en el proyecto original, la idea es que sea mediante el escaneo de un código QR) haciéndo click en un botón.
Posteriormente ingresa a la página de confirmación de voto, donde se muestra una imagen y aparecen dos botones: `De acuerdo` y `En desacuerdo`.

```
NOTA: Actualmente los botones no hacen nada.
```

Junto con la imagen, hay un contador, que cuenta 5 segundos para cambiar de boleta automáticamente.

### Notas técnicas

- IU almacena localmente la casilla correspondiente con una variable.
- IU pide al servidor la cantidad de imágenes necesarias para llenar el búfer de imágenes, con un límite de `BUFFER_BOLETAS`.
- El servidor regresa un arreglo en formato JSON de objetos con dos elementos:
    - `img` - la dirección de la imagen
    - `partido` - lo que el cuentavotos entendió que estaba marcado en la boleta
- El servidor actualmente NO tiene una base de datos.
- El servidor actualmente NO considera las diferentes casillas.
- El servidor actualmente NO lleva el conteo de votos.
