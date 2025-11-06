import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Contacto from "../pages/Contacto.jsx";

afterEach(cleanup);

describe('contacto', () => {
    it('renderiza encabezado y campos básicos', () => {
        render(<Contacto />);
        expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
    });

    it('tiene selector de país con opciones', () => {
        render(<Contacto />);
        const select = screen.getByLabelText(/País/i);
        expect(select).toBeInTheDocument();
        
        expect(screen.getByRole('option', { name: /Chile/i })).toBeInTheDocument();
    });
});
