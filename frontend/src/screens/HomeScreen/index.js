import React from "react";
import { Link } from "react-router-dom";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import "./style.scss";

const HomeScreen = () => {
  return (
    <div>
      <Background />
      <div class="hero">
        <div class="center-content">
          <h1 className="display-1 mb-5">Hai, i'm Poovaiah Malavanda</h1>

          <p className="h5">
            An Indian Author & Photographer, a Kodagu native working on
            Entrepreneurship development.Welcome to my digital home. Please take
            a mini tour of my life as a writer; I hope that you'll enjoy your
            time visiting.
          </p>
          <Link to="/about" class="button">
            About Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
