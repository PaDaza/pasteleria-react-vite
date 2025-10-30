function Nosotros() {
    return (
        <main className="container-fluid py-4">
            <h2 className="text-center mb-4">Sobre Nosotros</h2>

            {/* Historia */}
            <div className="row align-items-center mb-4">
                <div className="col-md-6">
                    <img
                        src="img/chef.png"
                        alt="Chef de la pastelería"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h3 className="text-chocolate">Nuestra Historia</h3>
                    <p>
                        Desde hace 50 años, en <strong>Pastelería Mil Sabores</strong> nos apasiona
                        crear pasteles únicos, hechos con ingredientes frescos y con mucho cariño.
                        Nuestro compromiso es endulzar cada momento especial de tu vida con un toque artesanal.
                    </p>
                </div>
            </div>

            {/* Redes sociales */}
            <section className="mb-5">
                <h4 className="text-center text-chocolate mb-2">Síguenos en redes</h4>
                <p className="text-center text-muted mb-3">
                    Promos, lanzamientos y detrás de cámaras todos los días 🍰
                </p>
                <div className="d-flex justify-content-center gap-3 social-icons">
                    <a
                        className="btn-social btn-fb"
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <i className="fab fa-facebook-f" />
                    </a>
                    <a
                        className="btn-social btn-ig"
                        href="https://instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <i className="fab fa-instagram" />
                    </a>
                    <a
                        className="btn-social btn-wa"
                        href="https://wa.me/56912345678"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                    >
                        <i className="fab fa-whatsapp" />
                    </a>
                    <a
                        className="btn-social btn-tt"
                        href="https://www.tiktok.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                    >
                        <i className="fab fa-tiktok" />
                    </a>
                </div>
            </section>

            {/* Misión y Visión */}
            <div className="row text-center">
                <div className="col-md-6 mb-4">
                    <div className="p-4 bg-light rounded shadow-sm">
                        <h4 className="text-chocolate">Misión</h4>
                        <p>
                            Brindar experiencias dulces y memorables a través de productos artesanales de alta calidad,
                            elaborados con amor, tradición y creatividad.
                        </p>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="p-4 bg-light rounded shadow-sm">
                        <h4 className="text-chocolate">Visión</h4>
                        <p>
                            Ser reconocidos como la pastelería favorita de nuestra comunidad, destacando por
                            la innovación en sabores y el compromiso con nuestros clientes.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Nosotros;
