import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer style={{marginTop:'200px'}}>
        <Container>
          <Row>
            <Col className="mt-5">
              <img src="Logo.png" alt="" style={{ height: "68px" }} />
              <p className="px24Azul">Code Store</p>
            </Col>
          </Row>
          <Row>
            <Col className="p-5">
              <h5 className="px24Azul2 mb-4">Suporte</h5>
              <Row>
                <Col md={1}>
                  <i className="bi bi-chat-square branco"></i>
                </Col>
                <Col style={{textAlign:'left'}}>
                  <p className="px20Branco">Fale connosco se tiver alguma pergunta</p>
                </Col>
              </Row>
            </Col>
            <Col className="p-5 ">
              <h5 className="px24Azul2 mb-4">Contactos</h5>
              <Row>
                <Col md={1}>
                  <i className="bi bi-telephone branco"></i>
                </Col>
                <Col style={{textAlign:'left'}}>
                  <p className="px20Branco">+351 360 360 360</p>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <i className="bi bi-envelope branco"></i>
                </Col>
                <Col style={{textAlign:'left'}}>
                  <p className="px20Branco">codestore@email.pt</p>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <i className="bi bi-geo-alt branco"></i>
                </Col>
                <Col style={{textAlign:'left'}}>
                  <p className="px20Branco">Av. Cor. José Maria Vale de Andrade s/n,Campus Politécnico Santa Maria, 3504-510 Viseu</p>
                </Col>
              </Row>
            </Col>
            <Col className="p-5">
              <h5 className="px24Azul2 mb-4">Social</h5>
              <Row>
                <Col md={1}>
                  <i className="bi bi-instagram branco"></i>
                </Col>
                <Col style={{textAlign:'left'}}>
                  <p className="px20Branco">Instagram</p>
                </Col>
              </Row>
              <Row>
                <Col md={1}>
                  <i className="bi bi-facebook branco"></i>
                </Col>
                <Col style={{textAlign:'left'}}>
                  <p className="px20Branco">Facebook</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
