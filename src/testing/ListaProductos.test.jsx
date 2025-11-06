import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ListaProductos from "../pages/ListaProductos.jsx";

afterEach(cleanup);

describe('listaproductos', () => {
    it('lista sin filtro', () => {
        render(
            <MemoryRouter initialEntries={['/productos']}>
                <ListaProductos />
            </MemoryRouter>
        );
        
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
    });

    it('filtra por categoria en querystring', () => {
        render(
            <MemoryRouter initialEntries={['/productos?categoria=torta']}>
                <ListaProductos />
            </MemoryRouter>
        );
        expect(screen.getByText(/Torta Lucuma/i)).toBeInTheDocument();
        expect(screen.queryByText(/Pastel Piña/i)).not.toBeInTheDocument();
    });
});
