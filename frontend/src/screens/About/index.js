import React from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "./../../components/BreadCrumb";
import "./style.scss";

const About = () => {
  return (
    <div>
      <BreadCrumb />

      <Container>
        <section className="product mt-5 pt-">
          <div className="product__info 5"></div>
          <div className="product__photo">
            <div className="photo-container"></div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default About;
