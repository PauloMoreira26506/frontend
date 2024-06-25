import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="fundoAzul">
      <Container md={2}>
        <div className="fundo">
        <Row>
          <Col style={{marginBottom:"100px"}}>
            <nav className="navbar">
              <img src="Logo_Branco.png" alt="Logo" className="navbar-logo"/>
              <div className="links">
                <a href="/create">Criar conta</a>
                <a href="/login">Fazer login</a>
              </div>
            </nav>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={2}></Col>
          <Col style={{textAlign:"left"}} md={8}>
            <h1 className="tituloCodeStore">CODE STORE</h1>
            <h2 className="slogan">
              Encontre os softwares que precisa para a sua empresa.
            </h2>
          </Col>
          <Col md={2}></Col>
        </Row>
        </div>

        <Row>
          <Col md={4}>
            <h4 className="titulo-secundario">O que fazemos</h4>
            <p className="paragrafo">Focamo-nos em distribuir os softwares que a sua empresa necessita. Isto inclui uma vasta quantidade de programas que podem ser úteis em vários setores, dos quais, Design, Programação e Música por exemplo.</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col></Col>
          <Col md={4}>
            <h4 className="titulo-secundario">Organização</h4>
            <p className="paragrafo">Faça a gestão dos seus produtos. Atribua a quem deseja, os cargos necessários para que possa gerir por si.</p>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Main;
