import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Product from "./components/Product";
import Contact from "./components/Contact";
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/buttons/Login";
import Register from "./components/buttons/Register";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Category from "./components/Category";

function App() {
  return (
    <>

        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>

      <div>
        <Routes>
        <Route exact path="/categories" element={<Category />} />
          <Route exact path="/libros/:id" element={<Product />} />
          <Route exact path="/productDetail/:id" element={<ProductDetail />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/sales" element={<Orders />} />
          <Route exact path="/customers" element={<Customers />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
export default App;
