import React from 'react';
import estilo from './extensao.module.css';
import {Container, Row, Col} from 'react-bootstrap';
const Extensao = ({extensao}) => {
  return (
    <Container className='mb-2'>
      <Row className={estilo.fundo}>
        <Col sm={2} className={`d-flex justify-content-center align-items-center ${estilo.extensao}`}>
          <p className={estilo.designacao}>{extensao.designacao}</p>
        </Col>
        <Col className='d-flex align-items-center'>
          <p className={estilo.descricao}>{extensao.descricao}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Extensao