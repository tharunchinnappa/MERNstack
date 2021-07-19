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
          <LinkContainer className="navbar-brand" to="/">
            <img src="/Product.png" className="img-h" alt="..." />
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
              <li className="nav-item">
                <Link className="nav-link px-4" to="/books">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link px-4" href="/showcase">
                  Showcase
                </a>
              </li>
              <li className="nav-item">
                <del>
                  <Link className="nav-link px-4" to="/blogs">
                    Blogs
                  </Link>
                </del>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/blogs">
                  Contacts
                </Link>
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
          {userInfo && userInfo.isAdmin ? (
            <NavDropdown title="Admin links" id="adminmenu">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
