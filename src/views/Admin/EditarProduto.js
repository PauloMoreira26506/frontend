import React, { useState, useEffect } from "react";
import { Content, Row, Col, Box } from "adminlte-2-react";
import fetchData from "../../fetchData";
import axios from "axios";

const EditarProduto = () => {
  const [produto, setProduto] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [classificacao, setClassificacao] = useState(0);
  const [nome, setNome] = useState("");
  const [desenvolvedor, setDesenvolvedor] = useState("");
  const [imagem, setImagem] = useState("");
  const [capa, setCapa] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [popular, setPopular] = useState(false);
  const [prints, setPrints] = useState("");
  const [versoes, setVersoes] = useState("");
  const [versao, setVersao] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    const urlProduto = `https://backend-owlr.onrender.com/produtos/${id}`;
    const urlCategorias = "https://backend-owlr.onrender.com/categorias";
    const urlVersoes = `https://backend-owlr.onrender.com/produtos/versoes/${id}`;
    fetchData(urlProduto, setProduto);
    fetchData(urlCategorias, setCategorias);
    fetchData(urlVersoes, setVersoes);
  }, []);

  useEffect(() => {
    if (produto && produto.id) {
      const url = `https://backend-owlr.onrender.com/categorias/${produto.categoriaid}`;
      console.log(`Categoria: ${produto.categoriaid}`);
      fetchData(url, setCategoriaSelecionada);
      setClassificacao(produto.classificacao);
      setNome(produto.nome);
      setDesenvolvedor(produto.emp);
      setImagem(produto.imagem);
      setCapa(produto.capa);
      setTamanho(produto.tamanho);
      setDataPublicacao(produto.publicacao);
      setDescricao(produto.descricao);
      setPreco(produto.preco);
      setPopular(produto.popular);
      setPrints(produto.prints);
    }
  }, [produto]);

  function sendUpdate(e) {
    e.preventDefault();
    const path = window.location.pathname;
    const id = path.split("/").pop();
    console.log("id: ", id);

    const url = `https://backend-owlr.onrender.com/produtos/update/${id}`;
    const data = {
      nome: nome,
      emp: desenvolvedor,
      tamanho: tamanho,
      publicacao: dataPublicacao,
      preco: preco,
      classificacao: classificacao,
      imagem: imagem,
      capa: capa,
      popular: popular,
      descricao: descricao,
      categoriaid: categoriaSelecionada,
      prints: prints,
    };

    console.log(data);

    axios
      .post(url, data)
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }

  const handleChangeClassificacao = (event) => {
    setClassificacao(event.target.value);
  };

  function sendDelete() {
    const path = window.location.pathname;
    const id = path.split("/").pop();

    const url = "https://backend-owlr.onrender.com/produtos/delete";
    axios
      .post(url, { id: id })
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert("Erro");
        }
      })
      .catch((error) => {
        alert("Error 325");
      });
  }

  function handleSubmitVersao(e) {
    e.preventDefault();
    const path = window.location.pathname;
    const id = path.split("/").pop();
    const url = `https://backend-owlr.onrender.com/produtos/criarversao/${id}`;
    axios
      .post(url, {
        versao: versao, produtoid: id
      })
      .then((response) => {
        if (response.data.success === true) {
          alert(response.data.message);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        alert("Error 34 " + error);
      });
  }

  return (
    <>
      <Content
        title="Produtos"
        subTitle="Faça a gestão dos produtos da loja"
        browserTitle="Produtos"
      >
        <Row>
          <Col xs={12}>
            <Box title="Adicionar produto" type="primary" closable collapsable>
              <form id="formulario" onSubmit={sendUpdate}>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    required
                    value={nome}
                    onChange={(value) => setNome(value.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categoria">Categoria</label>

                  <select
                    className="form-control"
                    id="categoria"
                    name="categoria"
                    required
                    value={categoriaSelecionada.id}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  >
                    {" "}
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
                    value={desenvolvedor}
                    onChange={(value) => setDesenvolvedor(value.target.value)}
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
                    value={imagem}
                    onChange={(value) => setImagem(value.target.value)}
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
                    value={capa}
                    onChange={(value) => setCapa(value.target.value)}
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
                    value={tamanho}
                    onChange={(value) => setTamanho(value.target.value)}
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
                    value={dataPublicacao}
                    onChange={(value) => setDataPublicacao(value.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Descrição</label>
                  <textarea
                    name="descricao"
                    id="descricao"
                    value={descricao}
                    onChange={(value) => setDescricao(value.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Prints</label>
                  <textarea
                    name="prints"
                    id="prints"
                    value={prints}
                    onChange={(value) => setPrints(value.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="dataPublicacao">Preço</label>
                  <input
                    type="number"
                    id="preco"
                    value={preco}
                    onChange={(value) => setPreco(value.target.value)}
                  />
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
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(value) => setPopular(value.target.checked)}
                    id="popular"
                  />
                </div>
                <button type="submit">Editar</button>
                <button
                  onClick={() => {
                    sendDelete();
                  }}
                >
                  Apagar
                </button>
              </form>
            </Box>
          </Col>
        </Row>
        <Row>
          <Box title="Adicionar versão" type="primary" closable collapsable>
            <form id="versao" onSubmit={handleSubmitVersao}>
              <div className="form-group">
                <label htmlFor="versao">Versão</label>
                <input id="versao" onChange={(e) => setVersao(e.target.value)}></input>
              </div>
              <button type="submit">Adicionar</button>
            </form>
          </Box>
        </Row>
      </Content>
    </>
  );
};

export default EditarProduto;
