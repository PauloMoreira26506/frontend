import React, { useState, useEffect } from "react";
import { Content, Row, Col, Box, SmartTable } from "adminlte-2-react";
import fetchData from "../../fetchData";
import axios from "axios";

const Pacote = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosPacote, setProdutosPacote] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const path = window.location.pathname;
  const id = path.split("/").pop();
  const urlProdutos = "https://backend-owlr.onrender.com/produtos";
  const urlProdutosPacote = `https://backend-owlr.onrender.com/produtos/produtospacote/${id}`;

  useEffect(() => {
    fetchData(urlProdutos, setProdutos);
    fetchData(urlProdutosPacote, setProdutosPacote);
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      setProdutoSelecionado(produtos[0].id);
    }
  }, [produtos]);

  const columns = [
    {
      title: "Produto",
      render: function(data, rowData, rowIndex){
        return(<p>{rowData.produto.nome}</p>);
      }
    },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    const id = path.split("/").pop();
    console.log(id);
    console.log(produtoSelecionado);
    const url = "https://backend-owlr.onrender.com/produtos/produtopacote";
    const data = { pacoteid: parseInt(id), produtoid: parseInt(produtoSelecionado) };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        fetchData(urlProdutosPacote, setProdutosPacote);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Content>
        <Row>
          <Col sm={6}>
            <Box>
              <SmartTable data={produtosPacote} columns={columns} />
            </Box>
          </Col>
          <Col sm={6}>
            <Box>
              <form>
                <div>
                  <label forHtml="privilegios">Adicionar produto</label>
                  <select
                    id="produto"
                    onChange={(e) => setProdutoSelecionado(e.target.value)}
                  >
                    {produtos.map((produto) => (
                      <option value={produto.id}>
                        {produto.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" onClick={handleClick}>
                  Adicionar
                </button>
              </form>
            </Box>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Pacote;
