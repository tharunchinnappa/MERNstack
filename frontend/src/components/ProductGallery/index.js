import React from "react";
import { Card } from "react-bootstrap";
import "./style.scss";

const ProductGallery = ({ images }) => {
  console.log(images);
  return (
    <div className="preview col-md-6">
      <div className="preview-pic tab-content">
        {/* {images.map(function (image, index) {
          return (
            //   <Card.Img src={image.path} key={index} variant="top" />
          
          );
        })} */}

        <div className="tab-pane active" id="pic-1">
          <img src="http://placekitten.com/400/252" />
        </div>

        <div className="tab-pane" id="pic-2">
          <img src="http://placekitten.com/400/252" />
        </div>
        <div className="tab-pane" id="pic-3">
          <img src="http://placekitten.com/400/252" />
        </div>
        <div className="tab-pane" id="pic-4">
          <img src="http://placekitten.com/400/252" />
        </div>
        <div className="tab-pane" id="pic-5">
          <img src="http://placekitten.com/400/252" />
        </div>
      </div>
      <ul className="preview-thumbnail nav nav-tabs">
        <li className="active">
          <a data-target="#pic-1" data-toggle="tab">
            <img src={images[0].path} />
          </a>
        </li>
        <li>
          <a data-target="#pic-2" data-toggle="tab">
            <img src="http://placekitten.com/200/126" />
          </a>
        </li>
        <li>
          <a data-target="#pic-3" data-toggle="tab">
            <img src="http://placekitten.com/200/126" />
          </a>
        </li>
        <li>
          <a data-target="#pic-4" data-toggle="tab">
            <img src="http://placekitten.com/200/126" />
          </a>
        </li>
        <li>
          <a data-target="#pic-5" data-toggle="tab">
            <img src="http://placekitten.com/200/126" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProductGallery;
