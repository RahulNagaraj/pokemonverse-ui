import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Footer = () => {
    return (
        <Container fluid style={{ marginTop: "5rem" }}>
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand
                        href="https://github.com/RahulNagaraj"
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        Developed by Rahul Nagaraj Muddebihal
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </Container>
    );
};

export default Footer;
