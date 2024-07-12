import React, { Component, useEffect, useState } from "react";
import AdminLTE, {
  Sidebar,
  Content,
  Row,
  Col,
  Box,
  Button,
} from "adminlte-2-react";
import Produtos from "./Produtos";
import EditarProduto from "./EditarProduto";
import Orcamentos from "./Orcamentos";
import Orcamento from "./Orcamento";
import Vendas from "./Vendas";
import Clientes from "./Clientes";
import fetchData from "../../fetchData";
import Ticket from "./Tickets";
import Cliente from "./Cliente";
import Privilegios from "./Privilegios";
import Pacotes from "./Pacotes";
import Pacote from "./Pacote";
const { Item, Searchbar } = Sidebar;

const Dashboard = () => {
  const [chaves, setChaves] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [pacotesproduto, setPacotesproduto] = useState([]);
  const [extensoes, setExtensoes] = useState([]);
  const urlChaves = "https://backend-owlr.onrender.com/chaves/listar";
  const urlProdutos = "https://backend-owlr.onrender.com/produtos";
  const urlPacotes = "https://backend-owlr.onrender.com/produtos/pacotes";
  const urlPacotesProduto = "https://backend-owlr.onrender.com/produtos/pacotesproduto";
  const urlExtensoes = "https://backend-owlr.onrender.com/produtos/extensoes";


  useEffect(() => {
    fetchData(urlChaves, setChaves);
    fetchData(urlProdutos, setProdutos);
    fetchData(urlPacotes, setPacotes);
    fetchData(urlPacotesProduto, setPacotesproduto);
    fetchData(urlExtensoes, setExtensoes);
  }, []);

  let instaladas = 0;
  chaves.forEach((element) => {
    if (element.instalada === true) {
      instaladas++;
    }
  });

  let ativas = 0;
  chaves.forEach((element) => {
    if (element.ativa === true) {
      ativas++;
    }
  });

  let porcentagemInstaladasTotal = Math.round(
    (instaladas / chaves.length) * 100
  );
  let porcentagemInstaladasAtivas = Math.round((instaladas / ativas) * 100);

  const uniqueProductsPacotes = new Set(pacotesproduto.map(produto => produto.produtoid));

  const uniqueProductsExtensoes = new Set(extensoes.map(produto => produto.produtoid));

  return (
    <Content
      title="Dashboard"
      subTitle="Faça a gestão dos produtos da loja"
      browserTitle="Produtos"
    >
      <Row>
        <Col xs={6}>
          <Box title="Produtos">
            <p>Total: {produtos.length}</p>
            <p>Pacotes: {pacotes.length}</p>
            <p>Produtos com pacote: {uniqueProductsPacotes.size}</p>
            <p>Produtos com extensões: {uniqueProductsExtensoes.size}</p>
          </Box>
        </Col>
        <Col xs={6}>
          <Box title="Chaves">
            {" "}
            <p>Total: {chaves.length}</p>
            <p>Ativas: {ativas}</p>
            <p>Instaladas: {porcentagemInstaladasTotal}%</p>
            <p>
              Das {ativas} chaves ativas, {porcentagemInstaladasAtivas}% estão
              instaladas{" "}
            </p>
          </Box>
        </Col>
      </Row>
    </Content>
  );
};

const baseURL = `${window.location.protocol}//${window.location.host}`;
const logo = `${baseURL}/Logo_Branco.png`;

class Admin extends Component {
  sidebar = [
    <>
      <div>sd</div>
      <Searchbar />
      <Item key="dashboard" text="Dashboard" to="/admin/dashboard" />
      <Item key="produtos" text="Produtos" to="/admin/produtos" />
      <Item key="orcamentos" text="Orçamentos" to="/admin/orcamentos" />
      <Item key="vendas" text="Vendas" to="/admin/vendas" />
      <Item key="clientes" text="Clientes" to="/admin/clientes" />
      <Item key="tickets" text="Tickets" to="/admin/tickets" />
      <Item key="privilegios" text="Privilégios" to="/admin/privilegios" />
      <Item key="pacotes" text="Pacotes" to="/admin/pacotes" />
    </>,
  ];

  render() {
    return (
      <AdminLTE
        title={<img src={logo} alt="Full Logo" style={{ height: "24px" }} />}
        titleShort={
          <img src={logo} alt="Short Logo" style={{ height: "24px" }} />
        }
        theme="blue"
        sidebar={this.sidebar}
      >
        <Dashboard path="/admin/dashboard" />
        <Produtos path="/admin/produtos" />
        <EditarProduto path="/admin/editarproduto/:id" />
        <Orcamentos path="/admin/orcamentos" />
        <Orcamento path="/admin/orcamento/:id" />
        <Vendas path="/admin/vendas" />
        <Clientes path="/admin/clientes" />
        <Ticket path="/admin/tickets" />
        <Cliente path="/admin/cliente/:id" />
        <Privilegios path="/admin/privilegios" />
        <Pacotes path="/admin/pacotes" />
        <Pacote path="/admin/pacote/:id" />
      </AdminLTE>
    );
  }
}

export default Admin;
