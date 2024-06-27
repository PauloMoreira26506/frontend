import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProdutoLoja from "../components/ProdutoLoja/ProdutoLoja";
import MoreButton from "../components/Buttons/MoreButton";
import TabsExample from "../components/Categorias";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import fetchData from "../fetchData";

const StoreMain = () => {
  const [produtosPopulares, setProdutosPopulares] = useState([]);

  const url = "https://backend-owlr.onrender.com/produtos/populares";
  useEffect(() => {
    fetchData(url, setProdutosPopulares);
  }, []);

  return (
    <div style={{backgroundColor:'var(--AzulClaro)'}}>
      <Navbar/>
      <Container>
        <Col
          className="text-start mt-5 mb-3 tituloLoja"
          sm={{ span: 6, offset: 1 }}
        >
          <h1 className="produtos">Os mais populares na CodeStore</h1>
        </Col>
        <Row>
          <Col md={{ span: "6", offset: "1" }}>
            {produtosPopulares.slice(0, 1).map((produto, index) => (
              <ProdutoLoja
                key={index}
                id={produto.id}
                imagem={produto.imagem}
                nome={produto.nome}
              />
            ))}
          </Col>
          <Col md={3} className="d-flex flex-column justify-content-between gap-4">
            {produtosPopulares.slice(1, 3).map((produto, index) => (
              <ProdutoLoja
                key={index}
                id={produto.id}
                imagem={produto.imagem}
                nome={produto.nome}
              />
            ))}
          </Col>
          <Col md={1}>
            <MoreButton to="/store/populares"/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Col
          className="text-start mt-5 mb-3 tituloLoja"
          sm={{ span: 6, offset: 1 }}
        >
          <h1>Procura por categoria</h1>
        </Col>
        <Row>
          <Col md={{ offset: 1 }}>
            <TabsExample />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default StoreMain;
