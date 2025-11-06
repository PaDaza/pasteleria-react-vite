import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

let data = [
    { id: 1, nombre: 'A', precio: 1000, qty: 2, imagen: '' },
    { id: 2, nombre: 'B', precio: 2000, qty: 1, imagen: '' },
];

vi.mock("../utils/cart", () => ({
    getCart: () => data.slice(),
    saveCart: (arr) => { data = arr; },
    removeFromCart: (id) => { data = data.filter(x => x.id !== id); },
    updateQty: (id, qty) => { data = data.map(x => x.id === id ? { ...x, qty: Number(qty) } : x); },
    formatoCLP: (n) => `$${n}`
}));

import Carrito from "../pages/Carrito.jsx";

afterEach(() => {
    cleanup();
    
    data = [
        { id: 1, nombre: 'A', precio: 1000, qty: 2, imagen: '' },
        { id: 2, nombre: 'B', precio: 2000, qty: 1, imagen: '' },
    ];
});

describe('carrito', () => {
    it('muestra total inicial', () => {
        render(<MemoryRouter><Carrito /></MemoryRouter>);
        expect(screen.getByText(/Total:\s*\$4000/i)).toBeInTheDocument(); 
    });

    it('actualiza total al cambiar cantidad', () => {
        render(<MemoryRouter><Carrito /></MemoryRouter>);
        const inputs = screen.getAllByRole('spinbutton'); 
        
        fireEvent.change(inputs[0], { target: { value: '3' } });
        expect(screen.getByText(/Total:\s*\$5000/i)).toBeInTheDocument(); 
    });
});
