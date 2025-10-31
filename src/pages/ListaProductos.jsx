import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";

// Lista de productos
const listaProductos = [
        {id:1,nombre:"Torta",categoria: "torta"},
        {id:2,nombre:"Pastel Piña",categoria: "pastel"},
        {id:3,nombre:"Torta Lucuma",categoria: "torta"},
        {id:4,nombre:"Pastel Informatico",categoria: "pastel"},
        {id:5,nombre:"Pastelito",categoria: "pastel"},]

function ListaProductos(){
    const location = useLocation()
    const [filtroProductos, setFiltroProductos] = useState ([])
    useEffect(()=>{
        const getParametros = new URLSearchParams(location.search)
        const categoria = getParametros.get("categoria")
        if(categoria){
            setFiltroProductos(listaProductos
                .filter(p=> p.categoria == categoria))
        }else{
            setFiltroProductos(listaProductos)
        }
    },[location.search])
    return(
        <div>
            <h1>Lista de productos</h1>
            {filtroProductos.length>0 ? (
                <ul>
                    {filtroProductos.map(p=>(
                        <li>{p.nombre}</li>
                    ))}
                </ul>
            ):(
                <p>No hay productos en el listado</p>
            )}
        </div>
    )
}
export default ListaProductos;