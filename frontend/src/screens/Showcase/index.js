import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listShowcaseItems } from "../../redux/actions/showcaseActions";
import { Link } from "react-router-dom";
import Loader from "./../../components/Loader";
import Toast from "./../../components/Toast";
import "./style.scss";

const Showcase = () => {
  const dispatch = useDispatch();
  const showcaseItemsList = useSelector((state) => state.showcaseItemsList);
  const { loading, error, showcase } = showcaseItemsList;

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
                <Link className="gallery__link" to={`/showcase/${item._id}`}>
                  <figure className="gallery__thumb">
                    <img
                      src={`http://${window.location.host}/${item.image.path}`}
                      alt="Portrait by Jessica Felicio"
                      className="gallery__image"
                    />
                    <figcaption className="gallery__caption">
                      <h5>{item.name}</h5>
                      Portrait by Poovaiah
                    </figcaption>
                  </figure>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Showcase;
