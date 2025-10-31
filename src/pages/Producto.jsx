import { useEffect } from "react";

const Productos=()=> {
    useEffect(()=>{
        if (!document.querySelector("script[src='/js/script_main.js']")) {
            console.log("no esta")
            const sc = document.createElement("script")
            sc.src = '/js/script_main.js'
            sc.async = true
            document.body.appendChild(sc)
            sc.onload=()=>{
                window.renderCatalogo()
            }
        }
    })
    return (
        <main>
            <h2>Catálogo de Productos</h2>
            <section className="recomendaciones catalogo"></section>
        </main>
    )
}

export default Productos;