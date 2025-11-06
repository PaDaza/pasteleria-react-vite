function Contacto() {
    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">Contáctanos</h2>

            <div className="row g-4">
                
                <div className="col-lg-8">
                    <div className="card card-form p-3 p-md-4 shadow-sm">
                        <h5 className="text-chocolate mb-3">Envíanos un mensaje</h5>

                        <form
                            className="row g-3"
                            onsubmit="event.preventDefault(); alert('¡Gracias! Te responderemos pronto 😊'); this.reset();"
                        >
                            <div className="col-md-6">
                                <label for="firstName" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="form-control"
                                    placeholder="Tu nombre..."
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label for="lastName" className="form-label">Apellido</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="form-control"
                                    placeholder="Tu apellido..."
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label for="email" className="form-label">Correo</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="tu@correo.com"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label for="country" className="form-label">País</label>
                                <select id="country" className="form-select" required>
                                    <option value="" selected disabled>Selecciona tu país</option>
                                    <option>Chile</option>
                                    <option>Argentina</option>
                                    <option>Perú</option>
                                    <option>Colombia</option>
                                    <option>México</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label for="subject" className="form-label">Asunto</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="form-control"
                                    placeholder="Motivo del contacto..."
                                    required
                                />
                            </div>

                            <div className="col-12">
                                <label for="message" className="form-label">Mensaje</label>
                                <textarea
                                    id="message"
                                    className="form-control"
                                    rows="6"
                                    placeholder="Escribe tu mensaje..."
                                    required
                                ></textarea>
                            </div>

                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-custom">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>

                
                <div className="col-lg-4">
                    <div className="p-3 p-md-4 bg-light rounded shadow-sm h-100">
                        <h5 className="text-chocolate mb-3">Información</h5>

                        <div className="d-flex align-items-start gap-3 mb-3">
                            <div className="icon-pill"><i className="bi bi-geo-alt"></i></div>
                            <div>
                                <strong>Dirección</strong><br />
                                Av. Dulce 1234, Santiago, Chile
                            </div>
                        </div>

                        <div className="d-flex align-items-start gap-3 mb-3">
                            <div className="icon-pill"><i className="bi bi-telephone"></i></div>
                            <div>
                                <strong>Teléfono</strong><br />
                                +56 9 1234 5678
                            </div>
                        </div>

                        <div className="d-flex align-items-start gap-3 mb-3">
                            <div className="icon-pill"><i className="bi bi-envelope"></i></div>
                            <div>
                                <strong>Email</strong><br />
                                contacto@milsabores.cl
                            </div>
                        </div>

                        <hr />
                        <h6 className="text-chocolate">Horario</h6>
                        <p className="mb-0">
                            Lun–Sáb: 9:00–19:00<br />
                            Dom: 10:00–14:00
                        </p>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default Contacto;