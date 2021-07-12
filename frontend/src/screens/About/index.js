import React from "react";
import { Container } from "react-bootstrap";
import "./style.scss";

const About = () => {
  return (
    <div>
      <Container>
        <section className="product mt-5 pt-">
          <div className="product__info 5">
            <p>
              <strong>I </strong>am an Author and Entrepreneur working in the
              Defence equipment manufacturing and home services field.
            </p>
            <p>
              An Engineering dropout, pursuing his carrier in Project Management
              & Business Development.
            </p>
            <p>
              In 2016, I joined a startup Dvizira Pvt Ltd, Mysore, a founding
              member of the business, joined as an intern in the 1st year of
              Engineering.
            </p>
            <p>
              Currently working as a Program Manager in Dvizira Pvt Ltd, leads a
              team that is currently working on projects of the defense and
              communication sector.
            </p>
            <p>
              I am no stranger to technology having spent about three years
              working on Battery Technology, before the work in the management
              field I have  worked on a project called “Active Battery
              Management System” and also wrote a research paper on “Active
              charge balancing in Li-ion battery” presented in IEEE (Institute
              of Electrical and Electronics Engineers)
            </p>
            <p>
              I am the Co-Founder of PlumBazar which is a company started in
              Mangalore, PlumBazar is an application providing facilities for
              in-app purchasing of the hardware’s along with plumbing and
              electrical services for the customers, in this organization the
              focus is to bring the wholesale vendors, retail vendors, and
              customers to one platform.
            </p>
            <p>
              I'm also passionate about the Military and am currently working on
              projects to aid the soldier's hard lifestyle and to support them
              during combat. Published author of "A Non-Engineers approach to
              Battery Technology" & "An Entrepreneur & the Entrepreneurship"
            </p>
            <p>
              Growing up in a very remote region from Kodagu, India I am also
              extremely passionate about Birdwatching & Wildlife photography,
              having spent a lot of time in the wild exploring landscapes and
              wildlife in the region, the showcase section provides my favorite
              images from the region and all are also available for sale in
              different canvas sizes.
            </p>
          </div>
          <div className="product__photo">
            <div className="photo-container"></div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default About;
