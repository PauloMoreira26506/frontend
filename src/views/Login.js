import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo é de preenchimento obrigatório!
      </div>
    );
  }
};

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    AuthService.login(email, password)
      .then((res) => {
        if (res === "" || res === false) {
          setMessage("Autenticação falhou.");
        } else {
          if (res.tipoutilizador === 3) {
            navigate("/store/biblioteca");
          } else {
            navigate("/store");
          }
        }
      })
      .catch((error) => {
        setMessage("Autenticação falhou.");
        setLoading(false);
      });
  }
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "var(--Branco)" }}
      >
        <Row className="rounded-4 shadow box-area cinzentoClaro">
          <Col
            md={6}
            className="rounded-4 d-flex justify-content-center align-items-center flex-column left-box azul"
          >
            <i className="bi bi-arrow-left-circle canto"></i>
            <div className="imagem_logo">
              <a href="/">
                <img src="Logo.png" alt="Logo" style={{ height: "254px" }} />
              </a>
            </div>
          </Col>
          <Col md={6}>
            <Row>
              <div className="px40Azul p-5">
                <p className="mb-5 mt-5">Login</p>
                <Row>
                  <Col md={1}></Col>
                  <Col>
                    <Form onSubmit={handleLogin}>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="bi bi-file-person"
                            style={{ color: "var(--Cinzento)", opacity: "0.8" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          className="input"
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="basic-addon1"
                          value={email}
                          onChange={(value) => setEmail(value.target.value)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="bi bi-file-lock2"
                            style={{ color: "var(--Cinzento)", opacity: "0.8" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          className="input"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          value={password}
                          onChange={(value) => setPassword(value.target.value)}
                        />
                      </InputGroup>
                      <Button size="lg" className="submit-button" type="submit">
                        Entrar
                      </Button>
                      {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}
                          </div>
                        </div>
                      )}
                    </Form>
                  </Col>
                  <Col md={1}></Col>
                </Row>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
