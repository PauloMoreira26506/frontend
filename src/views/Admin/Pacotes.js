import React, { useState, useEffect } from "react";
import { Content, Row, Col, Box, Button, SmartTable } from "adminlte-2-react";
import fetchData from "../../fetchData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pacotes = () => {
  const [pacote, setPacote] = useState("");
  const [pacotes, setPacotes] = useState([]);
  const urlPacotes = "https://backend-owlr.onrender.com/produtos/pacotes";
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(urlPacotes, setPacotes);
  }, []);

  const columns = [
    {
      title: "Pacote",
      data: "designacao",
    },
    {
      title: "Editar",
      render: function (data, rowData, rowIndex) {
        return <Button onClick={() => handleClick(rowData.id)} text={"Editar"}/>;
      },
    },
  ];

  function handleSubmitPacote(e) {
    e.preventDefault();
    const url = `https://backend-owlr.onrender.com/produtos/criarpacote`;
    axios
      .post(url, {
        designacao: pacote,
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
  };

  function handleClick(id) {
    navigate(`/admin/pacote/${id}`);
    window.location.reload();
  };


  return (
    <>
      <Content>
        <Row>
          <Col sm={6}>
            <SmartTable data={pacotes} columns={columns} />
          </Col>
          <Col sm={6}>
            <Box title="Pacotes">
              <form id="pacote" onSubmit={handleSubmitPacote}>
                <div className="form-group">
                  <label htmlFor="pacote">Pacote</label>
                  <input
                    id="pacote"
                    onChange={(e) => setPacote(e.target.value)}
                  ></input>
                </div>
                <button type="submit">Adicionar</button>
              </form>
            </Box>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Pacotes;
