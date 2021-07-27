import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listShowcaseItems } from "../../redux/actions/showcaseActions";
import Loader from "./../../components/Loader";
import Toast from "./../../components/Toast";
import "./style.scss";

const ShowcaseImage = () => {
  const dispatch = useDispatch();
  const showcaseItemsList = useSelector((state) => state.showcaseItemsList);
  const { loading, error, showcase } = showcaseItemsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listShowcaseItems());
  }, [dispatch]);

  console.log(showcase);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Toast text={error} type="error" />
      ) : (
        <div>
          {showcase.map((item, index) => (
            <div className="gallery">
              <div className="gallery__column">
                <a
                  href="https://unsplash.com/@jeka_fe"
                  target="_blank"
                  className="gallery__link"
                >
                  <figure className="gallery__thumb">
                    <img
                      src={item.image.path}
                      alt="Portrait by Jessica Felicio"
                      className="gallery__image"
                    />
                    <figcaption className="gallery__caption">
                      Portrait by Jessica Felicio
                    </figcaption>
                  </figure>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ShowcaseImage;
