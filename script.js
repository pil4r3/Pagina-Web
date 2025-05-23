// Catálogo de productos
const productos = {
    cafe: [
        { id: 1, nombre: 'Café', precio: 500, tiempo: 3 },
        { id: 2, nombre: 'Café con Leche', precio: 600, tiempo: 4 },
        { id: 3, nombre: 'Lágrima', precio: 550, tiempo: 3 },
        { id: 4, nombre: 'Cortado', precio: 550, tiempo: 3 },
        { id: 5, nombre: 'Cappuccino', precio: 700, tiempo: 5 },
        { id: 6, nombre: 'Submarino', precio: 800, tiempo: 5 }
    ],
    bebidas: [
        { id: 7, nombre: 'Jugo de Naranja Natural', precio: 700, tiempo: 5 },
        { id: 8, nombre: 'Chocolatada', precio: 650, tiempo: 4 },
        { id: 9, nombre: 'Limonada', precio: 600, tiempo: 4 }
    ],
    pasteleria: [
        { id: 10, nombre: 'Medialuna', precio: 250, tiempo: 2 },
        { id: 11, nombre: 'Medialuna de Jamón y Queso', precio: 400, tiempo: 3 },
        { id: 12, nombre: 'Factura de Crema', precio: 300, tiempo: 2 },
        { id: 13, nombre: 'Alfajor', precio: 450, tiempo: 1 },
        { id: 14, nombre: 'Alfajor de Pistacho', precio: 600, tiempo: 1 },
        { id: 15, nombre: 'Porción de Torta', precio: 900, tiempo: 3 },
        { id: 16, nombre: 'Brownie', precio: 700, tiempo: 2 },
        { id: 17, nombre: 'Scón de Queso', precio: 500, tiempo: 3 }
    ],
    ensaladas: [
        { id: 18, nombre: 'Ensalada César', precio: 1400, tiempo: 8, descripcion: 'Lechuga, pollo grillado, croutones, queso parmesano y aderezo césar' },
        { id: 19, nombre: 'Ensalada Mediterránea', precio: 1300, tiempo: 8, descripcion: 'Mix de hojas verdes, tomate cherry, aceitunas, queso feta, pepino y vinagreta' },
        { id: 20, nombre: 'Ensalada Proteica', precio: 1500, tiempo: 8, descripcion: 'Quinoa, garbanzos, aguacate, huevo, atún y semillas' },
        { id: 21, nombre: 'Ensalada Primavera', precio: 1200, tiempo: 8, descripcion: 'Rúcula, pera, nueces, queso azul y vinagreta de miel' }
    ],
    sandwiches: [
        { id: 22, nombre: 'Sándwich de Pollo', precio: 1300, tiempo: 7, descripcion: 'Pollo grillado, lechuga, tomate, mayonesa' },
        { id: 23, nombre: 'Club Sándwich', precio: 1400, tiempo: 8, descripcion: 'Pollo, jamón, huevo, lechuga, tomate, panceta' },
        { id: 24, nombre: 'Sándwich Vegetariano', precio: 1200, tiempo: 7, descripcion: 'Berenjenas, zucchini, morrón asado, hummus' },
        { id: 25, nombre: 'Sándwich Caprese', precio: 1100, tiempo: 6, descripcion: 'Tomate, mozzarella, albahaca, aceite de oliva' }
    ],
    wraps: [
        { id: 26, nombre: 'Wrap de Pollo', precio: 1200, tiempo: 7, descripcion: 'Pollo, lechuga, tomate, queso crema' },
        { id: 27, nombre: 'Wrap Vegetariano', precio: 1100, tiempo: 7, descripcion: 'Vegetales grillados, hummus, rúcula' },
        { id: 28, nombre: 'Wrap César', precio: 1300, tiempo: 7, descripcion: 'Pollo, lechuga, parmesano, salsa césar' }
    ],
    empanadas: [
        { id: 29, nombre: 'Empanada de Carne', precio: 400, tiempo: 3 },
        { id: 30, nombre: 'Empanada de Pollo', precio: 400, tiempo: 3 },
        { id: 31, nombre: 'Empanada de Jamón y Queso', precio: 400, tiempo: 3 },
        { id: 32, nombre: 'Empanada de Verdura', precio: 400, tiempo: 3 }
    ]
};

// Estado del carrito
let carrito = [];
let categoriaActual = 'cafe';

