// src/utils/cart.js
const KEY = "cart";

export const getCart = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
        return [];
    }
};

export const saveCart = (items) => {
    localStorage.setItem(KEY, JSON.stringify(items));
    // Notifica a la app que el carrito cambió
    window.dispatchEvent(new Event("cart:updated"));
};

export const addToCart = (product, qty = 1) => {
    const items = getCart();
    const i = items.findIndex((x) => x.id === product.id);

    const imagen = (product.imagen || "").startsWith("/")
        ? product.imagen
        : `/${product.imagen || ""}`;

    if (i >= 0) {
        items[i].qty = (Number(items[i].qty) || 0) + (Number(qty) || 1);
    } else {
        items.push({
            id: product.id,
            nombre: product.nombre,
            precio: Number(product.precio) || 0,
            imagen,
            qty: Number(qty) || 1,
        });
    }

    saveCart(items);
    return items;
};

export const removeFromCart = (id) => {
    const items = getCart().filter((x) => x.id !== id);
    saveCart(items);
    return items;
};

export const updateQty = (id, qty) => {
    let q = parseInt(qty, 10);
    if (isNaN(q) || q < 1) q = 1;
    const items = getCart().map((x) => (x.id === id ? { ...x, qty: q } : x));
    saveCart(items);
    return items;
};

export const clearCart = () => {
    saveCart([]);
    return [];
};

export const formatoCLP = (n) =>
    new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(Number(n) || 0);
