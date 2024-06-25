import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './App';

const ProtectedRoute = ({ children, allowedTypes }) => {
  const { utilizadorAtual } = useContext(UserContext);

  if (!utilizadorAtual || !allowedTypes.includes(utilizadorAtual.tipoutilizador)) {
    // Redirecionar para a página da loja se não tiver permissão
    return <Navigate to="/store" />;
  }

  // Se tiver permissão, renderizar o componente filho
  return children;
};

export default ProtectedRoute;
