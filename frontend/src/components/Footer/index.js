import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy;, 2021 Poovaiah Malavanda
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
