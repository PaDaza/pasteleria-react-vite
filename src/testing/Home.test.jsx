import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";

afterEach(cleanup);

describe('home', () => {
    it('muestra título de bienvenida', () => {
        window.renderDestacados = vi.fn();
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByText(/Bienvenido a Pastelería Mil Sabores/i)).toBeInTheDocument();
    });

    it('tiene link "Ver catálogo"', () => {
        window.renderDestacados = vi.fn();
        render(<MemoryRouter><Home /></MemoryRouter>);
        expect(screen.getByRole('link', { name: /Ver catálogo/i })).toBeInTheDocument();
    });
});
