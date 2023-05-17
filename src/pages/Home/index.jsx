import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
 
 const Home = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        if(email !== "" && password !== "") {

           await signInWithEmailAndPassword(auth, email, password)
           .then(() => {
                navigate('/admin', { replace: true })
           })
           .catch(() => {
            alert("Usuário não existe")
           })

        }else {
            alert("Ops, você precisa preencher todos os dados")
        }
    }

    return(
        <div className="w-1/2 h-1/2 bg-black text-center mx-auto mt-52 rounded-md">
            <div className="p-7">
                <h1 className="p-1 text-3xl font-bold">Lista de tarefas</h1>
                <h4 className="p-1">Gerencie sua agenda de forma fácil.</h4>
            </div>
            <form 
                className="p-4" 
                onSubmit={handleLogin}
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
                    Acessar
                </button>
            </form>
            <Link
                className="text-indigo-600" 
                to="/register"
            >
                Não possui uma conta? Cadastre-se
            </Link>

        </div>
    )
}

export default Home