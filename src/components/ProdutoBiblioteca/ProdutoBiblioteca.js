import React from "react";
import estilo from "./ProdutoBiblioteca.module.css";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProdutoBiblioteca = ({ imagem, nome, versao, compra }) => {
  return (
    <>
      <div className={estilo.card}>
        <Container className="position-absolute bottom-0 z-1">
          <Row className={estilo.botoes}>
            <Col>
              {" "}
              <Link to={"/store/biblioteca/gerir/"+compra}>
                <Button className="w-100 m-1">Gerir</Button>
              </Link>
            </Col>
            <Col>
              {" "}
              <Button className="w-100 m-1">Instalar</Button>
            </Col>
          </Row>

          <p className={`${estilo.nome} mt-1`}>
            {nome}
            <span className={`${estilo.badge} m-2`}>
              <Badge>{versao}</Badge>
            </span>
          </p>
        </Container>

        <img className={estilo.imagem} src={imagem} alt="Imagem do produto"/>
      </div>
    </>
  );
};

export default ProdutoBiblioteca;
