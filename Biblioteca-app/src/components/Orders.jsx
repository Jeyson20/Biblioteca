import { React, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";

const Orders = () => {

  const [ordenes, setOrdenes] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [libros, setLibros] = useState([]);
  const baseUrl = "http://localhost:31653/api/Prestamos";
  const baseUrl1 = "http://localhost:31653/api/Personas";
  const baseUrl2 = "http://localhost:31653/api/Libros";
  const [client, setClient] = useState({
    idPersona: 1,
    idLibro: 1,
    fechaDevolucion: ''
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
      height: '350px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#EFEFEB'
    },
  };


  const cargarOrdenes = async () => {
    await axios.get(baseUrl)
      .then((response) => {
        setOrdenes(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  };


  const cargarPersonas = async () => {
    await axios.get(baseUrl1)
      .then((response) => {
        setPersonas(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cargarLibros = async () => {
    await axios.get(baseUrl2)
      .then((response) => {
        setLibros(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const actualizarEstado = async (e) => {
    await axios.put(baseUrl + "/" + e)
      .then((response) => {
        alert(
          "Prestamo actualizado con exito"
        );
        window.location.reload();
      })
      .catch((error) => {

        console.log(e);
      });

  };

  const deshabilitarBoton =()=>{
    if (libros.length >0) {
      return false;
    }
    return true;
  }



  const hanldeChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value
      
    })
    console.log(client);
  }

  const agregarClients = async () => {
    if (client.idPersona === '' || client.idLibro === '' || client.fechaDevolucion == '') {
      alert("Todos los campos deben ser llenados");
      return
    }
    await axios.post(baseUrl, client)
      .then((response) => {
        alert(
          "Prestamo agregado con exito"
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
    cargarPersonas();
    cargarLibros();
  }, [])
  return (
    <div>
      <Header />

      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Prestamos</h1>
            <hr />
          </div>
          <div>
            <button onClick={openModal} className='btn btn-primary col-12'>Agregar Prestamo</button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <form onSubmit={agregarClients}>

                <div className='mb-3'>
                  <label className='form-label'>
                    Seleccione un Cliente:
                    <select className='form-control' required name="idPersona" value={client.idPersona} onChange={hanldeChange} >
                      {personas.map((au) => {
                        return (
                          <option key={au.idPersona} value={au.idPersona}> {au.nombre} </option>
                        )
                      })}
                    </select>
                  </label>
                </div>


                <div className='mb-3'>
                  <label className='form-label'>
                    Seleccione un Libro:
                   { libros.length >0 ? <select className='form-control' name="idLibro" value={client.idLibro} onChange={hanldeChange} >
                      {libros.map((au) => {
                        return (
                          <option key={au.idLibro} value={au.idLibro}> {au.titulo} </option>
                        )
                      })}
                    </select> : ' NO HAY LIBROS DISPONIBLES '}
                  </label>
                </div>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>Fecha Devolucion</label>
                  <input value={client.fechaDevolucion} required name='fechaDevolucion' type='date' id='fechaDevolucion' className='form-control' onChange={hanldeChange} />
                </div>

                <div className="col-md-12 text-center">
                  <button className='btn btn-primary btn-lg' disabled={deshabilitarBoton()} >Guardar</button>
                </div>
              </form>
            </Modal>
          </div>

          <MDBTable>

            <MDBTableHead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Cliente</th>
                <th scope='col'>Libro</th>
                <th scope='col'>Estado</th>
                <th scope='col'>Fecha Entrega</th>
                <th scope='col'>Fecha Devolucion</th>
                <th scope='col'>Acción</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {ordenes.map(x => (
                <tr key={x.idPrestamo}>
                  <td>{x.idPrestamo}</td>
                  <td>{x.persona.nombre} {x.persona.apellido}</td>
                  <td>{x.libro.titulo}</td>
                  <td>{x.estado.descripcion}</td>
                  <td>{x.fechaEntrega}</td>
                  <td>{x.fechaDevolucion}</td>
                  <td>
                    {x.estado.idEstadoPrestamo == 1 ? (
                      <button className='btn btn-outline-danger' onClick={() => actualizarEstado(x.idPrestamo)}>Cambiar Estado</button>
                    ) : ''
                    }
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

export default Orders;
