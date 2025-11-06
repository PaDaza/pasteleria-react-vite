import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Nosotros from "../pages/Nosotros.jsx";

afterEach(cleanup);

describe('nosotros', () => {
    it('muestra título y secciones', () => {
        render(<Nosotros />);
        expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
        expect(screen.getByText(/Misión/i)).toBeInTheDocument();
        expect(screen.getByText(/Visión/i)).toBeInTheDocument();
    });

    it('tiene enlaces de redes sociales', () => {
        render(<Nosotros />);
        expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Facebook/i })).toBeInTheDocument();
    });
});
