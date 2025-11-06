(function () {
    const cont = document.getElementById("destacados");
    if (!window.PRODUCTOS || !cont) return;
    const ids = [1, 2, 3, 4];
    const cards = ids
        .map((id) => {
            const p = window.PRODUCTOS[id];
            if (!p) return "";
            return `
            <div className="col-6 col-md-3 mb-3">
              <div className="card h-100 shadow-sm">
                <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                <div className="card-body text-center">
                  <h6 className="card-title mb-1">${p.nombre}</h6>
                  <p className="fw-bold mb-2">${window.formatoCLP
                    ? formatoCLP(p.precio)
                    : "$" + Number(p.precio).toLocaleString("es-CL")
                }</p>
                  <button className="btn btn-outline-primary btn-sm" onclick="agregarPastel(${p.id
                })">Agregar</button>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
    cont.innerHTML =
        cards || '<p className="text-muted">No hay productos para mostrar.</p>';
})();

// Agregar al carrito
function agregarPastel(id) {
    const p = window.PRODUCTOS?.[id];
    if (!p) return alert("Producto no encontrado");

    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const idx = carrito.findIndex((x) => x.id === p.id);

    if (idx >= 0) {
        carrito[idx].cantidad += 1;
        carrito[idx].total =
            carrito[idx].cantidad * Number(carrito[idx].precio);
    } else {
        carrito.push({
            id: p.id,
            codigo: p.codigo,
            nombre: p.nombre,
            precio: Number(p.precio),
            cantidad: 1,
            total: Number(p.precio),
            imagen: p.imagen,
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    const btn = document.activeElement;
    if (btn && btn.tagName === "BUTTON") {
        const old = btn.textContent;
        btn.textContent = "Agregado ✓";
        setTimeout(() => (btn.textContent = old), 900);
    }
}
window.agregarPastel = agregarPastel;



const overlayEl = document.getElementById("loginOverlay");
const authTitle = document.getElementById("authTitle");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");
const regPass = document.getElementById("regPass");
const regPass2 = document.getElementById("regPass2");
const matchHelp = document.getElementById("matchHelp");

function openNav() {
    overlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
    showLogin();
}
function closeNav() {
    overlayEl.classList.remove("open");
    document.body.style.overflow = "";
}


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
});


overlayEl.addEventListener("click", (e) => {
    if (e.target === overlayEl) closeNav();
});

function showRegister() {
    authTitle.textContent = "Crear cuenta";
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    document.getElementById("regEmail")?.focus();
}

function showLogin() {
    authTitle.textContent = "Iniciar Sesión";
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
}

goRegister.addEventListener("click", (e) => {
    e.preventDefault();
    showRegister();
});
goLogin.addEventListener("click", (e) => {
    e.preventDefault();
    showLogin();
});


function checkMatch() {
    if (!regPass || !regPass2) return true;
    const ok = regPass.value === regPass2.value;
    matchHelp.style.display = ok ? "none" : "block";
    regPass2.classList.toggle("is-invalid", !ok);
    return ok;
}
regPass?.addEventListener("input", checkMatch);
regPass2?.addEventListener("input", checkMatch);


function handleRegister(e) {
    e.preventDefault();
    if (!checkMatch()) return;
    alert("¡Cuenta creada con éxito! 🎉");
    showLogin();
}
window.handleRegister = handleRegister;