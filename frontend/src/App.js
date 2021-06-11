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
import SignIn from "./SignIn";
import Shipping from "./Shipping";
import BeforeNavbar from "./BeforeNavbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/shipping">
            <Navbar />
            <Shipping />
          </Route>

          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/orders">
            <BeforeNavbar />
            <Navbar />
            <CartScreen />
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
