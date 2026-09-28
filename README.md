# Pre-entrega 8 — Cafetería de Santi

Aplicación interactiva desarrollada con HTML, CSS y JavaScript para administrar los productos de una cafetería.

## Funcionalidades

- Mostrar productos mediante tarjetas generadas dinámicamente.
- Agregar productos con nombre, precio y stock.
- Validar campos vacíos, precios y cantidades.
- Buscar productos por nombre mientras se escribe.
- Limpiar la búsqueda con la tecla Escape.
- Eliminar productos.
- Mostrar mensajes de éxito y error en pantalla.
- Guardar los productos en `localStorage`.
- Recuperar automáticamente los productos al recargar la página.
- Sincronizar la interfaz y el almacenamiento al agregar o eliminar productos.

## Temas aplicados

- Clases y objetos.
- Arrays y funciones.
- Métodos de búsqueda y filtrado.
- Manipulación del DOM.
- Eventos.
- Template strings.
- Operador ternario.
- Operador nullish coalescing (`??`).
- Desestructuración de objetos.
- Persistencia mediante `localStorage`.
- Conversión de datos con `JSON.parse()` y `JSON.stringify()`.

## Cómo utilizarlo

1. Abrir `index.html` en el navegador o mediante Live Server.
2. Completar el nombre, el precio y el stock del producto.
3. Pulsar “Agregar producto”.
4. Utilizar el campo de búsqueda para filtrar la lista.
5. Presionar la tecla Escape para limpiar la búsqueda.
6. Pulsar “Eliminar” para quitar un producto.
7. Actualizar la página para comprobar que los cambios permanecen guardados.

## Persistencia de datos

Los productos se almacenan en `localStorage` como un array de objetos convertido a formato JSON.

Al abrir o actualizar la página, la aplicación recupera los productos guardados. Si todavía no existen datos almacenados, utiliza los productos iniciales.

Cada vez que se agrega o elimina un producto, se actualizan:

1. El array de JavaScript.
2. El contenido de `localStorage`.
3. La lista mostrada en pantalla.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Web Storage API