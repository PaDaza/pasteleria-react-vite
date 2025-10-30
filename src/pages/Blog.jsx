function Blog() {
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
                    />
                    <button
                        className="btn btn-filtro"
                        type="button"
                        onClick={() =>
                            window.filtrarBusqueda && window.filtrarBusqueda()
                        }
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {/* Filtros */}
            <div className="text-center mb-3">
                <div className="btn-group flex-wrap" role="group" aria-label="Filtro de categorías">
                    <button
                        className="btn btn-filtro m-1 active"
                        data-filter="all"
                        onClick={(e) => window.filtrarCategoria && window.filtrarCategoria("all", e.target)}
                    >
                        Todos
                    </button>
                    <button
                        className="btn btn-filtro m-1"
                        data-filter="Recetas"
                        onClick={(e) => window.filtrarCategoria && window.filtrarCategoria("Recetas", e.target)}
                    >
                        Recetas
                    </button>
                    <button
                        className="btn btn-filtro m-1"
                        data-filter="Tips"
                        onClick={(e) => window.filtrarCategoria && window.filtrarCategoria("Tips", e.target)}
                    >
                        Tips
                    </button>
                    <button
                        className="btn btn-filtro m-1"
                        data-filter="Salud"
                        onClick={(e) => window.filtrarCategoria && window.filtrarCategoria("Salud", e.target)}
                    >
                        Salud
                    </button>
                    <button
                        className="btn btn-filtro m-1"
                        data-filter="Novedades"
                        onClick={(e) => window.filtrarCategoria && window.filtrarCategoria("Novedades", e.target)}
                    >
                        Novedades
                    </button>
                    <button
                        className="btn btn-filtro m-1"
                        data-filter="Eventos"
                        onClick={(e) => window.filtrarCategoria && window.filtrarCategoria("Eventos", e.target)}
                    >
                        Eventos
                    </button>
                </div>
            </div>

            <p id="msgVacio" className="text-center text-muted d-none">
                No hay artículos que coincidan con el filtro.
            </p>

            {/* Artículos */}
            <div id="gridBlogs" className="row g-3 g-md-4">
                {/* Artículo 1 */}
                <article
                    className="col-md-6 col-lg-4 articulo"
                    data-categoria="Recetas"
                    data-title="Torta de Zanahoria sin azúcar"
                    data-tags="receta sin azúcar saludable zanahoria"
                >
                    <div className="card blog-card">
                        <img
                            src="img/torta-naranja-sin-azucar.png"
                            alt="Torta de zanahoria sin azúcar"
                        />
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="badge">Recetas</span>
                                <small className="text-muted">12 Feb 2025 · 4 min</small>
                            </div>
                            <h5 className="card-title">Torta de Zanahoria sin azúcar</h5>
                            <p className="card-text text-muted">
                                Húmeda, especiada y endulzada naturalmente. Ideal para quienes
                                buscan un postre más liviano sin perder sabor.
                            </p>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                            <button
                                className="btn btn-filtro"
                                onClick={(e) =>
                                    window.abrirArticulo &&
                                    window.abrirArticulo(e.currentTarget)
                                }
                                data-fulltitle="Torta de Zanahoria sin azúcar"
                                data-fullimg="img/torta-naranja-sin-azucar.png"
                                data-fulltext="Paso a paso para una torta de zanahoria deliciosa sin azúcar añadida. Consejos de horneado, sustitutos de endulzantes y cómo lograr una miga húmeda y esponjosa."
                            >
                                Leer más
                            </button>
                        </div>
                    </div>
                </article>

                {/* Artículo 2 */}
                <article
                    className="col-md-6 col-lg-4 articulo"
                    data-categoria="Tips"
                    data-title="Cómo conservar tus tortas como recién hechas"
                    data-tags="tips conservación refrigerar congelar"
                >
                    <div className="card blog-card">
                        <img src="img/torta-vainilla.png" alt="Torta de vainilla" />
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="badge">Tips</span>
                                <small className="text-muted">28 Ene 2025 · 3 min</small>
                            </div>
                            <h5 className="card-title">
                                Cómo conservar tus tortas como recién hechas
                            </h5>
                            <p className="card-text text-muted">
                                Frío, humedad y envases: tres claves simples para alargar la
                                frescura de tus pasteles sin perder textura.
                            </p>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                            <button
                                className="btn btn-filtro"
                                onClick={(e) =>
                                    window.abrirArticulo &&
                                    window.abrirArticulo(e.currentTarget)
                                }
                                data-fulltitle="Cómo conservar tus tortas como recién hechas"
                                data-fullimg="img/torta-vainilla.png"
                                data-fulltext="Te contamos cómo elegir envases, cuándo refrigerar o congelar, y cómo recuperar una torta a temperatura ambiente para que conserve su esponjosidad."
                            >
                                Leer más
                            </button>
                        </div>
                    </div>
                </article>

                {/* Agrega los demás artículos de forma idéntica */}
            </div>
        </main>
    )
}

export default Blog;
