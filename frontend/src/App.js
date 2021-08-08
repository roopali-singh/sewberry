import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import ShopLinkScreen from "./ShopLinkScreen";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";
import Login from "./Login";
import RegisterScreen from "./RegisterScreen";
import Shipping from "./Shipping";
import BeforeNavbar from "./BeforeNavbar";
import WishlistLinkScreen from "./WishlistLinkScreen";
import Account from "./Account";
import OrderStatus from "./OrderStatus";
import AccountInfoEdit from "./AccountInfoEdit";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/wishlist">
            <BeforeNavbar />.
            <Navbar />
            <WishlistLinkScreen />
            <BackToTop />
            <Footer />
          </Route>

          <Route path="/register">
            <RegisterScreen />
          </Route>

          <Route path="/account/edit">
            <AccountInfoEdit />
          </Route>

          <Route path="/account">
            <Navbar />
            <Account />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/orders">
            <BeforeNavbar />
            <Navbar />
            <OrderStatus active1 active2 />
            <CartScreen />
          </Route>

          <Route path="/shipping/:id">
            <Navbar />
            <OrderStatus active1 active2 active3 />
            <Shipping />
          </Route>

          <Route
            path="/products/:id"

            // METHOD USING THE PARAMS.MATCH >>>>>>>>>
            // render={(props) => (
            //   <div>
            //     <Navbar />
            //     <ProductScreen {...props} />
            //   </div>
            // )}  <<<<<<<<<<<<<
          >
            {/* METHOD USING THE USEpARAMS  */}
            <BeforeNavbar />
            <Navbar />
            <ProductScreen />
          </Route>

          <Route path="/products">
            <BeforeNavbar />
            <Navbar />
            <ShopLinkScreen />
            <BackToTop />
          </Route>

          <Route path="/">
            <BeforeNavbar />
            <Navbar />
            <Home />
            <BackToTop />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
