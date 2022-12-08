import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

function Register() {
    const baseUrl = "http://localhost:31653/api/Usuarios/registrar";

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        clave: "",
        rContraseña: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const register = async () => {
        if (form.correo === "" || form.nombre === "" || form.apellido === "" || form.clave === "") {
            alert(
                "Todos los campos son requeridos"
            );
            return
        }
        if (form.clave.length < 6) {
            alert(
                "La contraseña debe ser mayor a 6 caracteres"
            );
            return
        }
        if (form.clave !== form.rContraseña) {
            alert(
                "Las contraseñas deben ser iguales"
            );
            return
        }

        await axios.post(baseUrl, form)
            .then((response) => {
                navigate("/");
                alert(
                    "Usuario registrado: " + response.data.nombre + " " + response.data.apellido
                );
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const volver = () => {
        navigate("/");
    }
    return (
        <div className="color">
            <div className="imagenDeFondo">
                <div className="containerPrincipalR">
                    <div className="containerLogin">
                        <div className="form-group">
                            <div>
                                <h2>Registrate</h2>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                label="Nombre"
                                name="nombre"
                                placeholder="Nombre de Usuario"
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                name="apellido"
                                required
                                placeholder="Apellido del usuario"
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="email"
                                name="correo"
                                required
                                className="form-control"
                                placeholder="Correo electronico"
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="password"
                                required
                                className="form-control"
                                name="clave"
                                placeholder="Contraseña"
                                onChange={handleChange}
                            />
                            <br />
                            <input
                                type="password"
                                required
                                className="form-control"
                                name="rContraseña"
                                placeholder="Repetir Contraseña"
                                onChange={handleChange}
                            />
                            <br />
                            <button
                                className="btn btn-primary"
                                onClick={() => register()}
                            >
                                Registrar
                            </button>
                            {" "}
                            <button
                                className="btn btn-info"
                                onClick={() => volver()}
                            >
                                Volver atras
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
