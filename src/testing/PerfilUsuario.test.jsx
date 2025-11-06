import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PerfilUsuario from "../pages/PerfilUsuario.jsx";

afterEach(cleanup);

describe('perfilusuario', () => {
    it('lee el parámetro de ruta y lo muestra', () => {
        render(
            <MemoryRouter initialEntries={['/perfil/Jose']}>
                <Routes>
                    <Route path="/perfil/:nombreUsuario" element={<PerfilUsuario />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText(/Usuario:\s*Jose/i)).toBeInTheDocument();
    });

    it('funciona con otro nombre', () => {
        render(
            <MemoryRouter initialEntries={['/perfil/Camila']}>
                <Routes>
                    <Route path="/perfil/:nombreUsuario" element={<PerfilUsuario />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText(/Usuario:\s*Camila/i)).toBeInTheDocument();
    });
});
