import { useEffect, useState } from "react";
import {
    getCart,
    saveCart,
    removeFromCart,
    updateQty,
    formatoCLP,
} from "../utils/cart";

function Carrito() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, []);

    const total = items.reduce((acc, it) => acc + it.precio * it.qty, 0);

    const onQty = (id, qty) => {
        updateQty(id, qty);
        setItems(getCart());
    };

    const onRemove = (id) => {
        removeFromCart(id);
        setItems(getCart());
    };

    const vaciar = () => {
        saveCart([]);
        setItems([]);
    };

    return (
        <main className="container my-4">
            <h2 className="text-center mb-4">Tu carrito</h2>

            {items.length === 0 ? (
                <p className="text-center text-muted">
                    Aún no agregas productos al carrito.
                </p>
            ) : (
                <>
                    <div className="list-group mb-3">
                        {items.map((it) => (
                            <div
                                key={it.id}
                                className="list-group-item d-flex align-items-center gap-3"
                            >
                                <img
                                    src={it.imagen}
                                    alt={it.nombre}
                                    style={{ width: 80, height: 80, objectFit: "cover" }}
                                    className="rounded"
                                />
                                <div className="flex-grow-1">
                                    <div className="fw-bold">{it.nombre}</div>
                                    <small className="text-muted">{formatoCLP(it.precio)}</small>
                                </div>

                                <div className="d-flex align-items-center gap-2">
                                    <label className="text-muted small">Cant.</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={it.qty}
                                        onChange={(e) => onQty(it.id, e.target.value)}
                                        className="form-control"
                                        style={{ width: 80 }}
                                    />
                                </div>

                                <div className="text-end" style={{ minWidth: 120 }}>
                                    <div className="fw-semibold">
                                        {formatoCLP(it.precio * it.qty)}
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline-danger mt-1"
                                        onClick={() => onRemove(it.id)}
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-outline-secondary" onClick={vaciar}>
                            Vaciar carrito
                        </button>
                        <div className="fs-5 fw-bold">Total: {formatoCLP(total)}</div>
                    </div>

                    <div className="text-end mt-3">
                        <button className="btn btn-custom">Proceder al pago</button>
                    </div>
                </>
            )}
        </main>
    );
}

export default Carrito;
