import React, { useEffect, useState } from 'react';
import fetchData from '../../fetchData';
import {Content, Row, Col, Box, Button, SmartTable} from "adminlte-2-react";
import { useNavigate } from 'react-router-dom';

const Orcamentos = () => {
    const [orcamentos, setOrcamentos] = useState([]);
    const url = "https://backend-owlr.onrender.com/orcamento";


    const columns = [
        {title: "Empresa", data: "empresa"},
        {title: "Licenças", data: "licencas"},
        {title: "Setor", data: "setor"},
        {title: "Data", data: "data"},
        {title: "Email", render: function(data, rowData, rowIndex) {
            return (<p>{rowData.utilizador.email}</p>)
        }},
        {title: "Telemóvel", render: function(data, rowData, rowIndex) {
            return(<p>{rowData.utilizador.telemovel}</p>)
        }},
        {title: "Ações", render: function(data, rowData, rowIndex){
            return (
                <Button
                    className="btn-primary"
                    onClick={() => (handleClick(rowData.id))}
                    text={"Mais"}
                />
            );
        }}
    ];

    useEffect(() => {
        fetchData(url, setOrcamentos);

    }, []);

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/admin/orcamento/${id}`);
        window.location.reload();
    }

  return (
    <>
        <Content>
            <Row>
                <Col>
                    <Box>
                        <SmartTable data={orcamentos} columns={columns}/>   
                    </Box>
                </Col>
            </Row>
        </Content>
    </>
  )
}

export default Orcamentos