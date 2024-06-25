import React, { Component } from "react";
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

const { Item, Searchbar } = Sidebar;

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <Content
        title="Produtos"
        subTitle="Faça a gestão dos produtos da loja"
        browserTitle="Produtos"
      >
        <Row>
          <Col xs={6}>
            <Box
              title="Adicionar produto"
              type="primary"
              closable
              collapsable
              footer={<Button type="primary" text="Adicionar" />}
            ></Box>
          </Col>
          <Col xs={6}>
            <Box title="Another box">Content goes here</Box>
          </Col>
        </Row>
      </Content>
    );
  }
}

const baseURL = `${window.location.protocol}//${window.location.host}`;
const logo = `${baseURL}/Logo_Branco.png`;

class Admin extends Component {
  sidebar = [
    <>
      <div>sd</div>
      <Searchbar />
      <Item key="dashboard" text="Dashboard" to="/admin/dashboard" />
      <Item key="produtos" text="Produtos" to="/admin/produtos" />
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
      </AdminLTE>
    );
  }
}

export default Admin;
