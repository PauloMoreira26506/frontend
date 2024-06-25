import React, { useState, useEffect } from "react";
import { Content, Row, Col, Box, Button, SmartTable } from "adminlte-2-react";
import fetchData from "../../fetchData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [classificacao, setClassificacao] = useState(0);

  const columns = [
    { title: "Nome", data: "nome" },
    { title: "Desenvolvedor", data: "emp" },
    { title: "Tamanho", data: "tamanho" },
    {
      title: "Editar",
      render: function (data, rowData, rowIndex) {
        return (
          <Button
            className="btn-primary"
            onClick={() => handleEditar(rowData.id)}
            text={"Editar"}
          />
        );
      },
    },
  ];

  const urlProdutos = "http://localhost:3001/produtos";
  const urlCategorias = "http://localhost:3001/categorias";

  useEffect(() => {
    fetchData(urlProdutos, setProdutos);
    fetchData(urlCategorias, setCategorias);
  }, []);

  const navigate = useNavigate();
  const handleEditar = (id) => {
    navigate(`/admin/editarproduto/${id}`);
    window.location.reload();
  };

  const handleSubmitProduto = async (event) => {
    event.preventDefault();
    const dataPublicacao = document.getElementById("dataPublicacao").value;
    const formattedDate = new Date(dataPublicacao).toISOString();
    const formData = {
      nome: document.getElementById("nome").value,
      emp: document.getElementById("desenvolvedor").value,
      imagem: document.getElementById("imagem").value,
      capa: document.getElementById("capa").value,
      tamanho: document.getElementById("tamanho").value,
      versao: document.getElementById("versao").value,
      publicacao: formattedDate,
      descricao: document.getElementById("descricao").value,
      preco: document.getElementById("preco").value,
      popular: document.getElementById("popular").checked,
      categoriaid: parseInt(categoriaSelecionada),
      classificacao: classificacao,
      prints: document.getElementById("prints").value,
    };

    console.log("Dados enviados: ", formData);

    try {
      const response = await axios.post(
        "http://localhost:3001/produtos/create",
        formData
      );
      console.log("Resposta do servidor: ", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados para o servidor: ", error);
    } finally {
    }
  };

  // Função para enviar os dados da categoria para o backend
  const handleSubmitCategoria = async (e) => {
    e.preventDefault();
    alert("Submit");
    try {
      const formData = {
        designacao: document.getElementById("categoriaCriar").value,
      };

      const response = await axios.post(
        "http://localhost:3001/categorias/create",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar o formulário: ", error);
    }
  };

  const handleChangeClassificacao = (event) => {
    setClassificacao(event.target.value);
  };
  return (
    <>
      <Content
        title="Produtos"
        subTitle="Faça a gestão dos produtos da loja"
        browserTitle="Produtos"
      >
        <Row>
          <Col xs={6}>
            <Box title="Adicionar produto" type="primary" closable collapsable>
              <form id="formulario" onSubmit={handleSubmitProduto}>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categoria">Categoria</label>

                  <select
                    className="form-control"
                    id="categoria"
                    name="categoria"
                    required
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  >
                    {" "}
                    <option value="" disabled selected>
                      Selecione uma categoria
                    </option>
                    {categorias.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.designacao}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="desenvolvedor">Desenvolvedor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="desenvolvedor"
                    name="desenvolvedor"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imagem">Imagem</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagem"
                    name="imagem"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imagem">Capa</label>
                  <input
                    type="text"
                    className="form-control"
                    id="capa"
                    name="capa"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tamanho">Tamanho</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tamanho"
                    name="tamanho"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="versao">Versão</label>
                  <input
                    type="text"
                    className="form-control"
                    id="versao"
                    name="versao"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Data de Publicação</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dataPublicacao"
                    name="dataPublicacao "
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Descrição</label>
                  <textarea name="descricao" id="descricao"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Prints</label>
                  <textarea name="prints" id="prints"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Preço</label>
                  <input type="number" id="preco" />
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Classificação</label>
                  <input
                    type="range"
                    id="classificacao"
                    step={0.5}
                    max={5}
                    min={0}
                    value={classificacao}
                    onChange={handleChangeClassificacao}
                  />
                  <span>{classificacao}</span>
                </div>
                <div className="form-group">
                  <label className="form-check-label" htmlFor="popular">
                    Popular
                  </label>
                  <input type="checkbox" value="" id="popular" />
                </div>
                <button type="submit">Adicionar</button>
              </form>
            </Box>
            <Box
              title="Adicionar categoria"
              type="primary"
              closable
              collapsable
            >
              <form id="formularioCategoria" onSubmit={handleSubmitCategoria}>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoriaCriar"
                    name="categoria"
                    required
                  />
                </div>
                <button type="submit">Adicionar</button>
              </form>
            </Box>
          </Col>
          <Col xs={6}>
            <Box title="Todos os produtos">
              <SmartTable
                data={produtos}
                columns={columns}
                condensed
                responsive
                striped
                hover
                pageSize={10}
                // onRowSelect={handleClick}
              />
            </Box>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Produtos;
