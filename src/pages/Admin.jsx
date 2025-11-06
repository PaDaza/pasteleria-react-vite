import { useEffect, useMemo, useState } from "react";


const LS_PROD = "admin_productos";
const LS_USER = "admin_usuarios";
const fmtCLP = (n) =>
    Number(n || 0).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    });


function ensureScriptMain() {
    if (document.querySelector(`script[src="/js/script_main.js"]`)) return;
    const sc = document.createElement("script");
    sc.src = "/js/script_main.js";
    sc.async = true;
    document.body.appendChild(sc);
}


function normaliza(p) {
    if (!p) return null;
    return {
        id: Number(p.id),
        codigo: p.codigo || "",
        nombre: p.nombre || "",
        categoria: p.categoria || p.cat || "",
        precio: Number(p.precio || 0),
        imagen: p.imagen || "",
    };
}


function fromWindowProductos() {
    if (typeof window === "undefined" || !window.PRODUCTOS) return [];
    const items = Array.isArray(window.PRODUCTOS)
        ? window.PRODUCTOS
        : Object.values(window.PRODUCTOS);
    const out = items.map(normaliza).filter(Boolean);


    const seen = new Set();
    return out.filter((p) => !seen.has(p.id) && seen.add(p.id));
}


function demoProductos() {
    return [
        {
            id: 1,
            codigo: "TC001",
            nombre: "Torta de Chocolate",
            categoria: "Tortas Cuadradas",
            precio: 45000,
            imagen: "img/torta-chocolate.png",
        },
        {
            id: 2,
            codigo: "TC002",
            nombre: "Torta de Frutas",
            categoria: "Tortas Cuadradas",
            precio: 50000,
            imagen: "img/torta-frutas.png",
        },
        {
            id: 3,
            codigo: "TT001",
            nombre: "Torta de Vainilla",
            categoria: "Tortas Circulares",
            precio: 40000,
            imagen: "img/torta-vainilla.png",
        },
    ];
}

function nextId(arr) {
    return arr.length ? Math.max(...arr.map((x) => Number(x.id) || 0)) + 1 : 1;
}

