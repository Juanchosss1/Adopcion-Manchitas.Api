// src/components/ListadoPerros.jsx
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ListadoPerros.css';

// Diccionarios
const mapaRazas = { '1': 'Labrador', '2': 'Caniche', '3': 'Bulldog', '4': 'Ovejero', '5': 'Otro' };
const mapaEdades = { '1': 'Cachorro', '2': 'Joven', '3': 'Adulto', '4': 'Viejo', '5': 'Indistinto' };
const mapaTamaños = { '1': 'Chico', '2': 'Mediano', '3': 'Grande', '4': 'Gigante' };

const ListadoPerros = () => {
  const navigate = useNavigate();
  const [perros, setPerros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [formData, setFormData] = useState({
    nombre: '', raza: '', edad: '', tamaño: '', peso: '', estado_salud: '1', vacunado: false, estado_adopcion: '1', imagen: ''
  });

  const getAxiosConfig = () => {
    return { headers: { Authorization: `Token ${localStorage.getItem('token')}` } };
  };

  useEffect(() => {
    fetchPerros();
  }, []);

  const fetchPerros = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/perros/disponibles/`, getAxiosConfig());
      setPerros(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire('Sesión expirada', 'Por favor vuelve a iniciar sesión', 'warning');
        navigate('/');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAdoptar = async (perroId, perroNombre) => {
    const result = await Swal.fire({
      title: `¿Adoptar a ${perroNombre}?`,
      text: "¡Estás a un paso de darle un nuevo hogar!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#00ad5f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, ¡quiero adoptarlo!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/perros/${perroId}/adoptar/`, {}, getAxiosConfig());
        Swal.fire('¡Felicidades!', `Has adoptado a ${perroNombre}.`, 'success');
        fetchPerros();
      } catch (error) {
        Swal.fire('Ups...', error.response?.data?.error || 'Hubo un problema.', 'error');
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/perros/`, formData, getAxiosConfig());
      Swal.fire('¡Éxito!', 'El perro ha sido registrado.', 'success');
      setFormData({ nombre: '', raza: '', edad: '', tamaño: '', peso: '', estado_salud: '1', vacunado: false, estado_adopcion: '1', imagen: '' });
      handleClose();
      fetchPerros();
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al cargar el perro.', 'error');
    }
  };

  return (
    <div className="listado-bg">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>Adopción Manchitas</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button variant="outline-light" onClick={handleLogout}>Cerrar Sesión</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container py-5">
        <Row className="mb-5 align-items-center">
          <Col>
            <h2 style={{ color: '#2b2b2b', fontWeight: '700' }}>Perros Buscando Hogar</h2>
          </Col>
          <Col xs="auto">
            <Button variant="success" size="lg" onClick={handleShow} style={{ backgroundColor: '#00ad5f', border: 'none' }}>
              + Dar en Adopción
            </Button>
          </Col>
        </Row>

        {/* GRILLA DE CARDS */}
        <Row className="justify-content-center">
          {perros.length === 0 ? (
            <Col className="text-center mt-5">
              <h5 className="text-muted">No hay perros disponibles en este momento.</h5>
            </Col>
          ) : (
            perros.map((perro) => (
              <Col xs={12} lg={4} key={perro.id}>
                <div className="card custom-card box-shadow mx-auto my-4 w-100" style={{ maxWidth: '22rem' }}>
                  
                  <img 
                    src={perro.imagen || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600'} 
                    className="card-img-top custom-card-img" 
                    alt={perro.nombre} 
                  />
                  
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,90.7C672,64,768,64,864,85.3C960,107,1056,149,1152,186.7C1248,224,1344,256,1392,272L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  </svg>
                  
                  {/* Ajustamos el padding inferior del body */}
                  <div className="card-body position-relative pb-3" style={{ paddingTop: '50px' }}>
                    <h5 className="card-title text-center fs-3">{perro.nombre}</h5>
                    <hr className="mx-4" />
                    <div className="card-text px-3 mb-4"> {/* Agregamos margen inferior al texto */}
                      <p><strong>Raza:</strong> {mapaRazas[perro.raza] || 'Desconocida'}</p>
                      <p><strong>Edad:</strong> {mapaEdades[perro.edad]}</p>
                      <p><strong>Tamaño:</strong> {mapaTamaños[perro.tamaño]}</p>
                      <p><strong>Peso:</strong> {perro.peso} kg</p>
                      <p className="mb-0"><strong>Vacunado:</strong> {perro.vacunado ? 'Sí ✅' : 'No ❌'}</p>
                    </div>

                    {/* NUEVO BOTÓN AQUÍ - Abajo, ancho completo y con texto */}
                    <div className="d-grid px-3">
                      <Button 
                        className="btn-adopcion-card" 
                        onClick={() => handleAdoptar(perro.id, perro.nombre)}
                      >
                        Adoptame!
                      </Button>
                    </div>
                  </div>

                  {/* ELIMINADO: Ya no usamos el ícono flotante btn-adoptar-icon */}

                </div>
              </Col>
            ))
          )}
        </Row>
      </div>

      {/*MODAL DE REGISTRO */}
      <Modal show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton className="text-white" style={{ backgroundColor: '#00ad5f' }}>
          <Modal.Title>Registrar Perro para Adopción</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Raza</Form.Label>
                  <Form.Select name="raza" value={formData.raza} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    <option value="1">Labrador</option>
                    <option value="2">Caniche</option>
                    <option value="3">Bulldog</option>
                    <option value="4">Ovejero</option>
                    <option value="5">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Select name="edad" value={formData.edad} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    <option value="1">Cachorro</option>
                    <option value="2">Joven</option>
                    <option value="3">Adulto</option>
                    <option value="4">Viejo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tamaño</Form.Label>
                  <Form.Select name="tamaño" value={formData.tamaño} onChange={handleChange} required>
                    <option value="">Selecciona...</option>
                    <option value="1">Chico</option>
                    <option value="2">Mediano</option>
                    <option value="3">Grande</option>
                    <option value="4">Gigante</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Peso (kg)</Form.Label>
                  <Form.Control type="number" step="0.1" name="peso" value={formData.peso} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control type="url" name="imagen" placeholder="https://ejemplo.com/foto.jpg" value={formData.imagen} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="¿Está vacunado?" name="vacunado" checked={formData.vacunado} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="success" type="submit" style={{ backgroundColor: '#00ad5f', border: 'none' }}>Guardar Perro</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ListadoPerros;