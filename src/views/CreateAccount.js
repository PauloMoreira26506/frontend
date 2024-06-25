import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const CreateAccount = () => {
  var [nome, setNome] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var tipoutilizador = 3;


  async function handleCreateAccount(event) {
    event.preventDefault();
    // setMessage("");
    // setLoading(true);

    try{
      const response = await axios.post("http://localhost:3001/utilizadores/register", {nome, email, password, tipoutilizador});
      console.log(response);
    } catch (error) {
      console.error("Erro ao criar uma conta.", error);
    }
  }

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "var(--Branco)" }}
      >
        <Row className="rounded-4 shadow box-area cinzentoClaro">
        {/* Área da esquerda */}
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
          {/* Área da direita */}
          <Col md={6}>
            <Row>
              <div className="px40Azul p-5">
                <p className="mb-5">Criar conta</p>
                <Row>
                  <Col md={1}></Col>
                  <Col>
                    <Form onSubmit={handleCreateAccount}>
                      {/* <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="bi bi-file-person"
                            style={{ color: "var(--Cinzento)", opacity: "0.8" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          className="input"
                          placeholder="NIF da empresa"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup> */}
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="bi bi-file-person"
                            style={{ color: "var(--Cinzento)", opacity: "0.8" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          className="input"
                          placeholder="Nome"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={nome}
                          onChange={(value) => setNome(value.target.value)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="bi bi-file-person"
                            style={{ color: "var(--Cinzento)", opacity: "0.8" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          className="input"
                          placeholder="Email"
                          aria-label="Username"
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
                      {/* <InputGroup className="mb-5 inputs">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="bi bi-file-lock2"
                            style={{ color: "var(--Cinzento)", opacity: "0.8" }}
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          className="input"
                          placeholder="Reescrever password"
                          aria-label="Reescrever password"
                          aria-describedby="basic-addon1"
                        />
                      </InputGroup> */}
                      <Button size="lg" className="submit-button" type="submit">
                        Criar
                      </Button>
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
};

export default CreateAccount;
