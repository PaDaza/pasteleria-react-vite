import { useEffect, useMemo, useState, useRef } from "react";
import { addToCart } from "../utils/cart";

function Catalogo() {
    const [listo, setListo] = useState(false);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState(["all"]);
    const [filtro, setFiltro] = useState("all");
    const [agregadoId, setAgregadoId] = useState(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const existing = document.querySelector("script[src='/js/script_main.js']");
        if (existing) {
            hydrateFromWindow();
            return;
        }
        const sc = document.createElement("script");
        sc.src = "/js/script_main.js";
        sc.async = true;
        sc.onload = hydrateFromWindow;
        document.body.appendChild(sc);
    }, []);

    function hydrateFromWindow() {
        const prods = window.PRODUCTOS ? Object.values(window.PRODUCTOS) : [];
        // Normaliza rutas de imagen y asegura descripción
        const normalizados = prods.map((p) => ({
            ...p,
            imagen: p.imagen?.startsWith("/") ? p.imagen : `/${p.imagen || ""}`,
            descripcion:
                p.descripcion ||
                "Producto artesanal de Pastelería Mil Sabores, hecho con ingredientes frescos.",
        }));
        setProductos(normalizados);

        const cats = Array.isArray(window.CATEGORIAS)
            ? window.CATEGORIAS
            : ["all", ...new Set(prods.map((p) => p.cat))];
        setCategorias(cats);
        setListo(true);
    }

    const productosFiltrados = useMemo(() => {
        if (filtro === "all") return productos;
        return productos.filter((p) => p.cat === filtro);
    }, [productos, filtro]);

    const formatoCLP = (v) =>
        new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        }).format(v);

    const agregar = (p) => {
        addToCart(p, 1);
        setAgregadoId(p.id);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setAgregadoId(null), 1200);
    };

    useEffect(() => () => clearTimeout(timerRef.current), []);

    if (!listo) {
        return (
            <main className="container my-4">
                <p className="text-center text-muted">Cargando catálogo...</p>
            </main>
        );
    }

    return (
        <main className="container my-4">
            <h2 className="text-center mb-4">Nuestros Productos</h2>

            {/* Filtros */}
            <div className="text-center mb-3">
                <div className="btn-group flex-wrap" role="group" aria-label="Filtro de categorías">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            className={`btn btn-filtro m-1 ${filtro === cat ? "active" : ""}`}
                            onClick={() => setFiltro(cat)}
                        >
                            {cat === "all" ? "Todos" : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mensaje vacío */}
            {productosFiltrados.length === 0 && (
                <p id="msgVacio" className="text-center text-muted">
                    No hay productos en esta categoría.
                </p>
            )}

            {/* Grid */}
            <div id="gridProductos" className="row g-3 g-md-4">
                {productosFiltrados.map((p) => (
                    <div key={p.id} className="col-6 col-md-4 col-lg-3 producto">
                        <div className="card h-100 shadow-sm">
                            <img
                                className="card-img-top"
                                src={p.imagen}
                                alt={p.nombre}
                                style={{ objectFit: "cover", height: 250 }}
                            />
                            <div className="card-body d-flex flex-column text-center">
                                {/* Categoría como badge sutil */}
                                {p.cat && (
                                    <div className="mb-2">
                                        <span className="badge">{p.cat}</span>
                                    </div>
                                )}
                                <h5 className="card-title">{p.nombre}</h5>
                                <p className="text-muted small mb-2">{p.descripcion}</p>
                                <p className="card-text fw-bold mb-3">
                                    {window.formatoCLP ? window.formatoCLP(p.precio) : formatoCLP(p.precio)}
                                </p>

                                <button
                                    className={`btn btn-custom mt-auto ${agregadoId === p.id ? "disabled" : ""}`}
                                    onClick={() => agregar(p)}
                                >
                                    {agregadoId === p.id ? "Agregado ✓" : "Agregar"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Catalogo;
