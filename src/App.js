import React from "react";
import { BrowserRouter as Router,Routes, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import styled from "styled-components";

import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  Private,
  AuthWrapper
} from "./pages";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          {/* <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/products/:id" children={<SingleProduct />}>
            <SingleProduct />
          </Route>

          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>

          <Route path="*">
            <Error />
          </Route> */}
          <Route path ='/' element ={<Home/>}></Route>
          <Route path ='about' element ={<About/>}></Route>
          <Route path ='cart' element ={<Cart/>}></Route>
          <Route path ='products' element ={<Products/>}></Route>
          <Route path ='products/:id' element ={<SingleProduct/>}></Route>
          <Route path='checkout' element={
            <PrivateRoute>
              <Checkout/>
            </PrivateRoute>
          }></Route>
          <Route path ='*' element ={<Error/>}></Route>
        </Routes>

        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
