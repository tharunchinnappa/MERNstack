import React from "react";
import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { NavDropdown, Nav } from "react-bootstrap";
import "./style.scss";

const Header = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent  px-0 py-3">
        <div className="container-xl px-1">
          <LinkContainer className="navbar-brand mx-auto" to="/">
            <img src="Product.png" className="img-h" alt="..." />
          </LinkContainer>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mx-lg-auto">
              <li className="nav-item">
                <Link className="nav-link px-4" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link px-4 dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenu"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  option2
                </a>
                <div
                  className="dropdown-menu dropdown-menu-md p-0 overflow-hidden shadow"
                  aria-labelledby="true"
                >
                  <div className="px-4 pt-4 text-black">
                    <a href="#" className="dropdown-group mb-2" role="button">
                      <div className="d-flex">
                        <div>
                          <div className="icon text-black text-lg lh-snug">
                            <i className="bi bi-house-door"></i>
                          </div>
                        </div>
                        <div className="ps-4  pb-3">
                          <span className="d-block dropdown-heading mb-1">
                            sub option 1
                          </span>
                          <p className="dropdown-helper">Sub option helper</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-group mb-2" role="button">
                      <div className="d-flex">
                        <div>
                          <div className="icon text-black text-lg lh-snug">
                            <i className="bi bi-briefcase"></i>
                          </div>
                        </div>
                        <div className="ps-4 pb-3">
                          <span className="d-block dropdown-heading mb-1">
                            sub option 2
                          </span>
                          <p className="dropdown-helper">Sub option helper</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-group mb-2" role="button">
                      <div className="d-flex">
                        <div>
                          <div className="icon text-black text-lg lh-snug">
                            <i className="bi bi-shop"></i>
                          </div>
                        </div>
                        <div className="ps-4  pb-3">
                          <span className="d-block dropdown-heading mb-1">
                            sub option 3
                          </span>
                          <p className="dropdown-helper">Sub option helper</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-group mb-2" role="button">
                      <div className="d-flex">
                        <div>
                          <div className="icon text-black text-lg lh-snug">
                            <i className="bi bi-envelope"></i>
                          </div>
                        </div>
                        <div className="ps-4  pb-3">
                          <span className="d-block dropdown-heading mb-1">
                            sub option 4
                          </span>
                          <p className="dropdown-helper">Sub option helper</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="px-4 py-4 dropdown-secondary">
                    <div className="d-flex flex-wrap">
                      <div className="col-sm-6">
                        <a
                          href="#"
                          className="dropdown-group py-2"
                          role="button"
                        >
                          <div className="d-flex">
                            <div>
                              <div className="icon text-black text-base lh-snug">
                                <i className="bi bi-journals"></i>
                              </div>
                            </div>
                            <div className="ps-4">
                              <span className="d-block dropdown-heading text-sm mb-0">
                                Reference 1
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <a
                          href="#"
                          className="dropdown-group py-2"
                          role="button"
                        >
                          <div className="d-flex">
                            <div>
                              <div className="icon text-black text-base lh-snug">
                                <i className="bi bi-chat"></i>
                              </div>
                            </div>
                            <div className="ps-4">
                              <span className="d-block dropdown-heading text-sm mb-0">
                                Reference 2
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <a
                          href="#"
                          className="dropdown-group py-2"
                          role="button"
                        >
                          <div className="d-flex">
                            <div>
                              <div className="icon text-black text-base lh-snug">
                                <i className="bi bi-list-ul"></i>
                              </div>
                            </div>
                            <div className="ps-4">
                              <span className="d-block dropdown-heading text-sm mb-0">
                                Reference 3
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <a
                          href="#"
                          className="dropdown-group py-2"
                          role="button"
                        >
                          <div className="d-flex">
                            <div>
                              <div className="icon text-black text-base lh-snug">
                                <i className="bi bi-code"></i>
                              </div>
                            </div>
                            <div className="ps-4">
                              <span className="d-block dropdown-heading text-sm mb-0">
                                Reference 4
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/about">
                  About me
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4" href="#">
                  option4
                </a>
              </li>
            </ul>
            {/* Right navigation */}

            {/* Action */}
            <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
              <Link
                to="/register"
                className="btn btn-sm btn-primary w-full w-lg-auto"
              >
                Register
              </Link>
            </div>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user px-1" />
                  Sign in
                </Nav.Link>
              </LinkContainer>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
