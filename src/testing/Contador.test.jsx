import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Contador from "../pages/Contador";


afterEach(cleanup);

describe("contador", () => {
    it("muestra contador inicial 0", () => {
        render(<Contador />);
        expect(screen.getByText(/Contador:\s*0/i)).toBeInTheDocument();
    });

    it("incrementa al hacer click", () => {
        render(<Contador />);
        const btn = screen.getByRole("button", { name: /incrementar/i });
        fireEvent.click(btn);
        expect(screen.getByText(/Contador:\s*1/i)).toBeInTheDocument();
    });
});
