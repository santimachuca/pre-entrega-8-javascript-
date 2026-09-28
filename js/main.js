class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

const productosIniciales = [
    new Producto(1, "Café", 2500, 10),
    new Producto(2, "Té", 1800, 8),
    new Producto(3, "Medialuna", 1200, 15)
];

const productosGuardados = JSON.parse(
    localStorage.getItem("productos")
);

const productos = productosGuardados ?? productosIniciales;

function guardarProductos() {
    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}

guardarProductos();

let proximoId =
    productos.length > 0
        ? Math.max(...productos.map((producto) => producto.id)) + 1
        : 1;

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
const botonAgregar = document.getElementById("botonAgregar");
const mensaje = document.getElementById("mensaje");
const busqueda = document.getElementById("busqueda");
const cantidadProductos = document.getElementById("cantidadProductos");
const contenedorProductos = document.getElementById("contenedorProductos");

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.classList.remove("exito", "error");
    mensaje.classList.add(tipo);
}

function mostrarProductos(lista) {
    contenedorProductos.innerHTML = "";

    cantidadProductos.textContent =
        "Productos encontrados: " + lista.length;

    if (lista.length === 0) {
        contenedorProductos.textContent =
            "No se encontraron productos.";
        return;
    }

    lista.forEach(function (producto) {
        const { id, nombre, precio, stock } = producto;

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <h3></h3>
            <p>Precio: $${precio}</p>
            <p>Stock: ${stock}</p>
            <button class="eliminar" type="button">
                Eliminar
            </button>
        `;

        tarjeta.querySelector("h3").textContent = nombre;

        const botonEliminar =
            tarjeta.querySelector(".eliminar");

        botonEliminar.addEventListener("click", function () {
            const indice = productos.findIndex(function (item) {
                return item.id === id;
            });

            if (indice === -1) {
                return;
            }

            productos.splice(indice, 1);
            guardarProductos();
            actualizarVista();

            mostrarMensaje(
                "Producto eliminado: " + nombre,
                "exito"
            );
        });

        contenedorProductos.appendChild(tarjeta);
    });
}

function actualizarVista() {
    const textoBuscado =
        busqueda.value.trim().toLowerCase();

    const productosFiltrados = productos.filter(
        function (producto) {
            return producto.nombre
                .toLowerCase()
                .includes(textoBuscado);
        }
    );

    mostrarProductos(productosFiltrados);
}

function agregarProducto() {
    const nombreIngresado = nombre.value.trim();
    const precioIngresado = Number(precio.value);
    const stockIngresado = Number(stock.value);

    if (
        nombreIngresado === "" ||
        precio.value.trim() === "" ||
        stock.value.trim() === ""
    ) {
        mostrarMensaje(
            "Completá todos los campos.",
            "error"
        );
        return;
    }

    if (
        !Number.isFinite(precioIngresado) ||
        precioIngresado <= 0
    ) {
        mostrarMensaje(
            "Ingresá un precio mayor a cero.",
            "error"
        );
        return;
    }

    if (
        !Number.isInteger(stockIngresado) ||
        stockIngresado < 0
    ) {
        mostrarMensaje(
            "El stock debe ser un número entero igual o mayor a cero.",
            "error"
        );
        return;
    }

    const nuevoProducto = new Producto(
        proximoId,
        nombreIngresado,
        precioIngresado,
        stockIngresado
    );

    productos.push(nuevoProducto);
    proximoId++;

    guardarProductos();

    formulario.reset();
    busqueda.value = "";
    actualizarVista();

    mostrarMensaje(
        "Producto agregado: " + nombreIngresado,
        "exito"
    );

    nombre.focus();
}

botonAgregar.addEventListener("click", function () {
    if (botonAgregar.type !== "submit") {
        agregarProducto();
    }
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    agregarProducto();
});

busqueda.addEventListener("input", actualizarVista);

busqueda.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        busqueda.value = "";
        actualizarVista();

        mostrarMensaje(
            "Búsqueda limpiada.",
            "exito"
        );
    }
});

actualizarVista();