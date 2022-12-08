import React, { Component, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import CartBtn from "./buttons/CartBtn";
import { useNavigate } from "react-router-dom";


const Header = (props) => {
  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid py-2">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Libros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customers">
                  Clientes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales">
                  Prestamos
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li> */}
            </ul>
            <NavLink className="navbar-brand mx-auto col-4 display: block " to="/home">BIBLIOTECA VIRTUAL</NavLink>

            <button className="btn btn-danger" onClick={() => cerrarSesion()}>
              Cerrar Sesión
            </button>
            {/* <br />
            <CartBtn /> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
