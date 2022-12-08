import axios from "axios";
import { React, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Modal from 'react-modal';
import Header from "./Header";



const Product = () => {
    const [products, setProducts] = useState([]);
    const [autors, setAutors] = useState([]);
    const baseUrl = "http://localhost:31653/api/";
    const proid = useParams();
    const [product, setProduct] = useState({
        idAutor: 1,
        idCategoria: proid.id,
        titulo: '',
        imagen: '',
        descripcion: ''
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
            height: '450px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#EFEFEB'
        },
    };

    const cargarProducts = async () => {
        await axios.get(baseUrl + 'Libros/categoria/' + proid.id)
            .then(response => {
                setProducts(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const cargarAutores = async () => {
        await axios.get(baseUrl + 'Autores')
            .then(response => {
                setAutors(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const eliminarProducts = async (e) => {
        await axios.delete(baseUrl + 'Libros/' + e)
            .then((response) => {
                alert(
                    "Libro eliminado con exito"
                );
                console.log(update);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const hanldeChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
        console.log(product)
    }

    const agregarProducts = async () => {
        await axios.post(baseUrl + 'libros', product)
            .then((response) => {
                alert(
                    "Libro creado con exito"
                );
                setUpdate(true);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    // useEffect(() => {
    //   cargarProducts()
    //   // setUpdate(false)
    // }, [update])

    useEffect(() => {
        cargarProducts();
        cargarAutores()
        setUpdate(false)
    }, [])

    const cardItem = (item) => {
        return (
            <div className="card my-0 py-0 " key={item.idLibro} style={{ width: "18rem" }}>
                <img src={item.imagen} className="card-img-top mx-auto" alt={item.titulo} style={{ width: "200px", height: "250px", textAlign: "center" }} />
                <div class="card-body text-center">
                    <h5 class="card-title">{item.titulo}</h5>
                    <p className="lead">{item.estado ? 'Disponible' : 'No disponible'}</p>
                    <NavLink
                        to={`/productDetail/${item.idLibro}`}
                        className="btn btn-outline-primary"
                    >
                        Ver Libro
                    </NavLink>{' '}
                    <button className='btn btn-outline-danger' onClick={() => eliminarProducts(item.idLibro)}>Eliminar</button>
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
                        <h1>Libros</h1>
                        <hr />
                    </div>
                    <div>
                        <button onClick={openModal} className='btn btn-primary col-12'>Agregar Libro</button>
                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            <form onSubmit={agregarProducts}>

                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Seleccione un autor:
                                        <select className='form-control' required name="idAutor" value={product.idAutor} onChange={hanldeChange} >
                                            {autors.map((au) => {
                                                return (
                                                    <option key={au.idAutor} value={au.idAutor}> {au.nombre} </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Titulo</label>
                                    <input value={product.titulo} required name='titulo' type='text' id='titulo' className='form-control' onChange={hanldeChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Descripcion</label>
                                    <input value={product.descripcion} required name='descripcion' type='textarea' id='descripcion' className='form-control' onChange={hanldeChange} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='title' className='form-label'>Imagen</label>
                                    <input value={product.imagen} name='imagen' type='text' id='imagen' className='form-control' onChange={hanldeChange} />
                                </div>

                                <div className="col-md-12 text-center">
                                    <button className='btn btn-primary btn-lg' >Guardar</button>
                                </div>
                            </form>
                        </Modal>
                    </div>

                </div>
                {products.length > 0 ? (
                    <>
                        <div className="container pt-5">
                            <div className="row" id={products.idLibro}>{products.map(cardItem)}</div>
                        </div>
                    </>
                ) :
                    <div className="col-12 text-center pt-2">
                        <h2>No hay libros de esta Categoria</h2>
                        <hr />
                    </div>
                }
            </div>
        </div>
    );
};

export default Product;
