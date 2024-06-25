import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import fetchData from "../fetchData";
import { UserContext } from "../App";
import ProdutoBiblioteca from "../components/ProdutoBiblioteca/ProdutoBiblioteca";

const Biblioteca = () => {
  const { utilizadorAtual } = useContext(UserContext);
  const [chaves, setChaves] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);

  useEffect(() => {
    const urlChaves = `http://localhost:3001/chaves/listar/${utilizadorAtual.id}`;
    const urlAssociacoes = `http://localhost:3001/chaves/associacoesgerente/${utilizadorAtual.id}`;
    fetchData(urlChaves, setChaves);
    fetchData(urlAssociacoes, setAssociacoes);
  }, [utilizadorAtual]);

  console.log(associacoes);

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        {" "}
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/store">Loja</Breadcrumb.Item>
            <Breadcrumb.Item active>Biblioteca</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        {chaves ? (
          <Row xs={1} md={4} className="g-4">
            {chaves.map((data, index) => (
              <Col key={index}>
                <ProdutoBiblioteca
                  imagem={data.produto.imagem}
                  nome={data.produto.nome}
                  versao={data.produto.versao}
                  compra={data.id}
                />
              </Col>
            ))}
          </Row>
        ) : (
          "Não tem chaves"
        )}
        {associacoes ? (
          <>
            <Row xs={1} md={4} className="g-4">
              {associacoes.map((data, index) => (
                <Col>
                  <ProdutoBiblioteca
                    imagem={data.chave.compra.produto.imagem}
                    nome={data.chave.compra.produto.nome}
                    versao={data.chave.compra.produto.versao}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          "Não tem chaves atribuidas"
        )}
      </Container>
    </div>
  );
};

export default Biblioteca;
