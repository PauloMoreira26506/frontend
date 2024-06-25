import React, { lazy, useState, createContext } from "react";
import AuthService from "./auth.service";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import CreateAccount from "./views/CreateAccount";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./views/Login";
import SettingsAccount from "./views/SettingsAccount";
import StoreMain from "./views/StoreMain";
import Listar from "./views/Listar";
import { Produto } from "./views/Produto";
import Biblioteca from "./views/Biblioteca";
import Gerir from "./views/Gerir";
import ProtectedRoute from "./ProtectedRoutes";
const Admin = lazy(() => import("./views/Admin/Admin"));

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [utilizadorAtual, setUtilizadorAtual] = useState(() => {
    const utilizador = AuthService.getCurrentUtilizador();
    return utilizador;
  });

  return (
    <UserContext.Provider value={{ utilizadorAtual, setUtilizadorAtual }}>
      {children}
    </UserContext.Provider>
  );
};

function App() {
  // const [utilizadorAtual, setUtilizadorAtual] = useState("");

  // useEffect(() => {
  //   const utilizador = AuthService.getCurrentUtilizador();
  //   if (utilizador) {
  //     setUtilizadorAtual({ utilizadorAtual: utilizador });
  //   }
  // }, []);

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/create" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<SettingsAccount />} />
            <Route path="/store" element={<StoreMain />} />
            <Route path="/store/populares" element={<Listar />} />
            <Route
              path="/store/produto/:produtoId"
              element={
                <ProtectedRoute allowedTypes={[1, 2]}>
                  <Produto />
                </ProtectedRoute>
              }
            />
            <Route path="/store/:categoriaId" element={<Listar />} />
            <Route path="/store/search" element={<Listar />} />
            <Route path="/store/biblioteca" element={<Biblioteca />} />
            <Route path="/store/biblioteca/gerir/:id" element={<Gerir />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedTypes={[1]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
