import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/MainMenu.css';

const MainMenu = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="#">Inventario</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/create-product">Crear productos</Nav.Link>
                            <Nav.Link as={Link} to="/view-inventory">Ver inventario</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="main-content">
                <img src="https://via.placeholder.com/800x400" alt="Imagen centrada" className="centered-image" />
            </div>
        </>
    );
};

export default MainMenu;