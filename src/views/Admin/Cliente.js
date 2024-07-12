import React, { useState, useEffect } from "react";
import fetchData from "../../fetchData";
import { Content, Row, Col, Box, SmartTable } from "adminlte-2-react";
import { Button } from "react-bootstrap";
import axios from "axios";

const Cliente = () => {
  const [privilegiosAtivos, setPrivilegiosAtivos] = useState([]);
  const [privilegios, setPrivilegios] = useState([]);
  const [privilegioSelecionado, setPrivilegioSelecionado] = useState("");
  const path = window.location.pathname;
  const id = path.split("/").pop();
  const urlAtivos = `https://backend-owlr.onrender.com/privilegios/${id}`;
  const urlPrivilegios = `https://backend-owlr.onrender.com/privilegios`;

  useEffect(() => {
    fetchData(urlAtivos, setPrivilegiosAtivos);
    fetchData(urlPrivilegios, setPrivilegios);
  }, []);

  useEffect(() => {
    if (privilegios.length > 0) {
      setPrivilegioSelecionado(privilegios[0].id);
    }
  }, [privilegios]);

  const columns = [
    {
      title: "Privilegio",
      render: function (data, rowData, rowIndex) {
        return <p>{rowData.privilegio.designacao}</p>;
      },
    },
    {
      title: "Revogar",
      render: function (data, rowData, rowIndex) {
        return (
          <Button onClick={() => handleRevogar(rowData.id)}>Revogar</Button>
        );
      },
    },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    const id = path.split("/").pop();
    console.log(id);
    console.log(privilegioSelecionado);
    const url = "https://backend-owlr.onrender.com/privilegios/clienteprivilegio";
    const data = { privilegioid: privilegioSelecionado, utilizadorid: id };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        fetchData(url, setPrivilegios);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRevogar = (id) => {
    axios.post("https://backend-owlr.onrender.com/privilegios/delete", {id: id})
    .then((response)=> {
      if (response.data.success === true) {
        alert("Privilegio revogado com sucesso");
      } else {
        alert("Error");
      }
    }) 
    .catch((error) => {
      alert("Error 34 " + error);
    })
  };

  return (
    <>
      <Content>
        <Row>
          <Col sm={6}>
            <Box>
              <SmartTable data={privilegiosAtivos} columns={columns} />
            </Box>
          </Col>
          <Col sm={6}>
            <Box>
              <form>
                <div>
                  <label forHtml="privilegios">Adicionar privilegios</label>
                  <select
                    id="privilegios"
                    onChange={(e) => setPrivilegioSelecionado(e.target.value)}
                  >
                    {privilegios.map((privilegio) => (
                      <option value={privilegio.id}>
                        {privilegio.designacao}
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

export default Cliente;
