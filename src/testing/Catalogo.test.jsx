import { render, screen, waitFor } from "@testing-library/react";
import Catalogo from "../pages/Catalogo";

describe('catalogo', () => {
    beforeEach(() => {
        
        const sc = document.createElement('script');
        sc.src = '/js/script_main.js';
        document.body.appendChild(sc);

        
        window.PRODUCTOS = {
            1: { id: 1, nombre: "Torta A", cat: "Tortas", precio: 1000, imagen: "/img/a.png", descripcion: "A" },
            2: { id: 2, nombre: "Torta B", cat: "Tortas", precio: 2000, imagen: "/img/b.png", descripcion: "B" },
            3: { id: 3, nombre: "Brownie", cat: "Postres", precio: 1500, imagen: "/img/c.png", descripcion: "C" },
        };
        window.CATEGORIAS = ["all", "Tortas", "Postres"];
    });

    it('muestra productos iniciales', async () => {
        render(<Catalogo />);
        
        const botones = await screen.findAllByRole('button', { name: /agregar/i });
        expect(botones.length).toBeGreaterThanOrEqual(3);
    });
});
