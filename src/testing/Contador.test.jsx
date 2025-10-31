import Contador from "../pages/contador";
import { render,screen,cleanup, fireEvent } from "@testing-library/react";
import { describe,it,expect,afterEach } from "vitest";

afterEach(cleanup)

describe('contador',()=>{
    it('render del componente con el boton',()=>{
        render(<Contador/>);
        expect(screen.getByText(/Contador: 0/i)).toBeInTheDocument()
        expect(screen.getByRole('button',{name:/Incrementar/})).toBeInTheDocument()
    });
    it('el boton incrementa',()=>{
        render(<Contador/>)
        const boton = screen.getByRole('button',{name:/Incrementar/})

        fireEvent.click(boton)
        expect(screen.getByText(/Contador: 1/i)).toBeInTheDocument()
    })
})