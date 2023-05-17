import { useEffect, useState } from "react"
import { auth, db } from "../../firebaseConnection"
import { signOut } from "firebase/auth"
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
 } from "firebase/firestore"

const Admin = () => {

    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState({})

    useEffect(() => {
        async function loadTarefas() {
          const userDetail = localStorage.getItem("@detailUser") 
          setUser(JSON.parse(userDetail))

          if(userDetail) {
            const data = JSON.parse(userDetail)
            const tarefaRef = collection(db, "tarefas")
            const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
            const unsub = onSnapshot(q, (snapshot) => {
                let lista = []
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        userUid: doc.data().userUid
                    })
                })
                console.log(lista)
                setTarefas(lista)
            })
          }

        }

        loadTarefas()
    },[])

    async function handleRegister(e) {
        //adicionando itesn de um dock no db 
        e.preventDefault()

        if(tarefaInput === "") {
            alert("Ops, antes de registrar a sua tarefa você precisa digitar algo...")
            return
        }

        if(edit?.id) {
            handleUpdateTarefa()
            return
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            email: user?.email,
            userUid: user?.uid
        })
        .then(() => {
            console.log("tarefa registrada com sucesso")
            setTarefaInput('')
        })
        .catch((error) => {
            console.log("Ops aconteceu algum erro ao ser registrado" + error)
        })

    }

    async function handleLogout() {
        await signOut(auth)
    }

    async function deleteTarefa(id) {
        //alert(id)
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    function editTarefa(item) {
        setTarefaInput(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa() {
        //alert("atualizar tarefa")
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            console.log("tarefa atualizada com sucesso")
            setTarefaInput('')
            setEdit({})
        })
        .catch((error) => {
            console.log("aconteceu um erro ao atualizar a tarefa" + error)
            setTarefaInput('')
            setEdit({})
        })
    }

    return(
        <div className="bg-slate-900 w-3/4 mx-auto mt-10 p-5 rounded-md shadow-xl shadow-indigo-500">
            <div className="flex justify-center">
                <h1 className="text-4xl p-5 font-bold">Minhas tarefas!</h1>
            </div>
            <form onSubmit={handleRegister}>
                <textarea 
                    className="p-5 w-10/12 rounded-md text-black"
                    placeholder="Digite a sua tarefa..."
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />
                <br />

                    {Object.keys(edit).length > 0 ? (
                        <button
                            className="p-4 bg-green-500 mt-5 rounded-md hover:scale-110 transition-all hover:skew-x-3" 
                            type="submit"
                            >
                                Atualizar a tarefa
                        </button>
                        ) : (
                        <button
                            className="p-4 bg-indigo-500 mt-5 rounded-md hover:scale-110 transition-all hover:skew-x-3" 
                            type="submit"
                            >
                                Registrar a tarefa
                        </button> 
                        )
                    }
                    
            </form>

            {tarefas.map((item) => (
                <article key={item.id} className="p-5 mt-5 bg-slate-700 rounded-md">
                    <p className="mb-3">{item.tarefa}</p>
                    <button
                        onClick={() => editTarefa(item)} 
                        className="bg-slate-100 text-gray-600 w-16 h-6">
                            Editar
                    </button>
                    <button 
                        onClick={() => deleteTarefa(item.id)}
                        className="ml-5 text-amber-400 w-16 h-6">
                            Concluir
                    </button>
                </article>
            ))}


            <button className="bg-red-500 mt-10 text-white w-16 h-16 rounded-full hover:bg-red-700 transition-all" onClick={handleLogout}>
                Sair
            </button>
        </div>
    )
}

export default Admin