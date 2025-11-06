import { useState } from "react";

const Formulario =()=>{
    const [formData, setFormData] = useState ({
        nombre:'',
        email:'',
        direccion:'',
        password:''
    })
    const [error,setError]= useState('')
    const [post,setPost]= useState([])

    const cambio = (e) =>{
        const {name,value}= e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    const enviarDatos = (e)=>{
        e.preventDefault()
        
        if(formData.nombre.length<3){
            setError("el nombre es pequeño")
            return
        }
        if(formData.password.length<6){
            setError("la password debe tener minimo 6 caracteres")
            return
        }
        alert("formulario enviado!!!")
        
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => 
                response.json()
            )
            .then(json => {
                console.log(json)
                setPost(json)
                
            })
    }
    return (
        <main>
            <h2>Formulario de Registro</h2>
            <form onSubmit={enviarDatos}>

                {error && <p style={{color: 'tomato'}}>{error}</p>}

                <label htmlFor="nombre">Nombre:</label>
                <input type="text" name="nombre" id="nombre"
                value={formData.nombre}
                onChange={cambio}
                />

                <label htmlFor="email">Correo Electronico:</label>
                <input type="email" name="email" id="email"
                value={formData.email} onChange={cambio}
                />

                <label htmlFor="direccion">Direccion:</label>
                <input type="direccion" name="direccion" id="direccion"
                value={formData.direccion} onChange={cambio}
                />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"
                value={formData.password} onChange={cambio}
                />

                <input type="submit" value="Enviar" />
            </form>
            <h1>Lista de Post</h1>
            <ul>
                {post.map(pos=>(
                    <li>
                        <h2>{post.id}</h2>
                        <h3>{pos.title}</h3>
                    </li>
                )
                )}

            </ul>
        </main>
    )
}

export default Formulario;