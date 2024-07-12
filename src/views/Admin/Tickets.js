import React, { useState, useEffect } from "react";
import fetchData from "../../fetchData";
import { Content, Row, Col, Box, SmartTable } from "adminlte-2-react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const url = "https://backend-owlr.onrender.com/tickets";
  useEffect(() => {
    fetchData(url, setTickets);
  }, []);

  const columns = [
    {title: "Email", render: function(data, rowData, rowIndex){
        return(<p>{rowData.utilizador.email}</p>)
    }},
    {title: "Produto", render: function(data, rowData, rowIndex){
        return(<p>{rowData.produto.nome}</p>)
    }},
    {title: "Data", data: "data"},
    {title: "Mensagem", data: "mensagem"}
  ]
  return (
    <>
      <Content>
        <Row>
          <Col>
            <Box>
              <SmartTable data={tickets} columns={columns} />
            </Box>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Tickets;
