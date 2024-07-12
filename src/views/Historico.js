import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import { Container, Row, Col, Form, InputGroup, Button, Table } from "react-bootstrap";
import Footer from "../components/Footer";
// import Table from './Table';


const Historico = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data));
    }, []);

    return (
        <>
            <Navbar />
            <Container>
                <h2 className="mt-3">Histórico Transações</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Transação</th>
                            <th>Data e Hora</th>
                            <th>Quantidade</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.description}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Footer />
            </Container>
        </>
    );
};

export default Historico;
