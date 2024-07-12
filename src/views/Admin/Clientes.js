import React, { useEffect, useState } from "react";
import fetchData from "../../fetchData";
import { Content, Row, Col, Box, SmartTable, Button } from "adminlte-2-react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const url = "https://backend-owlr.onrender.com/utilizadores/clientes";
  const navigate = useNavigate();

  const columns = [
    { title: "Nome", data: "nome" },
    { title: "Email", data: "email" },
    {
      title: "Comprador/Gerente",
      render: function (data, rowData, rowIndex) {
        return (
          <Form>
            <Form.Check
              inline
              label="Comprador"
              name="cargo"
              type="radio"
              checked={rowData.tipoutilizadorid === 2}
              onClick={handleCargo(rowData.id, rowData.tipoutilizadorid)}
            ></Form.Check>
            <Form.Check
              inline
              label="Gerente"
              name="cargo"
              type="radio"
              checked={rowData.tipoutilizadorid === 3}
              onClick={handleCargo(rowData.id, rowData.tipoutilizadorid)}
            ></Form.Check>
          </Form>
        );
      },
    },
    {
      title: "Ativar/Desativar",
      render: function (data, rowData, rowIndex) {
        return (
          <Form>
            <Form.Check
              inline
              label="Ativo"
              name="estado"
              type="radio"
              checked={rowData.ativo}
              onClick={handleAtivar(rowData.id, rowData.ativo)}
            ></Form.Check>
            <Form.Check
              inline
              label="Inativo"
              name="estado"
              type="radio"
              checked={!rowData.ativo}
              onClick={handleAtivar(rowData.id, rowData.ativo)}
            ></Form.Check>
          </Form>
        );
      },
    },
    {
      title: "Ações",
      render: function (data, rowData, rowIndex) {
        return (
          <Button
            className="btn-primary"
            onClick={() => handleClick(rowData.id)}
            text={"Mais"}
          />
        );
      },
    },
  ];

  useEffect(() => {
    fetchData(url, setClientes);
  }, []);

  const handleCargo = (id, tipoutilizadorid) => async (e) => {
    e.preventDefault();
    if (tipoutilizadorid === 2) {
      tipoutilizadorid = 3;
    } else if (tipoutilizadorid === 3) {
      tipoutilizadorid = 2;
    }
    try {
      const response = await axios.post(
        `https://backend-owlr.onrender.com/utilizadores/update/${id}`,
        { tipoutilizadorid: tipoutilizadorid }
      );
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Erro ao atualizar cargo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAtivar = (id, ativo) => async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://backend-owlr.onrender.com/utilizadores/update/${id}`,
        { ativo: !ativo }
      );
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Erro ao atualizar cargo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (id) => {
    navigate(`/admin/cliente/${id}`);
    window.location.reload();
  };
  return (
    <>
      <Content>
        <Row>
          <Col>
            <Box>
              <SmartTable data={clientes} columns={columns} />
            </Box>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Clientes;
