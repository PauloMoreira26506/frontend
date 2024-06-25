import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import ProdutoLoja from "./ProdutoLoja/ProdutoLoja";
import MoreButton from "./Buttons/MoreButton";
import fetchData from "../fetchData";

function TabsExample() {
  const [dataProdutos, setDataProdutos] = useState([]);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [activeKey, setActiveKey] = useState("");

  useEffect(() => {
    const urlProdutos = "http://localhost:3001/produtos";
    const urlCategorias = "http://localhost:3001/categorias";
    fetchData(urlProdutos, setDataProdutos);
    fetchData(urlCategorias, setDataCategorias);
  }, []);

  useEffect(() => {
    if (dataCategorias.length > 0) {
      const primeiraCategoria = dataCategorias[0];
      setCategoriaSelecionada(primeiraCategoria);
      setActiveKey(`#${primeiraCategoria.designacao}`);
    }
  }, [dataCategorias]);

  const handleCategoriaSelecionada = (categoria) => {
    setCategoriaSelecionada(categoria);
    setActiveKey(`#${categoria.designacao}`);
  };

  return (
    <Tab.Container id="list-group-tabs-example" activeKey={activeKey}>
      <Row>
        <Col sm={2}>
          <ListGroup>
            {dataCategorias.map((categoria, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleCategoriaSelecionada(categoria)}
                action
                href={`#${categoria.designacao}`}
              >
                {categoria.designacao}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            {dataCategorias.map((categoria, index) => (
              <Tab.Pane key={index} eventKey={`#${categoria.designacao}`}>
                <Container>
                  <Row className="d-flex flex-row mb-4">
                    {dataProdutos
                      .filter(
                        (produto) =>
                          categoriaSelecionada && produto.categoriaproduto.id === categoriaSelecionada.id
                      )
                      .map((produto, index) => (
                        <Col md={6} key={index}>
                          <ProdutoLoja
                            id={produto.id}
                            imagem={produto.imagem}
                            nome={produto.nome}
                          />
                        </Col>
                      ))}
                  </Row>
                  <MoreButton categoria={categoriaSelecionada}/>
                </Container>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default TabsExample;
