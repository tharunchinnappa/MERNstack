import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            copyright &copy; Poovaiah Malavanda
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
