import React, { useEffect, useState} from 'react';
import fetchData from '../../fetchData';
import {Content, Row, Col, Box, SmartTable} from 'adminlte-2-react';
import axios from "axios";


const Privilegios = () => {
    const [privilegios, setPrivilegios] = useState([]);
    const [privilegio, setPrivilegio] = useState("");
    const url = "https://backend-owlr.onrender.com/privilegios";

    useEffect(() => {
        fetchData(url, setPrivilegios);
    }, []);

    const columns = [
        {title: "Privilegio", data: "designacao"},
    ]

    const handleClick = (e) => {
        e.preventDefault();
        const url = "https://backend-owlr.onrender.com/privilegios/create";
        const data = {privilegio};
        axios
            .post(url, data)
            .then((response) => {
                console.log(response.data);
                fetchData(url, setPrivilegios);
            })
            .catch((error) => {
                console.error(error);
            });
    }

  return (
    <>
      <Content>
        <Row>
          <Col sm={6}>
            <Box>
              <form>
                <div className='form-group'>
                  <label forHtml="privilegio">Adicionar privilégios</label>
                  <input id="privilegio" onChange={(e) => setPrivilegio(e.target.value)}></input>
                </div>
                <button type="submit" onClick={handleClick}>Adicionar</button>
              </form>
            </Box>
          </Col>
          <Col sm={6}>
            <SmartTable data={privilegios} columns={columns} />
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default Privilegios