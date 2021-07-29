import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { useState } from "react";
import { NavDropdown, Navbar, Nav, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./style.scss";

const Header = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

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
      <Navbar collapseOnSelect expand="lg" variant="dark" className="px-5">
        <LinkContainer className="navbar-brand" to="/">
          <img src="/Product.png" className="img-h" alt="Pooviah" />
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/books">
              <Nav.Link>Books</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/showcase">
              <Nav.Link>Showcase</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blogs">
              <del>
                <Nav.Link>Blogs</Nav.Link>
              </del>
            </LinkContainer>
            <LinkContainer to="/contacts">
              <Nav.Link>Contacts</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-auto align-items-center">
            <LinkContainer to="/cart">
              <Nav.Link>
                {/* <i className="fas fa-shopping-cart px-1" />
                Cart */}
                <span class="fa-stack fa-1x has-badge" data-count={totalItems}>
                  <i class="fas fa-shopping-basket fa-2x"></i>
                </span>
              </Nav.Link>
            </LinkContainer>
            {!userInfo && (
              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Link
                  to="/register"
                  className="btn btn-sm btn-primary w-full w-lg-auto"
                >
                  Register
                </Link>
              </div>
            )}
            {userInfo ? (
              <NavDropdown
                className="text-capitalize"
                title={userInfo.name}
                id="username"
              >
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
                <LinkContainer to="/admin/showcaselist">
                  <NavDropdown.Item>Showcase</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
