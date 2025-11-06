import '@testing-library/jest-dom'
import { expect } from "vitest";


const localStorageMock = (function() {
    let store = {}; // Almacenamiento simulado en memoria

    return {
        getItem: function(key) {
            // Retorna el valor o null si no existe
            return store[key] || null;
        },
        setItem: function(key, value) {
            // Convierte el valor a string, como lo hace el localStorage real
            store[key] = value.toString();
        },
        clear: function() {
            // Limpia el almacenamiento simulado
            store = {};
        },
        removeItem: function(key) {
            delete store[key];
        }
    };
})();

// Reemplazar el localStorage global de la ventana con nuestro mock antes de que se ejecuten los tests
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

