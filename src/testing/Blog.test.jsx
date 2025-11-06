import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Blog from "../pages/Blog";

afterEach(cleanup);

describe("blog", ()=>{

    it("renderiza y muestra encabezado", ()=>{
        render(<Blog />);
        expect(screen.getByText(/Blog & Recetas/i)).toBeInTheDocument();
        expect(screen.getByText(/Tips, recetas y novedades/i)).toBeInTheDocument();
    });

    it("filtra artículos con el buscador", ()=>{
        render(<Blog />);

        const input = screen.getByPlaceholderText(/Buscar artículos/i);

        fireEvent.change(input, { target: { value: 'sin azúcar' } });

        
        const results = screen.getAllByText(/sin azúcar/i);
        expect(results.length).toBeGreaterThan(1);
    });

});
