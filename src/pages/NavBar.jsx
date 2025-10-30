import { NavLink, Link } from "react-router-dom";
import "../css/estilos.css";

function NavBar() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm my-navbar">
                <div className="container-fluid">
                    {/* Marca */}
                    <Link className="navbar-brand fw-bold" to="/">
                        Pastelería Mil Sabores
                    </Link>

                    {/* Toggler */}
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

                    {/* Menú */}
                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/catalogo"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    Catálogo
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/nosotros"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    Nosotros
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/contacto"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    Contacto
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/blog"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "active" : ""}`
                                    }
                                >
                                    Blogs
                                </NavLink>
                            </li>
                        </ul>

                        {/* Botones derecha */}
                        <button id="btnSesion" className="btn btn-sesion me-2" type="button">
                            Iniciar sesión
                        </button>
                        <Link className="btn btn-carrito" to="/formulario">
                            Ver carrito
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