// Función para mostrar productos según la categoría
function filtrarProductos(categoria) {
    categoriaActual = categoria;
    const contenedor = document.querySelector('.productos-container');
    contenedor.innerHTML = '';
    
    productos[categoria].forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.className = 'producto';
        productoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <p class="tiempo">Tiempo: ${producto.tiempo} min</p>
            ${producto.descripcion ? `<p class="descripcion">${producto.descripcion}</p>` : ''}
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al pedido</button>
        `;
        contenedor.appendChild(productoElement);
    });
}

// Función para actualizar el contador de items y visibilidad del botón
function actualizarContadorItems() {
    const contador = document.getElementById('contador-items');
    const botonFlotante = document.getElementById('ver-pedido');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    contador.textContent = totalItems;
    
    // Mostrar u ocultar el botón según si hay items
    if (totalItems > 0) {
        botonFlotante.classList.remove('oculto');
    } else {
        botonFlotante.classList.add('oculto');
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    let producto;
    for (let cat in productos) {
        producto = productos[cat].find(p => p.id === id);
        if (producto) break;
    }
    
    if (producto) {
        const itemExistente = carrito.find(item => item.id === id);
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();
        actualizarContadorItems();
    }
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const contenedor = document.querySelector('.carrito-container');
    const carritoVacio = document.getElementById('carrito-vacio');
    const carritoItems = document.querySelector('.carrito-items');
    let total = 0;
    
    if (carrito.length === 0) {
        carritoVacio.style.display = 'block';
        carritoItems.style.display = 'none';
        return;
    }

    carritoVacio.style.display = 'none';
    carritoItems.style.display = 'block';
    contenedor.innerHTML = '';
    
    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <div class="item-info">
                <span class="item-nombre">${item.nombre}</span>
                <span class="item-cantidad">Cantidad: ${item.cantidad}</span>
            </div>
            <span class="item-precio">$${item.precio * item.cantidad}</span>
            <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar">
                <span class="icon">🗑️</span>
            </button>
        `;
        contenedor.appendChild(itemElement);
        total += item.precio * item.cantidad;
    });
    
    document.getElementById('total-pago').textContent = `$${total}`;
    
    // Actualizar tiempo de preparación estimado
    const tiempoMaxPreparacion = Math.max(...carrito.map(item => item.tiempo));
    document.getElementById('tiempo-preparacion').textContent = tiempoMaxPreparacion;
}

// Función para eliminar items del carrito
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
        actualizarContadorItems();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    actualizarContadorItems();
}

// Función para mostrar/ocultar el carrito en móviles
function mostrarCarrito() {
    const carritoSection = document.getElementById('carrito');
    carritoSection.scrollIntoView({ behavior: 'smooth' });
}

// Función para mostrar la confirmación del pedido
function mostrarConfirmacion(nombre, hora, tiempoPreparacion) {
    const confirmacion = document.getElementById('confirmacion-pedido');
    confirmacion.innerHTML = `
        <div class="confirmacion-contenido">
            <h3>¡Pedido confirmado! ✨</h3>
            <p class="confirmacion-nombre"><strong>${nombre}</strong>, tu pedido estará listo para retirar a las ${hora}.</p>
            <p class="confirmacion-tiempo">Tiempo estimado de preparación: ${tiempoPreparacion} minutos</p>
            <p class="confirmacion-nota">Te esperamos en nuestro local 😊</p>
        </div>
    `;
    confirmacion.scrollIntoView({ behavior: 'smooth' });
}

// Actualizar el manejador del formulario
document.getElementById('form-pedido').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (carrito.length === 0) {
        mostrarNotificacion('Agrega productos a tu pedido');
        return;
    }
    
    const nombre = document.getElementById('nombreCliente').value;
    const hora = document.getElementById('horaRetiro').value;
    
    // Calcular tiempo máximo de preparación
    const tiempoMaxPreparacion = Math.max(...carrito.map(item => item.tiempo));
    
    // Validar que la hora de retiro sea posterior al tiempo de preparación
    const horaActual = new Date();
    const horaRetiro = new Date();
    const [horas, minutos] = hora.split(':');
    horaRetiro.setHours(horas, minutos);
    
    const tiempoMinimo = new Date(horaActual.getTime() + tiempoMaxPreparacion * 60000);
    
    if (horaRetiro < tiempoMinimo) {
        mostrarNotificacion(`El tiempo mínimo de preparación es de ${tiempoMaxPreparacion} minutos`);
        return;
    }
    
    // Mostrar confirmación y limpiar carrito
    mostrarConfirmacion(nombre, hora, tiempoMaxPreparacion);
    vaciarCarrito();
});

// Inicializar la vista de productos y el contador
document.addEventListener('DOMContentLoaded', () => {
    filtrarProductos('cafe');
    actualizarContadorItems();
}); 