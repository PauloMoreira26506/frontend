import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import './settings.css';
import { useNavigate } from "react-router-dom";

const CompraRealizada = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <Container className="d-flex flex-column justify-content-center align-items-center main-container fundo">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} md={9}>
                        <div className="text-center content-wrapper">
                        <h1 className="mt-3 account-title" style={{ fontSize: '100px' }}>Compra Realizada</h1>
                        </div>
                        <Button className="submit-button" type="submit" onClick={() => navigate("/store")}>Voltar ao início</Button>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>

    );
};

export default CompraRealizada;
