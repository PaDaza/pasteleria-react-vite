import { useState, useMemo } from "react";

function Blog() {
    const [busqueda, setBusqueda] = useState("");
    const [categoriaActiva, setCategoriaActiva] = useState("all");

    const articulos = [
        {
            id: 1,
            categoria: "Recetas",
            titulo: "Torta de Zanahoria sin azúcar",
            imagen: "img/torta-naranja-sin-azucar.png",
            fecha: "12 Feb 2025",
            tiempo: "4 min",
            texto:
                "Húmeda, especiada y endulzada naturalmente. Ideal para quienes buscan un postre más liviano sin perder sabor.",
            tags: "receta sin azúcar saludable zanahoria",
        },
        {
            id: 2,
            categoria: "Tips",
            titulo: "Cómo conservar tus tortas como recién hechas",
            imagen: "img/torta-vainilla.png",
            fecha: "28 Ene 2025",
            tiempo: "3 min",
            texto:
                "Frío, humedad y envases: tres claves simples para alargar la frescura de tus pasteles sin perder textura.",
            tags: "tips conservación refrigerar congelar",
        },
        {
            id: 3,
            categoria: "Salud",
            titulo: "Opciones sin gluten: lo que debes saber",
            imagen: "img/brownie-sin-gluten.png",
            fecha: "05 Ene 2025",
            tiempo: "4 min",
            texto:
                "Harinas alternativas, contaminación cruzada y etiquetado claro: nuestros estándares para cuidar a quienes lo necesitan.",
            tags: "salud sin gluten harinas alternativas",
        },
        {
            id: 4,
            categoria: "Novedades",
            titulo: "Nuevo cheesecake sin azúcar",
            imagen: "img/cheesecake-sin-azucar.png",
            fecha: "10 Ene 2025",
            tiempo: "2 min",
            texto:
                "Lanzamos una receta cremosa, balanceada y sin azúcar añadida. ¡Ven a probarlo a tienda o pídelo online!",
            tags: "novedades sin azúcar cheesecake",
        },
        {
            id: 5,
            categoria: "Eventos",
            titulo: "Degustación de verano en tienda central",
            imagen: "img/torta-frutas.png",
            fecha: "18 Dic 2024",
            tiempo: "1 min",
            texto:
                "Frutas de temporada, opciones veganas y sorpresas dulces. ¡Reserva tu cupo gratuito!",
            tags: "evento degustación verano",
        },
        {
            id: 6,
            categoria: "Recetas",
            titulo: "Brownies veganos súper fudgy",
            imagen: "img/galletas-avena.png",
            fecha: "01 Dic 2024",
            tiempo: "5 min",
            texto:
                "Textura densa y chocolatosa sin lácteos ni huevo. Ingredientes simples y resultado de cafetería.",
            tags: "receta brownie vegano",
        },
    ];

    const categorias = ["all", "Recetas", "Tips", "Salud", "Novedades", "Eventos"];

    const filtrados = useMemo(() => {
        return articulos.filter((art) => {
            const coincideCategoria =
                categoriaActiva === "all" || art.categoria === categoriaActiva;
            const coincideBusqueda =
                busqueda.trim() === "" ||
                [art.titulo, art.texto, art.tags]
                    .join(" ")
                    .toLowerCase()
                    .includes(busqueda.toLowerCase());
            return coincideCategoria && coincideBusqueda;
        });
    }, [busqueda, categoriaActiva]);

    return (
        <main className="container-fluid py-4">
            <header className="text-center mb-4">
                <h2 className="mb-2">Blog & Recetas</h2>
                <p className="text-muted mb-0">
                    Tips, recetas y novedades de Pastelería Mil Sabores
                </p>
            </header>

            {/* Buscador */}
            <div className="d-flex justify-content-center mb-3">
                <form
                    className="d-flex buscador w-100"
                    role="search"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        id="searchInput"
                        className="form-control me-2"
                        type="search"
                        placeholder="Buscar artículos (ej: sin azúcar, vainilla, receta)..."
                        aria-label="Buscar"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button
                        className="btn btn-filtro"
                        type="button"
                        onClick={() => setBusqueda(busqueda)}
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {/* Filtros */}
            <div className="text-center mb-3">
                <div className="btn-group flex-wrap" role="group">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            className={`btn btn-filtro m-1 ${categoriaActiva === cat ? "active" : ""
                                }`}
                            onClick={() => setCategoriaActiva(cat)}
                        >
                            {cat === "all" ? "Todos" : cat}
                        </button>
                    ))}
                </div>
            </div>

            {filtrados.length === 0 ? (
                <p id="msgVacio" className="text-center text-muted">
                    No hay artículos que coincidan con el filtro.
                </p>
            ) : (
                <div id="gridBlogs" className="row g-3 g-md-4 justify-content-center">
                    {filtrados.map((art) => (
                        <article
                            key={art.id}
                            className="col-md-6 col-lg-4 articulo"
                            data-categoria={art.categoria}
                        >
                            <div className="card blog-card h-100 shadow-sm">
                                <img src={art.imagen} alt={art.titulo} />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge">{art.categoria}</span>
                                        <small className="text-muted">
                                            {art.fecha} · {art.tiempo}
                                        </small>
                                    </div>
                                    <h5 className="card-title">{art.titulo}</h5>
                                    <p className="card-text text-muted">{art.texto}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button className="btn btn-filtro">Leer más</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Blog;
