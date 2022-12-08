import { React, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";

const Customers = () => {

    const [ordenes, setOrdenes] = useState([]);
    const baseUrl = "http://localhost:31653/api/Personas";
    const [client, setClient] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        correo: '',
        direccion: '',
    });
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: '100%',
            weight: '50px',
            height: '550px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#EFEFEB'
        },
    };


    const cargarOrdenes = async () => {
        await axios.get(baseUrl)
            .then((response) => {
                setOrdenes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const eliminarClient = async (e) => {
        await axios.delete(baseUrl +"/" + e)
            .then((response) => {
                alert(
                    "Cliente eliminado con exito"
                );
                window.location.reload();
            })
            .catch((error) => {

                console.log(e);
            });

    };



    const hanldeChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const agregarClients = async () => {

        if (client.nombre === '' || client.apellido === '' || client.correo === '' || client.direccion == '') {
            alert("Todos los campos deben ser llenados");
            return
        }
        else if (client.cedula == '' || client.cedula.length < 11) {
            alert("La cedula debe ser igual a 11 caracteres ");
            return
        }
        await axios.post(baseUrl, client)
            .then((response) => {
                alert(
                    "Cliente agregado con exito"
                );
                console.log(update);
                setUpdate(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        cargarOrdenes();
    }, [])
    return (
        <div>
            <Header />

            <div className="container py-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Clientes</h1>
                        <hr />
                    </div>
                    <div>
                        <button onClick={openModal} className='btn btn-secondary col-12'>Agregar Cliente</button>
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <form onSubmit={agregarClients}>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Nombre</label>
                                    <input value={client.nombre} required name='nombre' type='text' id='nombre' className='form-control' onChange={hanldeChange} />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Apellido</label>
                                    <input value={client.apellido} required name='apellido' type='text' id='apellido' className='form-control' onChange={hanldeChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Cedula</label>
                                    <input value={client.cedula} required name='cedula' type='text' maxLength={11} minLength={11} id='cedula' className='form-control' onChange={hanldeChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Correo</label>
                                    <input value={client.correo} required placeholder="you@example.com" name='correo' type='email' id='correo' className='form-control' onChange={hanldeChange} />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Direccion</label>
                                    <input value={client.direccion} name='direccion' type='text' id='direccion' className='form-control' onChange={hanldeChange} />
                                </div>

                                <div className="col-md-12 text-center">
                                    <button className='btn btn-primary btn-lg' >Guardar</button>
                                </div>
                            </form>
                        </Modal>
                    </div>

                    <MDBTable>

                        <MDBTableHead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Apellido</th>
                                <th scope='col'>Cedula</th>
                                <th scope='col'>Correo</th>
                                <th scope='col'>Direccion</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {ordenes.map(x => (
                                <tr key={x.idPersona}>
                                    <td>{x.idPersona}</td>
                                    <td>{x.nombre}</td>
                                    <td>{x.apellido}</td>
                                    <td>{x.cedula}</td>
                                    <td>{x.correo}</td>
                                    <td>{x.direccion}</td>
                                    <td>
                                        <button className='btn btn-outline-danger' onClick={() => eliminarClient(x.idPersona)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}

                        </MDBTableBody>
                    </MDBTable>
                </div>
            </div>
        </div>
    );
};

export default Customers;
