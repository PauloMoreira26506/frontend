import React, {useState, useEffect} from 'react';
import fetchData from '../../fetchData';
import { Content, Row, Col, Box, Button, SmartTable } from "adminlte-2-react";

const Vendas = () => {
    const [vendas, setVendas] = useState([]);
    const url = "https://backend-owlr.onrender.com/chaves/listarativas";

    const columns = [
        { title: "Produto", render: function(data, rowData, rowIndex) {
            return(<p>{rowData.compra.produto.nome}</p>)
        }},
        { title: "Utilizador", render: function(data, rowData, rowIndex) {
            return(<p>{rowData.compra.utilizador.email}</p>)
        }},
        {title: "Data", data: "dataCompra"},
    ]

    useEffect(() => {
        fetchData(url, setVendas);
    }, []);



  return (
    <>
    <Content>
      <Row>
        <Col>
            <Box>
                <SmartTable data={vendas} columns={columns}/>
            </Box>
        </Col>
      </Row>
    </Content>
    </>
  )
}

export default Vendas