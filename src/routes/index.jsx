import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Register from '../pages/Register'
import Admin from "../pages/Admin"
import Private from "./Private"

 const RoutesApp= () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/register" element={ <Register/> }/>
                <Route path="/admin" element={ <Private> <Admin/> </Private> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp