import React, { useState, useEffect } from "react";
import fetchData from "../../fetchData";
import { useParams } from "react-router-dom";
import { Content, Row, Col, Box, Button } from "adminlte-2-react";

const Orcamento = () => {
  const [orcamento, setOrcamento] = useState([]);
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    const url = `https://backend-owlr.onrender.com/orcamento/${id}`;
    fetchData(url, setOrcamento);
  }, []);
  return (
    <>
      <Content>
        <Row>
            <p><strong>Empresa</strong> {orcamento.empresa}</p>
            <p><strong>Licenças</strong> {orcamento.licencas}</p>
            <p><strong>Setor</strong> {orcamento.setor}</p>
            <p><strong>Data</strong> {orcamento.data}</p>
            {orcamento.utilizador ? (<p><strong>Email</strong> {orcamento.utilizador.email}</p>) : ""}
            {orcamento.utilizador ? (<p><strong>Telemóvel</strong> {orcamento.utilizador.telemovel}</p>) : ""}
            <p><strong>Pacote</strong> {orcamento.pacote ? orcamento.pacote.designacao : "Não"}</p>
            <p><strong>Extensão</strong> {orcamento.extensao ? orcamento.extensao.designacao : "Não"}</p>
            <p><strong>Mensagem</strong></p>
            <p>{orcamento.mensagem}</p>
        </Row>
      </Content>
    </>
  );
};

export default Orcamento;
