// ======== NAVBAR ACTIVO ========
(function () {
    const here = location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.navbar .nav-link[data-page], .dropdown-menu .dropdown-item[data-page]')
        .forEach(a => {
            if (a.getAttribute('data-page') === here) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }

            const dd = a.closest('.dropdown');
            if (dd) {
                dd.querySelector('.nav-link.dropdown-toggle')?.classList.add('active');
            }
        });
})();

// ======== PRODUCTOS ========
window.PRODUCTOS = {
    1: { id: 1, cat: "Tortas Cuadradas", codigo: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, imagen: "img/torta-chocolate.png", descripcion: "Deliciosa torta de chocolate..." },
    2: { id: 2, cat: "Tortas Cuadradas", codigo: "TC002", nombre: "Torta Cuadrada de Frutas", precio: 50000, imagen: "img/torta-frutas.png", descripcion: "Una mezcla de frutas frescas..." },
    3: { id: 3, cat: "Tortas Circulares", codigo: "TT001", nombre: "Torta Circular de Vainilla", precio: 40000, imagen: "img/torta-vainilla.png", descripcion: "Bizcocho de vainilla clásico..." },
    4: { id: 4, cat: "Tortas Circulares", codigo: "TM001", nombre: "Torta Circular de Manjar", precio: 42000, imagen: "img/torta-manjar.png", descripcion: "Torta tradicional chilena..." },
    5: { id: 5, cat: "Postres Individuales", codigo: "PD001", nombre: "Mousse de Chocolate", precio: 5000, imagen: "img/mousse-chocolate.png", descripcion: "Cremoso y suave..." },
    6: { id: 6, cat: "Postres Individuales", codigo: "PT001", nombre: "Tiramisú Clásico", precio: 5500, imagen: "img/tiramisu.png", descripcion: "Un postre italiano..." },
    7: { id: 7, cat: "Productos Sin Azúcar", codigo: "PSA001", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, imagen: "img/torta-naranja-sin-azucar.png", descripcion: "Torta ligera y sabrosa..." },
    8: { id: 8, cat: "Productos Sin Azúcar", codigo: "PSA002", nombre: "Cheesecake Sin Azúcar", precio: 47000, imagen: "img/cheesecake-sin-azucar.png", descripcion: "Suave y cremoso..." },
    9: { id: 9, cat: "Pastelería Tradicional", codigo: "PM001", nombre: "Empanada de Manzana", precio: 3800, imagen: "img/empanada-manzana.png", descripcion: "Pastelería tradicional..." },
    10: { id: 10, cat: "Pastelería Tradicional", codigo: "TE002", nombre: "Tarta de Santiago", precio: 6000, imagen: "img/tarta-santiago.png", descripcion: "Tradicional tarta española..." },
    11: { id: 11, cat: "Productos Sin Gluten", codigo: "PG001", nombre: "Brownie Sin Gluten", precio: 4000, imagen: "img/brownie-sin-gluten.png", descripcion: "Rico y denso..." },
    12: { id: 12, cat: "Productos Sin Gluten", codigo: "PG002", nombre: "Pan Sin Gluten", precio: 3500, imagen: "img/pan-sin-gluten.png", descripcion: "Suave y esponjoso..." },
    13: { id: 13, cat: "Productos Vegana", codigo: "PV001", nombre: "Torta Vegana de Chocolate", precio: 50000, imagen: "img/torta-vegana-chocolate.png", descripcion: "Torta de chocolate húmeda..." },
    14: { id: 14, cat: "Productos Vegana", codigo: "PV002", nombre: "Galletas Veganas de Avena", precio: 4500, imagen: "img/galletas-avena.png", descripcion: "Crujientes y sabrosas..." },
    15: { id: 15, cat: "Tortas Especiales", codigo: "TE001", nombre: "Torta de Cumpleaños", precio: 55000, imagen: "img/torta-cumpleanos.png", descripcion: "Diseñada para celebraciones..." },
    16: { id: 16, cat: "Tortas Especiales", codigo: "TE002", nombre: "Torta de Boda", precio: 60000, imagen: "img/torta-boda.png", descripcion: "Elegante y deliciosa..." }
};

