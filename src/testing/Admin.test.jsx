import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Admin from "../pages/Admin";

describe("admin", () => {
    it("muestra la home del panel con enlaces básicos", () => {
        render(<Admin />);

        
        expect(screen.getByText(/Panel de Administración/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Ir a la tienda/i })).toBeInTheDocument();

        
        expect(screen.getByRole("link", { name: /^Home$/i })).toBeInTheDocument();

        
        expect(
            screen.getAllByRole("link", { name: /Mostrar productos/i }).length
        ).toBeGreaterThan(0);

        expect(
            screen.getAllByRole("link", { name: /Mostrar usuarios/i }).length
        ).toBeGreaterThan(0);

        expect(
            screen.getAllByRole("link", { name: /\+ Nuevo/i }).length
        ).toBeGreaterThan(0);
    });

    it("lista productos cuando navego a #productos/listar", () => {
        render(<Admin />);

        
        act(() => {
            window.location.hash = "#productos/listar";
            window.dispatchEvent(new HashChangeEvent("hashchange"));
        });

        
        expect(
            screen.getByRole("heading", { name: /^Productos$/i })
        ).toBeInTheDocument();

        
        expect(
            screen.getByRole("columnheader", { name: /^Código$/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("columnheader", { name: /^Nombre$/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("columnheader", { name: /^Categoría$/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("columnheader", { name: /^Precio$/i })
        ).toBeInTheDocument();

        
        expect(
            screen.getAllByRole("link", { name: /\+ Nuevo/i }).length
        ).toBeGreaterThan(0);
    });
});
