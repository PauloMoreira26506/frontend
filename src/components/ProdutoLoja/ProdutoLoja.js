import React from "react";
import estilo from "./ProdutoLoja.module.css";
import { useNavigate } from "react-router-dom";

const ProdutoLoja = ({imagem, nome, id}) => {

  const navigate = useNavigate();

  const handleClick = () => {      
    navigate(`/store/produto/${id}`);
  }
  return (
    <>
      <div className={estilo.produtos} >
        <img className={estilo.produtosimg} src={imagem} alt="" onClick={handleClick}/>
        <p className={estilo.nomeProduto}>{nome}</p>
      </div>
    </>
  );
};

export default ProdutoLoja;
