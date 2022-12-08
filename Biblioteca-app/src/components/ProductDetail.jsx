import {React,useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import DATA from "../Data";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem, delItem } from "../redux/actions/index";
import Header from "./Header";

const ProductDetail = () => {
  const [cartBtn, setCartBtn] = useState("Añadir al Carrito");
  const [product, setProduct] = useState([]);
  const [autor, setAutor] = useState([]);
  const proid = useParams();
  // const proDetail = products.filter((x) => x.id == proid.id);
  const baseUrl = "http://localhost:31653/api/Libros/";
  const baseUrl1 = "http://localhost:31653/api/Autores/";

  const cargarProducts = async () => {
    await axios.get(baseUrl + proid.id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const cargarAutores = async () => {
    await axios.get(baseUrl1 + proid.id)
      .then((response) => {
        setAutor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    cargarProducts();
    cargarAutores();
  }, [])



  const dispatch = useDispatch();

  const handleCart = (product) => {
    if (cartBtn === "Añadir al Carrito") {
      dispatch(addItem(product));
      setCartBtn("Eliminar del carrito");
    } else {
      dispatch(delItem(product));
      setCartBtn("Añadir al Carrito");
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="container my-5 py-3">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center mx-auto product">
              <img src={product.imagen} alt={product.titulo} height="400" />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h1 className="display-5 fw-bold">{product.titulo}</h1>
              <h3 className="display-10 ">{autor.nombre}</h3>
              <hr />
              <p className="lead">{product.descripcion}</p>
              {/* <button
                onClick={() => handleCart(product)}
                className="btn btn-outline-success my-5"
              >
                {cartBtn}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
