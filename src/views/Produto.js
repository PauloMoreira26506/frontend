import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Form,
  FormGroup,
  Dropdown,
  FloatingLabel,
  Select,
} from "react-bootstrap";
import estilosProduto from "./Produto.module.css";
import Slider from "../components/Slider/Slider";
import Footer from "../components/Footer";
import fetchData from "../fetchData";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../App";
import axios from "axios";
import Pacote from "../components/Pacote/Pacote";
import Extensao from "../components/Extensões/extensao";

export const Produto = () => {
  const { produtoId } = useParams();
  const [produto, setProduto] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [extensoes, setExtensoes] = useState([]);
  const [versoes, setVersoes] = useState([]);
  const { utilizadorAtual } = useContext(UserContext);
  const [versao, setVersao] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empresa: "",
    licencas: "",
    setor: "",
    pacoteid: "",
    extensaoid: "",
    mensagem: "",
    utilizadorid: utilizadorAtual.id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrcamento = (e) => {
    e.preventDefault();
    axios
      .post("https://backend-owlr.onrender.com/orcamento/create", formData)
      .then((response) => {
        console.log("Dados enviados com sucesso: ", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados: ", error);
      });
  };

  const url = `https://backend-owlr.onrender.com/produtos/${produtoId}`;
  const urlPacotes = `https://backend-owlr.onrender.com/produtos/pacotes/${produtoId}`;
  const urlExtensoes = `https://backend-owlr.onrender.com/produtos/extensoes/${produtoId}`;
  const urlVersoes = `https://backend-owlr.onrender.com/produtos/versoes/${produtoId}`;

  useEffect(() => {
    fetchData(url, setProduto);
    fetchData(urlPacotes, setPacotes);
    fetchData(urlExtensoes, setExtensoes);
    fetchData(urlVersoes, setVersoes);
  }, [url]);

  if (extensoes) {
    console.log(extensoes);
  }

  const converterData = (data) => {
    const date = new Date(data);
    return date.toISOString().split("T")[0];
  };

  const handleObter = async () => {
    try {
      const response = await axios.post(
        "https://backend-owlr.onrender.com/chaves/associar",
        { utilizador: utilizadorAtual.id, produto: produtoId, versao: versao }
      );
      navigate("/comprarealizada");
    } catch (error) {
      if (error.response) {
        const resposta = error.response.data.message;
        alert(resposta);
      }

      console.error("Erro ao associar a chave ao utilizador: ", error);
    }
  };

  const calcularEstrelas = (classificacao) => {
    const totalEstrelas = 5;
    const estrelasCompletas = Math.floor(classificacao);
    const estrelasMetade = classificacao % 1 >= 0.5 ? 1 : 0;
    const estrelasVazias = totalEstrelas - estrelasCompletas - estrelasMetade;

    const estrelas = [];
    for (let i = 0; i < estrelasCompletas; i++) {
      estrelas.push(<i key={`estrela-${i}`} className="bi bi-star-fill"></i>);
    }
    if (estrelasMetade === 1) {
      estrelas.push(<i key="estrelametade" className="bi bi-star-half"></i>);
    }
    for (let i = 0; i < estrelasVazias; i++) {
      estrelas.push(<i key={`estrelavazia-${i}`} classNamme="bi bi-star"></i>);
    }

    return estrelas;
  };

  const obterPrints = (texto) => {
    const prints = texto.split("|");
    console.log("Prints: ", prints);
    return prints;
  };

  const handleChangeVersao = (e) => {
    setVersao(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="mt-5">
          <Breadcrumb>
            <Breadcrumb.Item href="/store">Loja</Breadcrumb.Item>
            <Breadcrumb.Item active>{produto.nome}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Col className="no-gutters">
            <div className={estilosProduto.capaProduto}>
              {" "}
              <img src={produto.capa} alt="" />
              <div className={estilosProduto.gradiente}></div>
            </div>
          </Col>
        </Row>
        <Row style={{ position: "relative", top: "-40px", zIndex: "1" }}>
          <Col md={9}>
            <Col
              style={{
                backgroundColor: "var(--CinzentoClaro)",
                borderRadius: "20px",
                height: "100%",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              {" "}
              <Col className="d-flex bg-dark}" style={{ marginLeft: "10px" }}>
                {" "}
                <h2 className={estilosProduto.nomeProduto}>{produto.nome}</h2>
              </Col>
              <Col
                md={2}
                className="d-flex justify-content-center align-items-center"
              >
                {" "}
                {produto.categoriaproduto &&
                  produto.categoriaproduto.designacao && (
                    <p className={estilosProduto.categoriaProduto}>
                      {produto.categoriaproduto.designacao}
                    </p>
                  )}
              </Col>
            </Col>
          </Col>
          <Col>
            <Button
              size="lg"
              style={{ width: "100%" }}
              className="shadow-lg rounded-4"
              onClick={handleObter}
            >
              Obter
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Row className="mb-5">
              <p className={`${estilosProduto.descricao} text-start`}>
                {produto.descricao}
              </p>
            </Row>
            <Row>
              <Col className="flex-column">
                <p style={{ fontSize: "20px", fontWeight: "600" }}>
                  Classificação
                </p>
                <p style={{ fontSize: "40px", fontWeight: "600" }}>
                  {produto.classificacao}
                </p>
                <div className="estrelas">
                  {}
                  {calcularEstrelas(produto.classificacao)}
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={{ offset: 1 }} className="text-start p-5">
            <Row>
              {" "}
              <Col md={1}>
                <i className="bi bi-file-arrow-up"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Desenvolvedor
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--AzulEscuro)",
                    }}
                  >
                    {produto.emp}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="mt-2">
              {" "}
              <Col md={1}>
                <i className="bi bi-calendar"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Data de publicação
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--AzulEscuro)",
                    }}
                  >
                    {produto.publicacao
                      ? converterData(produto.publicacao)
                      : ""}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row className="mt-2">
              {" "}
              <Col md={1}>
                <i className="bi bi-file-earmark-text"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Versão
                  </p>
                  <Form.Select onChange={handleChangeVersao}>
                    <option>Escolhe a versão</option>
                    {versoes.map((versao, index) => (
                      <option key={index} value={versao.id}>{versao.versao}</option>
                    ))}
                  </Form.Select>
                </Row>
              </Col>
            </Row>
            <Row className="mt-2">
              {" "}
              <Col md={1}>
                <i className="bi bi-box-seam"></i>
              </Col>
              <Col>
                <Row className="text-start">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "var(--Preto)",
                    }}
                    className="mb-0"
                  >
                    Tamanho
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "var(--AzulEscuro)",
                    }}
                  >
                    {produto.tamanho} MB
                  </p>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <Col md={9} className="mt-5">
            {produto.prints ? (
              <Slider prints={obterPrints(produto.prints)} />
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <div className={estilosProduto.titulos}>
            {" "}
            <h1 className={estilosProduto.titulo}>Pacotes</h1>
            <div className={estilosProduto.gradienteTitulo}> </div>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "300",
                position: "relative",
                top: "-100px",
                color: "var(--Preto)",
              }}
            >
              Obtenha desconto no produto por comprar em conjunto
            </p>
          </div>
          {pacotes.length > 0 ? (
            <Row>
              {pacotes.map((pacote, index) => (
                <Pacote key={index} pacote={pacote.pacote} />
              ))}
            </Row>
          ) : (
            <p>
              <strong>Nenhum pacote disponível</strong>
            </p>
          )}
        </Row>
        <Row className="mt-5">
          <div className={estilosProduto.titulos}>
            {" "}
            <h1 className={estilosProduto.titulo}>Extensões</h1>
            <div className={estilosProduto.gradienteTitulo}> </div>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "300",
                position: "relative",
                top: "-100px",
                color: "var(--Preto)",
              }}
            >
              Descubra mais funcionalidades com estas versões
            </p>
          </div>
          {extensoes.length > 0 ? (
            <Row>
              {extensoes.map((extensao, index) => (
                <Extensao key={index} extensao={extensao} />
              ))}
            </Row>
          ) : (
            <p>
              <strong>Não existem extensões</strong>
            </p>
          )}
        </Row>
        <Row>
          <Row className="text-start mt-5 mb-2">
            <h3
              style={{
                fontSize: "48px",
                fontWeight: "600",
                color: "var(--Preto)",
              }}
            >
              Pedir orçamento
            </h3>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "300",
                color: "var(--Preto)",
              }}
            >
              Solicite um orçamento personalizado para adquirir vários softwares
            </p>
          </Row>
          <Form onSubmit={handleSubmitOrcamento}>
            <Row className="text-start mb-4">
              <Col md={4}>
                <FormGroup>
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    type="text"
                    name="empresa"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                {" "}
                <FormGroup>
                  <Form.Label>Licenças</Form.Label>
                  <Form.Control
                    type="text"
                    name="licencas"
                    placeholder="Número de licenças"
                    value={formData.licencas}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                {" "}
                <FormGroup>
                  <Form.Label>Setor</Form.Label>
                  <Form.Control
                    type="text"
                    name="setor"
                    placeholder="Qual a área da empresa"
                    value={formData.setor}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="text-start mb-4">
              <Col md={4}>
                <FormGroup>
                  {pacotes.length > 0 ? (
                    <>
                      {" "}
                      <Form.Label>Pacote</Form.Label>
                      <Form.Select
                        aria-label="Pacote"
                        name="pacoteid"
                        defaultValue=""
                        value={formData.pacote}
                        onChange={handleChange}
                      >
                        <option value="">Selecione um pacote</option>
                        {pacotes.map((pacote, index) => (
                          <option value={pacote.pacoteid} key={index}>
                            {pacote.pacote.designacao}
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {extensoes.length > 0 ? (
                    <>
                      {" "}
                      <Form.Label>Extensão</Form.Label>
                      <Form.Select
                        aria-label="Extensão"
                        name="extensaoid"
                        defaultChecked=""
                        value={formData.extensao}
                        onChange={handleChange}
                      >
                        <option value="">Selecione uma extensão</option>
                        {extensoes.map((extensao, index) => (
                          <option value={extensao.id} key={index}>
                            {extensao.designacao}
                          </option>
                        ))}
                      </Form.Select>
                    </>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Mensagem"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    name="mensagem"
                    placeholder="Escreva uma mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="text-end">
              <Col>
                <Button
                  type="submit"
                  style={{ width: "100%" }}
                  className="mt-2"
                >
                  Solicitar
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
