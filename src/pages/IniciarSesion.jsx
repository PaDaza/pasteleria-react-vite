import React, { useState } from 'react';

function IniciarSesion() {
    // 1. Estado para almacenar los datos del formulario
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    // 2. Estado para almacenar errores de validación
    const [errors, setErrors] = useState({});

    // Maneja los cambios en los inputs
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 3. Función de validación
    const validate = () => {
        const newErrors = {};

        if (!form.email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'El formato del correo es inválido.';
        }

        if (!form.password) {
            newErrors.password = 'La contraseña es obligatoria.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // Aquí se enviaría la data a tu API/backend
            console.log('Formulario de Login Válido. Enviando data:', form);
            // Ejemplo de lógica de envío...
            alert('¡Inicio de sesión exitoso! (Simulado)');
        } else {
            console.log('Formulario de Login con errores. Por favor, corríjalos.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="col-md-6">
                
                {/* Campo Email */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* Campo Contraseña */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default IniciarSesion;