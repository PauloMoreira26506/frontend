import React, { useState, useEffect, useContext } from "react";
import estilo from "./ProdutoBiblioteca.module.css";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import fetchData from "../../fetchData";
import { UserContext } from "../../App";
import axios from "axios";


const ProdutoGerente = ({ imagem, nome, versao, chave, compra, produto }) => {
  const [chavesDisponiveis, setChavesDisponiveis] = useState([]);
  const [chavesInstaladas, setChavesInstaladas] = useState([]);
  const [show, setShow] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const { utilizadorAtual } = useContext(UserContext);
  const urlDisponiveis = `https://backend-owlr.onrender.com/chaves/listarcompra/${compra}`;
  const urlInstaladas = `https://backend-owlr.onrender.com/chaves/listarinstaladas/${compra};`;

  useState(() => {
    fetchData(urlDisponiveis, setChavesDisponiveis);
    fetchData(urlInstaladas, setChavesInstaladas);
    console.log("Chaves instaladas", chavesInstaladas.length);
  }, [urlDisponiveis, urlInstaladas]);

  const handleClick = () => {
    const url = `https://backend-owlr.onrender.com/chaves/instalar/${chave}`;

    try {
      axios.post(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTicket = (e) => {
    e.preventDefault();
    console.log(produto);
    console.log(compra);
    try {
      axios
        .post("https://backend-owlr.onrender.com/tickets/create", {
          utilizadorid: utilizadorAtual.id,
          produtoid: produto,
          mensagem: mensagem,
          compra: compra,
        })
        .then((response) => {
          console.log("Dados enviados com sucesso: ", response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={estilo.card}>
        <Container className="position-absolute text-start p-2">
          <Row className={estilo.botoes}>
            <Col>
              <Button onClick={handleShow}>Ticket</Button>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Mensagem</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e) => setMensagem(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleTicket}>Enviar</Button>
          </Modal.Footer>
        </Modal>
        <Container className="position-absolute bottom-0 z-1">
          <Row className={estilo.botoes}>
            <Row className="mb-2">
              <Col>
                <p>Disponíveis</p>
                <Badge>{chavesDisponiveis.length}</Badge>
              </Col>
              <Col>
                <p>Instaladas</p>
                <Badge>{chavesInstaladas.length}</Badge>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Button className="w-100 m-1" onClick={() => handleClick()}>
                  Instalar
                </Button>
              </Col>
            </Row>
          </Row>
          <p className={`${estilo.nome} mt-1`}>
            {nome}
            <span className={`${estilo.badge} m-2`}>
              <Badge>{versao}</Badge>
            </span>
          </p>
        </Container>

        <img className={estilo.imagem} src={imagem} alt="Imagem do produto" />
      </div>
    </>
  );
};

export default ProdutoGerente;
