import React, { useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import ProdutoLoja from "../components/ProdutoLoja/ProdutoLoja";
import fetchData from "../fetchData";
import Navbar from "../components/Navbar/Navbar";
import { useParams, useLocation } from "react-router-dom";

const Listar = ({id}) => {
  //"start": "react-scripts --openssl-legacy-provider start"

  const {categoriaId} = useParams();
  const location = useLocation();
  const [dataProdutos, setDataProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    setSearchTerm(search);

    let url = "https://backend-owlr.onrender.com/produtos";

    if(categoriaId){
      url = `https://backend-owlr.onrender.com/produtos/categoria/${categoriaId}`;
    } else if (search !== "") {
      url = `https://backend-owlr.onrender.com/produtos?q=${encodeURIComponent(search)}`;
    } else {
      url = "https://backend-owlr.onrender.com/produtos/populares";
    }
    fetchData(url, data => {
      setDataProdutos(data);
      if(categoriaId){
        fetchData(`https://backend-owlr.onrender.com/categorias/${categoriaId}`, setCategoriaSelecionada);
      }
    });
  }, [categoriaId, location.search]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
    <div>
      <Navbar onSearch={handleSearch}/>
      <Container className="mt-5">
        <Row>
          <Breadcrumb>
            <Breadcrumb.Item href="/store">Loja</Breadcrumb.Item>
            <Breadcrumb.Item active>{searchTerm ? <>Resultados para <strong>{searchTerm}</strong></> : categoriaSelecionada ? categoriaSelecionada.designacao : "Populares"}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row xs={1} md={4} className="g-4">
          {dataProdutos.map((data, index) => (
            <Col key={index}>
              {" "}
              <ProdutoLoja nome={data.nome} imagem={data.imagem} id={data.id}/>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Listar;
