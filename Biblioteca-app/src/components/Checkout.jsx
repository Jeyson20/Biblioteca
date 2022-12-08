import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const Checkout = () => {
  const state = useSelector((state) => state.addItem);

  var total = 0;
  const itemList = (item) => {
    total = total + item.precio;
    return (
      <li className="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 className="my-0">{item.nombre}</h6>
        </div>
        <span className="text-muted">${item.precio}</span>
      </li>
    );
  };
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Carrito</span>
              <span className="badge bg-primary rounded-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(itemList)}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (DOP)</span>
                <strong>${total}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Area de Pagos</h4>
            <form className="needs-validation" novalidate="">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="country" className="form-label">
                    Cliente
                  </label>
                  <select className="form-select" id="country" required="">
                    <option value="">Seleccione el cliente...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <label htmlFor="lastName" className="form-label">
                  Comentario
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="comentario"
                  placeholder=""
                  value=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continuar a Pagar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
