import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import component
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductGallery from "./components/ProductGallery";

// import Screens
import HomeScreen from "./screens/HomeScreen";
import About from "./screens/About";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Showcase from "./screens/Showcase";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen.js";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import Shop from "./screens/Shop";
import ShowcaseListScreen from "./screens/ShowcaseListScreen";
import ShowcaseEditScreen from "./screens/ShowcaseEditScreen";
import Contact from "./screens/Contact";

const App = ({ history }) => {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/productlist" component={ProductListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/showcaselist" component={ShowcaseListScreen} />
          <Route
            path="/admin/showcase/:id/edit"
            component={ShowcaseEditScreen}
          />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/search/:keyword" component={HomeScreen} />
          <Route exact path="/contacts" component={Contact} />
          <Route exact path="/showcase" component={Showcase} />
          <Route exact path="/books" component={Shop} />
          <Route exact path="/about" component={About} />
          <Route exact path="/test" component={ProductGallery} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
