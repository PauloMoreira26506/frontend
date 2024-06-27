import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import estilosProduto from "./Produto.module.css";
import Slider from "../components/Slider/Slider";
import Footer from "../components/Footer";
import fetchData from "../fetchData";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../App";
import axios from 'axios';

export const Produto = () => {
  const { produtoId } = useParams();
  const [produto, setProduto] = useState([]);
  const { utilizadorAtual } = useContext(UserContext);

  const url = `https://backend-owlr.onrender.com/produtos/${produtoId}`;

  useEffect(() => {
    fetchData(url, setProduto);
  }, [url]);

  const converterData = (data) => {
    const date = new Date(data);
    return date.toISOString().split("T")[0];
  };

  const handleObter = async () => {
    try{
      const response = await axios.post('https://backend-owlr.onrender.com/chaves/associar', { utilizador: utilizadorAtual.id, produto: produtoId});
      console.log('Chave associada com sucesso: ', response.data);
    } catch (error) {
      if(error.response){
        const resposta = error.response.data.message;
        alert(resposta);
      }
      
      console.error('Erro ao associar a chave ao utilizador: ', error);
    }
  }

  const calcularEstrelas = (classificacao) => {
    const totalEstrelas = 5;
    const estrelasCompletas = Math.floor(classificacao);
    const estrelasMetade = classificacao % 1 >= 0.5 ? 1 : 0;
    const estrelasVazias = totalEstrelas - estrelasCompletas - estrelasMetade;

    const estrelas = [];
    for (let i = 0; i < estrelasCompletas; i++){
      estrelas.push(<i key={`estrela-${i}`} className="bi bi-star-fill"></i>);
    }
    if (estrelasMetade === 1) {
      estrelas.push(<i key="estrelametade" className="bi bi-star-half"></i>);
    } 
    for (let i = 0; i < estrelasVazias; i++){
      estrelas.push(<i key={`estrelavazia-${i}`} classNamme="bi bi-star"></i>);
    }

    return estrelas;
    }

    const obterPrints = (texto) => {

      const prints = texto.split("|");
      console.log("Prints: ", prints);
      return prints;
    }
  return (
    <>
      <Navbar/>
      <Container>
        <Row className="mt-5">
          <Breadcrumb>
            <Breadcrumb.Item href="/store">Loja</Breadcrumb.Item>
            <Breadcrumb.Item active>{produto.nome}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Col className="no-gutters">
            <div className={estilosProduto.capaProduto}>
              {" "}
              <img src={produto.capa} alt="" />
              <div className={estilosProduto.gradiente}></div>
            </div>
          </Col>
        </Row>
        <Row style={{ position: "relative", top: "-40px", zIndex: "1" }}>
          <Col md={9}>
            <Col
              style={{
                backgroundColor: "var(--CinzentoClaro)",
                borderRadius: "20px",
                height: "100%",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              {" "}
              <Col className="d-flex bg-dark}" style={{ marginLeft: "10px" }}>
                {" "}
                <h2 className={estilosProduto.nomeProduto}>{produto.nome}</h2>
              </Col>
              <Col
                md={2}
                className="d-flex justify-content-center align-items-center"
              >
                {" "}
                {produto.categoriaproduto && produto.categoriaproduto.designacao && (
                  <p className={estilosProduto.categoriaProduto}>
                    {produto.categoriaproduto.designacao}
                  </p>
                )}
              </Col>
            </Col>
          </Col>
          <Col>
            <Button
              size="lg"
              style={{ width: "100%" }}
              className="shadow-lg rounded-4"
              onClick={handleObter}
            >
              Obter
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Row className="mb-5">
              <p className={`${estilosProduto.descricao} text-start`}>
                {produto.descricao}
              </p>
            </Row>
            <Row>
              <Col className="flex-column" md={2}>
                <p style={{ fontSize: "20px", fontWeight: "600" }}>
                  Classificação
                </p>
                <p style={{ fontSize: "40px", fontWeight: "600" }}>
                  {produto.classificacao}
                </p>
                <div className="estrelas">
                  {}
                  {calcularEstrelas(produto.classificacao)}
                </div>
              </Col>
              <Col>
                <div className={estilosProduto.barrasClassificacao}>
                  Área para as barras de classificação
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={{ offset: 1 }} className="text-start p-5">
            <Row>
              {" "}
              <Col md={1}>
                <i className="bi bi-file-arrow-up"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Desenvolvedor
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--AzulEscuro)",
                    }}
                  >
                    {produto.emp}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="mt-2">
              {" "}
              <Col md={1}>
                <i className="bi bi-calendar"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Data de publicação
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--AzulEscuro)",
                    }}
                  >
                    {produto.publicacao
                      ? converterData(produto.publicacao)
                      : ""}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="mt-2">
              {" "}
              <Col md={1}>
                <i className="bi bi-file-earmark-text"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Versão recente
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--AzulEscuro)",
                    }}
                  >
                    {produto.versao}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="mt-2">
              {" "}
              <Col md={1}>
                <i className="bi bi-box-seam"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Tamanho
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--AzulEscuro)",
                    }}
                  >
                    {produto.tamanho} MB
                  </p>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <Col md={9} className="mt-5">
            {produto.prints ? <Slider prints={obterPrints(produto.prints)}/> : ""}
          </Col>
        </Row>
        <Row>
          <div className={estilosProduto.titulos}>
            {" "}
            <h1 className={estilosProduto.titulo}>Pacotes</h1>
            <div className={estilosProduto.gradienteTitulo}> </div>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "300",
                position: "relative",
                top: "-100px",
                color: "var(--Preto)",
              }}
            >
              Obtenha desconto no produto por comprar em conjunto
            </p>
          </div>
          <Row>
            <div style={{ backgroundColor: "grey", height: "200px" }}>
              Área para pacotes
            </div>
          </Row>
        </Row>
        <Row>
          <div className={estilosProduto.titulos}>
            {" "}
            <h1 className={estilosProduto.titulo}>Extensões</h1>
            <div className={estilosProduto.gradienteTitulo}> </div>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "300",
                position: "relative",
                top: "-100px",
                color: "var(--Preto)",
              }}
            >
              Descubra mais funcionalidades com estas versões
            </p>
          </div>
          <Row>
            <div style={{ backgroundColor: "grey", height: "200px" }}>
              Área para extensões
            </div>
          </Row>
        </Row>
        <Row>
          <Row className="text-start mt-5 mb-2">
            <h3
              style={{
                fontSize: "48px",
                fontWeight: "600",
                color: "var(--Preto)",
              }}
            >
              Pedir orçamento
            </h3>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "300",
                color: "var(--Preto)",
              }}
            >
              Solicite um orçamento personalizado para adquirir vários softwares
            </p>
          </Row>
          <Form>
            <Row className="text-start">
              <Col md={4}>
                <FormGroup>
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control type="text" placeholder="Nome da empresa" />
                </FormGroup>
              </Col>
              <Col md={4}>
                {" "}
                <FormGroup>
                  <Form.Label>Licenças</Form.Label>
                  <Form.Control type="text" placeholder="Número de licenças" />
                </FormGroup>
              </Col>
              <Col md={4}>
                {" "}
                <FormGroup>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Qual a área da empresa"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="text-end">
              <Col>
                <Button
                  type="submit"
                  style={{ width: "200px" }}
                  className="mt-2"
                >
                  Solicitar
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
