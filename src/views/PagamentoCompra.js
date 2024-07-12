import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './settings.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";

const PagamentoCompra = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container className="d-flex flex-column justify-content-center align-items-center main-container">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="mt-3 account-title">Pagamento</h2>
            <Button className="payment-button" block>Cartão de Credito</Button>
            <Button className="payment-button" block>Multibanco</Button>
            <Button className="payment-button" block>MB WAY</Button>
            <Button className="payment-button" block>Paypal</Button>
          </Col>
          <Col xs={12} md={6}>
            <div className="order-summary-box">
              <h3>Resumo do pedido</h3>
              <div className="order-item">Nome do Produto: 0,00€</div>
              <div className="order-item">Nome do Produto: 0,00€</div>
              <div className="order-price">Preço: 0,00€</div>
              <div className="order-taxes">Taxas: 0,00€</div>
              <div className="order-total">Total: 0,00€</div>
              <Form.Group controlId="promoCode">
                <Form.Control type="text" placeholder="Código Promocional" className="promo-code-input" />
              </Form.Group>
              <Form.Group controlId="terms">
                <Form.Check type="checkbox" label="Eu aceito os Privacy Policy and Terms and Conditions" />
              </Form.Group>
              <Button className="mt-3 finalize-button" block>Finalizar Compra</Button>
            </div>
          </Col>
        </Row>
        <Button className="submit-button" type="submit" onClick={() => navigate("/store")}>
          Voltar ao início
        </Button>
      </Container>
      <Footer />

    </>
  );
};

export default PagamentoCompra;
