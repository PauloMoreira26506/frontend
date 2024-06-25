import React, { useState } from "react";
import estilosMenu from "./NavbarMenu.module.css";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Badge,
} from "react-bootstrap";
import ProfilePicture from "../Navbar/ProfilePicture";
import { Link } from "react-router-dom";
import fetchData from "../../fetchData";
import authService from "../../auth.service";

const NavbarMenu = ({ imagem }) => {

  const [utilizador, setUtilizador] = useState([]);

  useState(() => {
    const utilizadorAtual = authService.getCurrentUtilizador();
    if (utilizadorAtual) {
      const url = `http://localhost:3001/utilizadores/${utilizadorAtual.id}`;
      fetchData(url, setUtilizador);
    }
  }, []);

  // Verificar se o utilizador está disponível e definir valores padrão se não estiver
  const nome = utilizador ? utilizador.nome : "Utilizador";
  const email = utilizador ? utilizador.email : "email@example.com";
  const tipoutilizador = utilizador.tipoutilizador
    ? utilizador.tipoutilizador.designacao
    : "Tipo";

  const renderButtons = () => {
    if(!utilizador || !utilizador.tipoutilizador){
      return null;
    }
    switch (utilizador.tipoutilizador.id) {
      case 1:
        return (
          <>
            <Link to="/admin">
              <ButtonGroup style={{ width: "100%" }} className="mb-2">
                <Button
                  className="btn btn-s"
                  style={{ width: "100%" }}
                  href="admin"
                >
                  <Row>
                    {" "}
                    <Col sm={1}>
                      {" "}
                      <i className="bi bi-gear"></i>
                    </Col>
                    <Col className="text-start">Administrar</Col>
                  </Row>
                </Button>
              </ButtonGroup>
            </Link>
          </>
        );
      case 2:
        return (
          <Link to="/admin">
            <ButtonGroup style={{ width: "100%" }} className="mb-2">
              <Button className="btn btn-s" style={{ width: "100%" }}>
                <Row>
                  {" "}
                  <Col sm={1}>
                    {" "}
                    <i className="bi bi-cart"></i>
                  </Col>
                  <Col className="text-start">Carrinho</Col>
                </Row>
              </Button>
            </ButtonGroup>
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-end">
        {" "}
        <div className={`${estilosMenu.menu} shadow`}>
          <Row className="pt-4">
            <Col md={4}>
              <ProfilePicture imagem={imagem} />
            </Col>
            <Col className="d-flex flex-column justify-content-start text-start">
              <Row>
                <Col className="d-flex align-items-start p-0">
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      padding: "0px",
                    }}
                    className="text-start"
                  >
                    {nome}
                  </p>
                </Col>
                <Col>
                  <Badge pill>{tipoutilizador}</Badge>
                </Col>
              </Row>
              <Row>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "var(--Cinzento)",
                    padding: "0px",
                  }}
                >
                  {email}
                </p>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center p-4">
            <Col>
              {renderButtons()}
              <Link to="/settings">
                <ButtonGroup style={{ width: "100%" }} className="mb-2">
                  <Button
                    className="btn btn-s"
                    style={{ width: "100%" }}
                    href="settings"
                    // onClick={() => navigate("/SettingsAccount.js")}
                  >
                    <Row>
                      {" "}
                      <Col sm={1}>
                        {" "}
                        <i className="bi bi-gear"></i>
                      </Col>
                      <Col className="text-start">Definições</Col>
                    </Row>
                  </Button>
                </ButtonGroup>
              </Link>
              <Link to="/store/biblioteca">
                <ButtonGroup style={{ width: "100%" }} className="mb-2">
                  <Button className="btn btn-s" style={{ width: "100%" }}>
                    <Row>
                      {" "}
                      <Col sm={1}>
                        {" "}
                        <i className="bi bi-collection"></i>
                      </Col>
                      <Col className="text-start">Biblioteca</Col>
                    </Row>
                  </Button>
                </ButtonGroup>
              </Link>
              <Link to="/">
                {" "}
                <ButtonGroup style={{ width: "100%" }} className="mb-2">
                  <Button className="btn btn-s" style={{ width: "100%" }} onClick={authService.logout}>
                    <Row>
                      {" "}
                      <Col sm={1}>
                        {" "}
                        <i className="bi bi-door-closed"></i>
                      </Col>
                      <Col className="text-start">Terminar sessão</Col>
                    </Row>
                  </Button>
                </ButtonGroup>
              </Link>
            </Col>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default NavbarMenu;