/* ====== Componente principal ====== */
export default function Admin() {

    const [hash, setHash] = useState(() => (location.hash || "#home").slice(1));

    useEffect(() => {
        const onHash = () => setHash((location.hash || "#home").slice(1));
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);


    useEffect(() => {
        ensureScriptMain();
    }, []);


    const [productos, setProductos] = useState(() => {
        const fromLS = safeJSON(localStorage.getItem(LS_PROD));
        if (fromLS.length) return fromLS;

        const fromWin = fromWindowProductos();
        if (fromWin.length) {
            localStorage.setItem(LS_PROD, JSON.stringify(fromWin));
            return fromWin;
        }
        const demo = demoProductos();
        localStorage.setItem(LS_PROD, JSON.stringify(demo));
        return demo;
    });

    const [usuarios, setUsuarios] = useState(() => {
        const fromLS = safeJSON(localStorage.getItem(LS_USER));
        if (fromLS.length) return fromLS;
        const seed = [
            { id: 1, nombre: "Admin Demo", email: "admin@milsabores.cl", rol: "admin" },
            { id: 2, nombre: "Cliente Demo", email: "cliente@milsabores.cl", rol: "cliente" },
        ];
        localStorage.setItem(LS_USER, JSON.stringify(seed));
        return seed;
    });


    useEffect(() => {
        const tryMigrate = () => {
            const fromWin = fromWindowProductos();
            if (fromWin.length && fromWin.length > productos.length) {
                setProductos(fromWin);
                localStorage.setItem(LS_PROD, JSON.stringify(fromWin));
            }
        };


        tryMigrate();
        const t = setTimeout(tryMigrate, 150);
        return () => clearTimeout(t);
    }, [productos.length]);

    
    useEffect(() => {
        localStorage.setItem(LS_PROD, JSON.stringify(productos));
    }, [productos]);

    useEffect(() => {
        localStorage.setItem(LS_USER, JSON.stringify(usuarios));
    }, [usuarios]);

    
    const route = useMemo(() => {
        const parts = (hash || "home").split("/");
        return {
            seccion: parts[0] || "home",
            accion: parts[1],
            id: parts[2],
        };
    }, [hash]);

    
    const navIsActive = (href) => (("#" + hash) === href ? "active" : "");

    
    return (
        <div className="admin-shell">
            {/* Topbar */}
            <div className="topbar d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <strong>Panel de Administración</strong>
                    <span className="badge badge-demo">Demo</span>
                </div>
                <div className="d-flex gap-2">
                    <a className="btn btn-outline-secondary btn-sm" href="/">Ir a la tienda</a>
                </div>
            </div>

            <div className="layout">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="brand">
                        Pastelería Mil Sabores
                        <small>Administrador</small>
                    </div>

                    <nav className="nav nav-pills flex-column nav-admin" id="sideNav">
                        <a className={`nav-link ${navIsActive("#home")}`} href="#home">Home</a>

                        <div className="group-title">Productos</div>
                        <a className={`nav-link ${navIsActive("#productos/listar")}`} href="#productos/listar">
                            Mostrar productos
                        </a>
                        <a className={`nav-link ${navIsActive("#productos/nuevo")}`} href="#productos/nuevo">
                            Nuevo producto
                        </a>

                        <div className="group-title">Usuarios</div>
                        <a className={`nav-link ${navIsActive("#usuarios/listar")}`} href="#usuarios/listar">
                            Mostrar usuarios
                        </a>
                        <a className={`nav-link ${navIsActive("#usuarios/nuevo")}`} href="#usuarios/nuevo">
                            Nuevo usuario
                        </a>
                    </nav>
                </aside>

                {/* Content */}
                <main className="content">
                    {renderRoute({ route, productos, setProductos, usuarios, setUsuarios })}
                </main>
            </div>
        </div>
    );
}


function safeJSON(v) {
    try {
        const arr = JSON.parse(v || "[]");
        return Array.isArray(arr) ? arr : [];
    } catch {
        return [];
    }
}

/* ---------- Home ---------- */
function HomeView({ productos, usuarios }) {
    return (
        <div className="row g-3">
            <div className="col-lg-4">
                <div className="card-soft p-3 h-100">
                    <div className="stat">
                        <div className="num">{productos.length}</div>
                        <div>Productos</div>
                    </div>
                    <hr />
                    <a className="btn btn-sm btn-outline-secondary" href="#productos/listar">Mostrar productos</a>
                    <a className="btn btn-sm btn-rosa ms-2" href="#productos/nuevo">+ Nuevo</a>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card-soft p-3 h-100">
                    <div className="stat">
                        <div className="num">{usuarios.length}</div>
                        <div>Usuarios</div>
                    </div>
                    <hr />
                    <a className="btn btn-sm btn-outline-secondary" href="#usuarios/listar">Mostrar usuarios</a>
                    <a className="btn btn-sm btn-rosa ms-2" href="#usuarios/nuevo">+ Nuevo</a>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card-soft p-3 h-100">
                    <h5 className="mb-2">Consejos</h5>
                    <ul className="m-0 ps-3">
                        <li>Usa “Nuevo” para cargar productos.</li>
                        <li>Edita/Elimina desde “Mostrar”.</li>
                        <li>Todo se guarda en <b>localStorage</b> (demo).</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* ---------- Productos: listar / formulario ---------- */
function ProductosListar({ productos, setProductos }) {
    const [q, setQ] = useState("");

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        return productos
            .filter(
                (p) =>
                    !t ||
                    p.nombre?.toLowerCase().includes(t) ||
                    p.codigo?.toLowerCase().includes(t)
            )
            .sort((a, b) => a.id - b.id);
    }, [q, productos]);

    const del = (id) => {
        if (!confirm("¿Eliminar este producto?")) return;
        setProductos((prev) => prev.filter((x) => x.id !== id));
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="m-0">Productos</h4>
                <div className="d-flex gap-2">
                    <input
                        className="form-control form-control-sm"
                        placeholder="Buscar..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <a className="btn btn-rosa btn-sm" href="#productos/nuevo">+ Nuevo</a>
                </div>
            </div>

            <div className="card-soft p-2">
                <div className="table-responsive">
                    <table className="table align-middle table-hover mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th className="text-end">Precio</th>
                                <th>Imagen</th>
                                <th style={{ width: 150 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.codigo || ""}</td>
                                    <td>{p.nombre || ""}</td>
                                    <td>{p.categoria || ""}</td>
                                    <td className="text-end">{fmtCLP(p.precio)}</td>
                                    <td>
                                        {p.imagen ? (
                                            <img
                                                src={p.imagen}
                                                style={{
                                                    width: 54,
                                                    height: 40,
                                                    objectFit: "cover",
                                                    border: "1px solid #eee",
                                                    borderRadius: 6,
                                                }}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td className="text-end">
                                        <div className="btn-group btn-group-sm">
                                            <a className="btn btn-outline-secondary" href={`#productos/editar/${p.id}`}>
                                                Editar
                                            </a>
                                            <button className="btn btn-outline-danger" onClick={() => del(p.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {list.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center text-muted py-4">
                                        Sin resultados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function ProductoForm({ modo, id, productos, setProductos }) {
    const categoriasOpts = [
        "Tortas Cuadradas",
        "Tortas Circulares",
        "Postres Individuales",
        "Productos Sin Azúcar",
        "Pastelería Tradicional",
        "Productos Sin Gluten",
        "Productos Vegana",
        "Tortas Especiales",
    ];

    const edit = modo === "editar";
    const actual = edit ? productos.find((x) => String(x.id) === String(id)) : null;

    const [form, setForm] = useState(
        actual || {
            id: "",
            codigo: "",
            nombre: "",
            categoria: "",
            precio: "",
            imagen: "",
        }
    );

    useEffect(() => {
        if (edit && !actual) {
            location.hash = "#productos/listar";
        }
    }, [edit, actual]);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...form,
            id: edit ? Number(form.id) : nextId(productos),
            precio: Number(form.precio || 0),
        };
        if (!data.codigo || !data.nombre || !data.categoria) {
            alert("Completa los campos obligatorios");
            return;
        }
        setProductos((prev) => {
            const idx = prev.findIndex((x) => Number(x.id) === Number(data.id));
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = data;
                return copy;
            }
            return [...prev, data];
        });
        location.hash = "#productos/listar";
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="m-0">{edit ? "Editar producto" : "Nuevo producto"}</h4>
                <a className="btn btn-outline-secondary btn-sm" href="#productos/listar">
                    Volver
                </a>
            </div>

            <form className="card-soft p-3" onSubmit={onSubmit}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">Código</label>
                        <input
                            className="form-control"
                            required
                            value={form.codigo}
                            onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                        />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            required
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Categoría</label>
                        <select
                            className="form-select"
                            required
                            value={form.categoria}
                            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                        >
                            <option value="">Selecciona…</option>
                            {categoriasOpts.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Precio (CLP)</label>
                        <input
                            type="number"
                            min="0"
                            step="100"
                            className="form-control"
                            required
                            value={form.precio}
                            onChange={(e) => setForm({ ...form, precio: e.target.value })}
                        />
                    </div>
                    <div className="col-md-9">
                        <label className="form-label">Imagen (URL)</label>
                        <input
                            className="form-control"
                            placeholder="img/torta-chocolate.png o https://…"
                            value={form.imagen}
                            onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                        />
                        <div className="form-hint">
                            Puedes usar imágenes locales del proyecto (carpeta <code>img/</code>).
                        </div>
                    </div>
                </div>
                <hr />
                <button className="btn btn-rosa">Guardar</button>
            </form>
        </>
    );
}

/* ---------- Usuarios: listar / formulario ---------- */
function UsuariosListar({ usuarios, setUsuarios }) {
    const [q, setQ] = useState("");

    const list = useMemo(() => {
        const t = q.trim().toLowerCase();
        return usuarios
            .filter(
                (u) =>
                    !t ||
                    u.nombre?.toLowerCase().includes(t) ||
                    u.email?.toLowerCase().includes(t)
            )
            .sort((a, b) => a.id - b.id);
    }, [q, usuarios]);

    const del = (id) => {
        if (!confirm("¿Eliminar este usuario?")) return;
        setUsuarios((prev) => prev.filter((x) => x.id !== id));
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="m-0">Usuarios</h4>
                <div className="d-flex gap-2">
                    <input
                        className="form-control form-control-sm"
                        placeholder="Buscar..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <a className="btn btn-rosa btn-sm" href="#usuarios/nuevo">+ Nuevo</a>
                </div>
            </div>

            <div className="card-soft p-2">
                <div className="table-responsive">
                    <table className="table align-middle table-hover mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th style={{ width: 150 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.nombre || ""}</td>
                                    <td>{u.email || ""}</td>
                                    <td>
                                        <span className="badge badge-rol">{u.rol || "cliente"}</span>
                                    </td>
                                    <td className="text-end">
                                        <div className="btn-group btn-group-sm">
                                            <a className="btn btn-outline-secondary" href={`#usuarios/editar/${u.id}`}>
                                                Editar
                                            </a>
                                            <button className="btn btn-outline-danger" onClick={() => del(u.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {list.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center text-muted py-4">
                                        Sin resultados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function UsuarioForm({ modo, id, usuarios, setUsuarios }) {
    const edit = modo === "editar";
    const actual = edit ? usuarios.find((x) => String(x.id) === String(id)) : null;

    const [form, setForm] = useState(
        actual || {
            id: "",
            nombre: "",
            email: "",
            rol: "cliente",
        }
    );

    useEffect(() => {
        if (edit && !actual) {
            location.hash = "#usuarios/listar";
        }
    }, [edit, actual]);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...form,
            id: edit ? Number(form.id) : nextId(usuarios),
        };
        if (!data.nombre || !data.email) {
            alert("Completa nombre y email");
            return;
        }
        setUsuarios((prev) => {
            const idx = prev.findIndex((x) => Number(x.id) === Number(data.id));
            if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = data;
                return copy;
            }
            return [...prev, data];
        });
        location.hash = "#usuarios/listar";
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="m-0">{edit ? "Editar usuario" : "Nuevo usuario"}</h4>
                <a className="btn btn-outline-secondary btn-sm" href="#usuarios/listar">
                    Volver
                </a>
            </div>

            <form className="card-soft p-3" onSubmit={onSubmit}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            required
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Rol</label>
                        <select
                            className="form-select"
                            value={form.rol}
                            onChange={(e) => setForm({ ...form, rol: e.target.value })}
                        >
                            <option value="cliente">Cliente</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <hr />
                <button className="btn btn-rosa">Guardar</button>
            </form>
        </>
    );
}

/* ---------- Router render ---------- */
function renderRoute({ route, productos, setProductos, usuarios, setUsuarios }) {
    const { seccion, accion, id } = route;

    if (seccion === "home") {
        return <HomeView productos={productos} usuarios={usuarios} />;
    }

    if (seccion === "productos") {
        if (accion === "listar") return <ProductosListar productos={productos} setProductos={setProductos} />;
        if (accion === "nuevo") return <ProductoForm modo="nuevo" productos={productos} setProductos={setProductos} />;
        if (accion === "editar") return <ProductoForm modo="editar" id={id} productos={productos} setProductos={setProductos} />;
    }

    if (seccion === "usuarios") {
        if (accion === "listar") return <UsuariosListar usuarios={usuarios} setUsuarios={setUsuarios} />;
        if (accion === "nuevo") return <UsuarioForm modo="nuevo" usuarios={usuarios} setUsuarios={setUsuarios} />;
        if (accion === "editar") return <UsuarioForm modo="editar" id={id} usuarios={usuarios} setUsuarios={setUsuarios} />;
    }

    return <HomeView productos={productos} usuarios={usuarios} />;
}
