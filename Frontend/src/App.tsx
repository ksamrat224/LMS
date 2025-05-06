import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Members from "./pages/Members";
import AddMember from "./pages/AddMember";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  let decodedToken = null;
  try {
    decodedToken = token && jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
  }

  return decodedToken ? <AppLayout /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        {/* Nested routes can be added here */}
        <Route path="/" element={<Navigate to="/book" />} />
        <Route path="/book" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<AddBook />} />
        <Route path="/delete-book/:id" element={<AddBook />} />
        <Route path="/member" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/edit-member/:id" element={<AddMember />} />
        <Route path="/delete-member/:id" element={<AddMember />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<AddTransaction />} />
        <Route path="/delete-transaction/:id" element={<AddTransaction />} />
      </Route>
      {/* Public routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={<p className="text-center">ERROR 404: Page not Found!!</p>}
      />
    </Routes>
  );
};

export default App;
