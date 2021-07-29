import React, { useState } from "react";
import "./style.scss";

const ProductGallery = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(images[0].path);

  return (
    <div className="productGallery">
      <div className="container-gallery">
        <img
          src={`http://${window.location.host}/${selectedImg}`}
          alt="Selected"
          className="selected"
        />
        <div className="imgContainer">
          {images.map((img, index) => (
            <img
              style={{ border: selectedImg === img ? "4px solid purple" : "" }}
              key={index}
              src={`http://${window.location.host}/${img.path}`}
              alt={img.originalname}
              onClick={() => setSelectedImg(img.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
