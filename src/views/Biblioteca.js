import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Breadcrumb, Accordion } from "react-bootstrap";
import fetchData from "../fetchData";
import { UserContext } from "../App";
import ProdutoBiblioteca from "../components/ProdutoBiblioteca/ProdutoBiblioteca";
import ProdutoGerente from "../components/ProdutoBiblioteca/ProdutoGerente";

const Biblioteca = () => {
  const { utilizadorAtual } = useContext(UserContext);
  const [chaves, setChaves] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);

  useEffect(() => {
    const urlChaves = `https://backend-owlr.onrender.com/chaves/listar/${utilizadorAtual.id}`;
    const urlAssociacoes = `https://backend-owlr.onrender.com/chaves/associacoesgerente/${utilizadorAtual.id}`;
    fetchData(urlChaves, setChaves);
    fetchData(urlAssociacoes, setAssociacoes);
  }, [utilizadorAtual]);

  console.log(associacoes.length);
  console.log(chaves.length);

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
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Produtos</Accordion.Header>
            <Accordion.Body>
              {chaves.length > 0 ? (
                <Row xs={1} md={4}>
                  {chaves.map((data, index) => (
                    <Col key={index}>
                      <ProdutoBiblioteca
                        imagem={data.versaoproduto.produto.imagem}
                        nome={data.versaoproduto.produto.nome}
                        versao={data.versaoproduto.versao}
                        compra={data.id}
                        produto={data.versaoproduto.produtoid}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                "Não tem chaves"
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Produtos atríbuidos</Accordion.Header>
            <Accordion.Body>
              {associacoes.length > 0 ? (
                <Row xs={1} md={4}>
                  {associacoes.map((data, index) => (
                    <Col key={index}>
                      <ProdutoGerente
                        imagem={data.chave.compra.versaoproduto.produto.imagem}
                        nome={data.chave.compra.versaoproduto.produto.nome}
                        versao={data.chave.compra.versaoproduto.versao}
                        chave={data.chaveid}
                        compra={data.chave.compraid}
                        produto={data.chave.produtoid}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                "Não tem chaves atribuidas"
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};

export default Biblioteca;
