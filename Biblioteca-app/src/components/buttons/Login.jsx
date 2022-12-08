import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const baseUrl = "http://localhost:31653/api/Usuarios/login";

  const [form, setForm] = useState({
    usuario: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const navigate = useNavigate();


  const iniciarSesion = async () => {

    if (form.usuario === "" || form.contraseña === "") {
      alert(
        "Todos los campos son requeridos"
      );
      return
    }
    await axios.post(baseUrl, form)
      .then((response) => {
        navigate("/home");
        alert(
          "Bienvenido: " + response.data.nombre + " " + response.data.apellido
        );
        localStorage.setItem("userData", JSON.stringify(response.data))
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Error: Contrasena o usuario incorrectos" 
        );
       
      });
  };

  const register = () => {
    navigate("/register");
  }
  return (
    <div className="color">
      <div className="imagenDeFondo">
        <div className="containerPrincipal">
          <div className="containerLogin">
            <div className="form-group">
              <div>
                <h2>Bienvenido a Biblioteca Virtual</h2>
              </div>
              <input
                type="text"
                className="form-control"
                label="Usuario"
                name="usuario"
                placeholder="Usuario"
                onChange={handleChange}
              />
              <br />
              <input
                type="password"
                className="form-control"
                name="contraseña"
                placeholder="Contraseña"
                onChange={handleChange}
              />
              <br />
              <button
                className="btn btn-primary"
                onClick={() => iniciarSesion()}
              >
                Iniciar Sesión
              </button>
              {" "}
              <button
                className="btn btn-info"
                onClick={() => register()}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
