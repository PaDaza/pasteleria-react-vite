import { useParams } from "react-router-dom";

const PerfilUsuario = () =>{
    
    const {nombreUsuario } = useParams()

    return (
        <div>
            <h1>Perfil del Usuario</h1>
            <h2>
                <p>Usuario:{nombreUsuario}</p>
            </h2>
        </div>
    )

}
export default PerfilUsuario;