import axios from "axios";
import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DATA from "../Data";
import Header from "./Header";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [scrollableModal, setScrollableModal] = useState(false);
  const baseUrl = "http://localhost:31653/api/Categorias";

  const cargarProducts = async () => {
    await axios.get(baseUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    cargarProducts();
  }, [])

  const cardItem = (item) => {
    return (
      <div className="card my-0 py-0 " key={item.id} style={{ width: "27rem" }}>
        <img src={item.imagen} className="card-img-top mx-auto" alt={item.nombre} style={{ width: "300px", height: "250px", textAlign:"center"}} />
        <div class="card-body text-center">
          <h5 class="card-title">{item.nombre}</h5>
          <NavLink
            to={`/libros/${item.idCategoria}`}
            className="btn btn-outline-primary"
          >
            Ver Libros
          </NavLink>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Categoria de Libros</h1>
            <hr />
          </div>
        </div>

        <div className="container pt-2 ">
          <div className="row " id={products.idCategoria}>{products.map(cardItem)}</div>
        </div>
      </div>
    </div>
  );
};

export default Category;
