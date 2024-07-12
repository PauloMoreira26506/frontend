import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  InputGroup,
  Form,
  Badge,
} from "react-bootstrap";
import fetchData from "../fetchData";
import { useParams } from "react-router-dom";
import estilos from "./Gerir.module.css";
import axios from "axios";
import { UserContext } from "../App";

const Gerir = () => {
  const { utilizadorAtual } = useContext(UserContext);
  const [chaves, setChaves] = useState([]);
  const primeiraChave = chaves.length > 0 ? chaves[0] : null;
  const [email, setEmail] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [associacoes, setAssociacoes] = useState([]);
  const emailChavesCount = {};

  const { id } = useParams();
  const urlCompra = `https://backend-owlr.onrender.com/chaves/listarcompra/${id}`;
  const urlAssociacao = `https://backend-owlr.onrender.com/chaves/associacoescomprador/${utilizadorAtual.id}`;

  useEffect(() => {
    fetchData(urlCompra, setChaves);
    fetchData(urlAssociacao, setAssociacoes);
  }, [urlCompra, urlAssociacao]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-owlr.onrender.com/chaves/associargerente",
        {
          email: email,
          quantidade: quantidade,
          compraid: id,
          utilizadorAtual: utilizadorAtual.id,
        }
      );
      console.log(response);
    } catch (error) {
      if (error.response) {
        const resposta = error.response.data.message;
        alert(resposta);
      }

      console.error("Erro ao associar chave", error);
    }
  };

  const associacoesFiltradas = associacoes.filter(
    (data) => data.chave.compraid === parseInt(id)
  );

  associacoesFiltradas.forEach((data) => {
    if (data.utilizador && data.utilizador.email) {
      const email = data.utilizador.email;
      if (emailChavesCount[email]) {
        emailChavesCount[email]++;
      } else {
        emailChavesCount[email] = 1;
      }
    }
  });

  const emailCount = Object.entries(emailChavesCount);

  const handleDesativar = (email) => async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("https://backend-owlr.onrender.com/chaves/desativarassociacao", {email: email});
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Erro ao desativar chave");
      }
    } catch (error){
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        {" "}
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/store">Loja</Breadcrumb.Item>
            <Breadcrumb.Item href="/store/biblioteca">
              Biblioteca
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Gerir</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className={`mb-5 ${estilos.info}`}>
          <Col sm={2} className="m-0 p-0">
            {primeiraChave ? (
              <div className={`shadow-lg ${estilos.imagem}`}>
                <img
                  src={primeiraChave.compra.produto.imagem}
                  className={estilos.logo}
                  alt="sd"
                />
              </div>
            ) : (
              ""
            )}
          </Col>
          <Col className="d-flex justify-content-betwen align-items-center">
            <p>
              Chaves disponíveis <Badge>{chaves.length}</Badge>
            </p>
          </Col>
          {/* <Col className="d-flex justify-content-betwen align-items-center">
            <p>
              Chaves utilizadas <Badge>{associacoes.length}</Badge>
            </p>
          </Col>
          <Col className="d-flex justify-content-betwen align-items-center">
            <p>
              Chaves ativas <Badge>{chaves.length}</Badge>
            </p>
          </Col> */}
          <Col className="d-flex justify-content-betwen align-items-center">
            <p>
              Gerentes <Badge>{emailCount.length}</Badge>
            </p>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm={{ offset: 2, span: 8 }}>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-2">
                <InputGroup.Text>Email</InputGroup.Text>
                <Form.Control
                  placeholder="Utilizador"
                  aria-label="Email"
                  onChange={(value) => setEmail(value.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroup.Text>Quantidade</InputGroup.Text>
                <Form.Control
                  placeholder="Quantidade de chaves a atribuir"
                  aria-label="Quantidade"
                  type="number"
                  max={chaves.length}
                  min={1}
                  onChange={(value) => setQuantidade(value.target.value)}
                />
              </InputGroup>
              <Button type="submit">Adicionar gerente</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <p>
            <strong>Gerentes</strong>
          </p>
          {emailCount.map(([email, count], index) => (
            <p key={index}>
              {email} - {count} chave(s)
              <i className="bi bi-x" onClick={handleDesativar(email)}></i>
            </p>
            
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Gerir;
