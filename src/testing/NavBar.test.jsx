import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("../utils/cart", () => ({
    getCart: () => ([
        { id: 1, qty: 2, precio: 1000 },
        { id: 2, qty: 3, precio: 2000 }
    ])
}));

import NavBar from "../pages/NavBar.jsx";

afterEach(cleanup);

describe('navbar', () => {
    it('muestra links básicos', () => {
        render(<MemoryRouter><NavBar /></MemoryRouter>);
        expect(screen.getByRole('link', { name: /Inicio/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Catálogo/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Contacto/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Blogs/i })).toBeInTheDocument();
    });

    it('muestra el total del carrito', () => {
        render(<MemoryRouter><NavBar /></MemoryRouter>);
        expect(screen.getByText("5")).toBeInTheDocument(); 
    });
});
