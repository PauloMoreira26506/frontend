import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import MoreButton from "../components/Buttons/MoreButton";
import Footer from "../components/Footer";

const SettingsAccount2 = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Col md={9}>
                    <Row>
                        <div className="px40Azul p-5">
                            <h2>Definições de Conta</h2>
                            <p className="mb-5">Informações de conta</p>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <Form.Group className="mb-3">
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
                                        <Button className="submit-button" type="submit">
                                            Atualizar Perfil
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                            <p className="mt-5">Detalhes de Pagamento</p>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className="input"
                                                placeholder="Número de Cartão"
                                                aria-label="Card Number"
                                            />
                                            <Button variant="outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </InputGroup>
                                        <Row>
                                            <Col md={6}>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        className="input"
                                                        placeholder="Data de Expiração"
                                                        aria-label="Expiration Date"
                                                    />
                                                    <Button variant="outline-secondary">
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                            <Col md={6}>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        className="input"
                                                        placeholder="Código de segurança"
                                                        aria-label="Security Code"
                                                    />
                                                    <Button variant="outline-secondary">
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                className="input"
                                                placeholder="Número de Cartão"
                                                aria-label="Card Number"
                                            />
                                            <Button variant="outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                        </InputGroup>
                                        <Row>
                                            <Col md={6}>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        className="input"
                                                        placeholder="Data de Expiração"
                                                        aria-label="Expiration Date"
                                                    />
                                                    <Button variant="outline-secondary">
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                            <Col md={6}>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        className="input"
                                                        placeholder="Código de segurança"
                                                        aria-label="Security Code"
                                                    />
                                                    <Button variant="outline-secondary">
                                                        <i className="bi bi-pencil"></i>
                                                    </Button>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Col>
            </Container>

            <Footer></Footer>
        </>
    );
};

export default SettingsAccount2; 
