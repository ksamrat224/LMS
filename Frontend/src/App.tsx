import { Route, Routes } from "react-router"
import Register from "./pages/Register"
import Login from "./pages/Login"
import AppLayout from "./layout/AppLayout"

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <AppLayout/> : <Login/>
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes/>}>
        {/* Nested routes can be added here */}
        <Route path="/book" element={<div>Book Page</div>} />
        <Route path="/member" element={<div>Member Page</div>} />
        <Route path="/transaction" element={<div>Transaction Page</div>} />
      </Route>
      {/* Public routes */}
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>} />
      
    </Routes>
  )
}

export default App