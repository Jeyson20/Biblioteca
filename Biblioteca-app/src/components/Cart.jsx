import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { delItem } from "../redux/actions/index";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Cart = () => {
  const state = useSelector((state) => state.addItem);
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(delItem(item));
  };

  const cartItems = (cartItem) => {
    return (
      <div>
        {/* <Header /> */}
        <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
          <div className="container py-4">
            <button
              onClick={() => handleClose(cartItem)}
              className="btn-close float-end"
              aria-label="Close"
            ></button>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <img
                  src={cartItem.imagen}
                  alt={cartItem.nombre}
                  height="200px"
                  width="180px"
                />
              </div>
              <div className="col-md-4">
                <h3>{cartItem.nombre}</h3>
                <p className="lead fw-bold">${cartItem.precio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => {
    return (
      <div>
        <Header />
        <div className="px-4 my-5 bg-light rounded-3 py-5">
          <div className="container py-4">
            <div className="row">
              <h3>Tu carro esta vacío</h3>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const button = () => {
    return (
      <div className="container">
        <div className="row">
          <NavLink
            to="/checkout"
            className="btn btn-outline-success mb-5 w-25 mx-auto"
          >
            Proceder a pagar
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && button()}
    </>
  );
};

export default Cart;
