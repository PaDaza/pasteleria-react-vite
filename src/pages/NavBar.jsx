import '../css/estilos.css';

function NavBar() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm my-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="/">Pastelería Mil Sabores</a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                        aria-controls="mainNavbar"
                        aria-expanded="false"
                        aria-label="Alternar navegación"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link" href="/">Inicio</a></li>
                            <li className="nav-item"><a className="nav-link" href="/productos">Catálogo</a></li>
                            <li className="nav-item"><a className="nav-link" href="/nosotros">Nosotros</a></li>
                            <li className="nav-item"><a className="nav-link" href="/contacto">Contacto</a></li>
                            <li className="nav-item"><a className="nav-link" href="/blog">Blog</a></li>
                        </ul>

                        <button className="btn btn-sesion me-2" type="button">Iniciar sesión</button>
                        <a className="btn btn-carrito" href="/formulario">Ver carrito</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
