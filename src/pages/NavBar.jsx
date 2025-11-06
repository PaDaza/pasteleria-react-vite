import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { getCart } from "../utils/cart"; 
import "../css/estilos.css";

function NavBar() {
    const [count, setCount] = useState(0);

    const syncCartCount = () => {
        try {
            const items = getCart();
            const total = items.reduce((acc, it) => acc + (Number(it.qty) || 0), 0);
            setCount(total);
        } catch {
            setCount(0);
        }
    };

    useEffect(() => {
        
        syncCartCount();

        
        const onCustom = () => syncCartCount();
        
        const onStorage = () => syncCartCount();
        
        const onVisibility = () => document.visibilityState === "visible" && syncCartCount();

        window.addEventListener("cart:updated", onCustom);
        window.addEventListener("storage", onStorage);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            window.removeEventListener("cart:updated", onCustom);
            window.removeEventListener("storage", onStorage);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

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
                                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Inicio
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/catalogo" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Catálogo
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/nosotros" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Nosotros
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Contacto
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                                    Blogs
                                </NavLink>
                            </li>
                        </ul>


                        <Link className="btn btn-sesion me-2" to="/iniciar-sesion">
                            Iniciar sesión
                        </Link>


                        <Link className="btn btn-sesion me-2" to="/registro">
                            Registrarse
                        </Link>

                        <Link className="btn btn-carrito position-relative" to="/carrito">
                            Ver carrito
                            <span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                style={{ fontSize: "0.75rem" }}
                                aria-label={`Productos en el carrito: ${count}`}
                            >
                                {count}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