// Lista global de categorías 
window.CATEGORIAS = [
    "all",
    "Tortas Cuadradas",
    "Tortas Circulares",
    "Postres Individuales",
    "Productos Sin Azúcar",
    "Pastelería Tradicional",
    "Productos Sin Gluten",
    "Productos Vegana",
    "Tortas Especiales",
];



// ======== SESIÓN (LOGIN / LOGOUT) ========

// Maneja el inicio de sesión
function handleLogin(e) {
    e.preventDefault();
    localStorage.setItem("logueado", "true");
    localStorage.setItem("bienvenidaPendiente", "true");

    if (typeof closeNav === "function") closeNav();
    actualizarBotonSesion();
    window.location.href = "index.html";
}

// Cambia el botón del navbar
function actualizarBotonSesion() {
    const btnSesion = document.getElementById("btnSesion");
    if (!btnSesion) return;

    const logueado = localStorage.getItem("logueado") === "true";

    if (logueado) {
        btnSesion.textContent = "Cerrar sesión";
        btnSesion.onclick = () => {
            localStorage.removeItem("logueado");
            actualizarBotonSesion();
            window.location.href = "index.html";
        };
    } else {
        btnSesion.textContent = "Iniciar sesión";
        btnSesion.onclick = () => {
            if (typeof openNav === "function") openNav();
        };
    }
}

// Prellenado del email
function prefillLogin() {
    const preEmail = localStorage.getItem("preEmail");
    const loginUserInput = document.getElementById("loginUser");
    if (preEmail && loginUserInput) {
        loginUserInput.value = preEmail;
    }
}

// Mensaje de bienvenida
function mostrarBienvenidaSiCorresponde() {
    const pendiente = localStorage.getItem("bienvenidaPendiente") === "true";
    if (!pendiente) return;

    const main = document.querySelector("main.container");
    if (!main) {
        localStorage.removeItem("bienvenidaPendiente");
        return;
    }

    const email = localStorage.getItem("preEmail") || "¡Bienvenido!";
    const div = document.createElement("div");
    div.className = "alert alert-success alert-dismissible fade show mt-3";
    div.role = "alert";
    div.innerHTML = `👋 Bienvenido, <strong>${email}</strong>. Has iniciado sesión correctamente.
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

    main.prepend(div);
    localStorage.removeItem("bienvenidaPendiente");
}

// Inicializa cuando carga el documento
document.addEventListener("DOMContentLoaded", () => {
    actualizarBotonSesion();
    prefillLogin();
    mostrarBienvenidaSiCorresponde();
});


// ======== DESTACADOS (HOME) ========
window.renderDestacados = function () {
    const cont = document.getElementById("destacados");
    if (!cont || !window.PRODUCTOS) return;

    const ids = [1, 2, 3, 4]; // IDs de productos destacados
    cont.innerHTML = ids
        .map((id) => {
            const p = window.PRODUCTOS[id];
            if (!p) return "";
            return `
                <div class="col-6 col-md-3 mb-3">
                    <div class="card h-100 shadow-sm">
                        <img src="/${p.imagen}" class="card-img-top" alt="${p.nombre}">
                        <div class="card-body text-center">
                            <h6 class="card-title mb-1">${p.nombre}</h6>
                            <p class="fw-bold mb-2">
                                ${new Intl.NumberFormat("es-CL", {
                                    style: "currency",
                                    currency: "CLP",
                                    maximumFractionDigits: 0,
                                }).format(p.precio)}
                            </p>
                        </div>
                    </div>
                </div>`;
        })
        .join("");
};

// Ejecutar automáticamente al cargar la página de inicio
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    if (path.endsWith("/") || path.endsWith("index.html") || path.endsWith("/home")) {
        window.renderDestacados();
    }
});
