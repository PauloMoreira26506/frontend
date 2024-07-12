import React from "react";
import estilo from "./Pacote.module.css";
import { Container, Row, Col } from "react-bootstrap";

const Pacote = ({ pacote }) => {
  return (
    <Container className="mb-2">
      <Row className={estilo.fundo}>
        <Col sm={2} className={`d-flex justify-content-center align-items-center ${estilo.pacote}`}>
          <p>{pacote.designacao}</p>
        </Col>
        {pacote.produtos.map((produto, index) => (
          <Col key={index} className="d-flex justify-content-center align-items-center">
            <div className={estilo.produto}>
              <p onClick={() => window.location.href = `/store/produto/${produto.id}`}>{produto.nome}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Pacote;
