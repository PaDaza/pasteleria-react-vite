import React, { useState } from 'react';

function Registro() {
    // 1. Estado para almacenar los datos del formulario
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (!form.nombre) {
            newErrors.nombre = 'El nombre es obligatorio.';
        }

        if (!form.email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'El formato del correo es inválido.';
        }

        if (!form.password || form.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Debe confirmar la contraseña.';
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // Aquí se enviaría la data a tu API/backend
            console.log('Formulario de Registro Válido. Enviando data:', form);
            // Ejemplo de lógica de envío...
            alert('¡Registro exitoso! (Simulado)');
        } else {
            console.log('Formulario de Registro con errores. Por favor, corríjalos.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crear una Cuenta</h2>
            <form onSubmit={handleSubmit} className="col-md-6">
                
                {/* Campo Nombre */}
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        id="nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>

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

                {/* Campo Confirmar Contraseña */}
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>

                <button type="submit" className="btn btn-primary">
                    Registrarse
                </button>
            </form>
        </div>
    );
}

export default Registro;