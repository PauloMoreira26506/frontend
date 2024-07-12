import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import './settings.css';
import { useNavigate } from "react-router-dom";

const SettingsAccount = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <Container className="d-flex flex-column justify-content-center align-items-center main-container text-start">
                    <Row className="w-100 justify-content-center">
                        <Col xs={12} md={9}>
                            <div className="content-wrapper">
                                <h2 className="mt-3 account-title">Definições de Conta</h2>
                                <p className="mb-3 account-info">Informações de conta</p>
                            <Row>
                                <Col xs={12}>
                                    <Form>
                                        <Form.Group className="mb-2 text-start">
                                            <Form.Label>ID: xxxxxxxxxxxxxxxxxxxxxx</Form.Label>
                                        </Form.Group>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className="input"
                                                placeholder="UserName"
                                                aria-label="Username"
                                            />
                                            <Button variant="outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className="input"
                                                placeholder="Email"
                                                aria-label="Email"
                                            />
                                            <Button variant="outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className="input"
                                                placeholder="Número de Telemóvel"
                                                aria-label="Phone Number"
                                            />
                                            <Button variant="outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className="input"
                                                placeholder="Idioma"
                                                aria-label="Language"
                                            />
                                            <Button variant="outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </InputGroup>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Bio"
                                            />
                                            <Button variant="outline-secondary" className="mt-2">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </Form.Group>
                                        <Button className="submit-button" type="submit" onClick={() => navigate("/perfilatualizado")}>
                                            Atualizar Perfil
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                            <p className="mt-5">Detalhes de Pagamento</p>
                            <Row>
                                <Col xs={12}>
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className="input"
                                                placeholder="4111 1111 1111 1111"
                                                aria-label="Card Number"
                                            />
                                            <Button variant="outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </InputGroup>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        className="input"
                                                        placeholder="12/25"
                                                        aria-label="Expiration Date"
                                                    />
                                                    <Button variant="outline-secondary">
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        className="input"
                                                        placeholder="123"
                                                        aria-label="Security Code"
                                                    />
                                                    <Button variant="outline-secondary">
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Button className="submit-button" type="submit" onClick={() => navigate("/settings2")}>
                                            Adicionar Cartão
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default SettingsAccount;
