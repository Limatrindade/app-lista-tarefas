import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../firebaseConnection"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
 
 const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()
        if(email !== "" && password !== "") {

            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/adim" , { replace: true })
            })
            .catch(() => {
                console.log("erro ao cadastrar")
            })

        }else {
            alert("ops, você precisa preencher todos os dados")
        }
    }

    return(
        <div className="w-1/2 h-1/2 bg-black text-center mx-auto mt-52 rounded-md">
            <div className="p-7">
                <h1 className="p-1 text-3xl font-bold">Crie uma conta</h1>
                <h4 className="p-1">Vamos criar a sua conta!</h4>
            </div>
            <form 
                className="p-4" 
                onSubmit={handleRegister}
            >
                <input
                    className="w-96 h-8 rounded-md text-center text-black"
                    type="text"
                    placeholder="Digite o seu email..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <input 
                    className="mt-5 w-96 h-8 rounded-md text-center text-black"
                    type="password"
                    placeholder="Digite a sua senha..."
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <button
                    className="p-4 mt-5 bg-teal-400 w-96 h-8 flex justify-center items-center mx-auto rounded-md hover:scale-110 transition-all hover:skew-x-3"
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
            <Link
                className="text-indigo-600" 
                to="/"
            >
                Já possui uma conta? Entre aqui
            </Link>

        </div>
    )
}

export default Register