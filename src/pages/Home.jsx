import { useEffect } from "react";
import { Link } from "react-router-dom";


const Home = () => {

    useEffect(() => {
        if (!document.querySelector("script[src='/js/script_main.js']")) {
            const sc = document.createElement("script")
            sc.src = "/js/script_main.js"
            sc.async = true
            document.body.appendChild(sc)
            console.log("script cargado")
        } else {
            console.log("script no cargado")

        }
    })

    useEffect(() => {
        const existing = document.querySelector("script[src='/js/script_main.js']");
        if (!existing) {
            const sc = document.createElement("script");
            sc.src = "/js/script_main.js";
            sc.async = true;
            sc.onload = () => window.renderDestacados && window.renderDestacados();
            document.body.appendChild(sc);
        } else {
            window.renderDestacados && window.renderDestacados();
        }
    }, []);



    const handleSubscribe = (e) => {
        e.preventDefault();
        alert('¡Gracias por suscribirte!');
        e.currentTarget.reset();
    };

    return (
        <main className="container-fluid py-4">
            <h1 className="text-center">Bienvenido a Pastelería Mil Sabores</h1>
            <p className="text-center">
                Disfruta de los mejores pasteles artesanales con el toque único de
                nuestra repostería.
            </p>

            {/* Alerta (style como objeto) */}
            <div
                className="alert alert-warning shadow-sm text-center mb-4"
                role="alert"
                style={{ background: '#ffc0cb', border: 'none', color: '#5d4037' }}
            >
                🎉 <strong>Oferta del día:</strong> 10% OFF en Tortas de Chocolate con
                el código <b>FELICES50</b>.
            </div>

            {/* Beneficios */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card h-100 text-center shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Ingredientes Premium</h5>
                            <p className="card-text descripcion">
                                Hechos a diario con insumos frescos y locales.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 text-center shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Opciones Saludables</h5>
                            <p className="card-text descripcion">
                                Sin azúcar / sin gluten / veganas disponibles.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 text-center shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Retiro & Delivery</h5>
                            <p className="card-text descripcion">
                                Compra online y retira en tienda o recibe en casa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Destacados */}
            <section className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h3 className="m-0">Destacados</h3>
                    <Link to="/catalogo" className="btn btn-outline-primary">
                        Ver catálogo
                    </Link>
                </div>
                <div className="row" id="destacados"></div>
            </section>

            {/* Testimonios */}
            <section className="mb-5">
                <h3 className="mb-3">Lo que dicen nuestros clientes</h3>
                <div id="testimonios" className="carousel slide" data-bs-ride="carousel">
                    <div
                        className="carousel-inner"
                        style={{ background: '#fff', borderRadius: '8px' }}
                    >
                        <div className="carousel-item active p-4 text-center">
                            <p className="mb-1">
                                “La torta de naranja sin azúcar es increíblemente rica.”
                            </p>
                            <small className="descripcion">— Camila R.</small>
                        </div>
                        <div className="carousel-item p-4 text-center">
                            <p className="mb-1">
                                “Entrega puntual y presentación perfecta. 10/10.”
                            </p>
                            <small className="descripcion">— Diego M.</small>
                        </div>
                        <div className="carousel-item p-4 text-center">
                            <p className="mb-1">
                                “Los brownies sin gluten conquistan a cualquiera.”
                            </p>
                            <small className="descripcion">— Valentina S.</small>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#testimonios"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#testimonios"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </section>

            {/* Suscripción */}
            <section className="mb-5">
                <div className="p-4 rounded-3 shadow-sm" style={{ background: '#fff' }}>
                    <h4 className="mb-2">Suscríbete para recibir ofertas</h4>
                    <form className="row g-2" onSubmit={handleSubscribe}>
                        <div className="col-md-8">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="tu@correo.com"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-custom w-100" type="submit">
                                Suscribirme
                            </button>
                        </div>
                    </form>
                </div>
            </section>


        </main>
    );
}

export default Home;
