import { Route, Routes } from "react-router"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>} />
      
    </Routes>
  )
}

export default App