// src/components/PanelAdmin.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Tabs, Tab, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const PanelAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [perros, setPerros] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [postulaciones, setPostulaciones] = useState([]); 
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para el Modal (CRUD)
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: '', password: '', email: '', first_name: '', last_name: '',
    telefono: '', direccion: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Token ${token}` };

  const cargarDatos = async () => {
    try {
      const [resStats, resUser, resPerros, resMensajes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/admin/stats/`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/usuarios/`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/perros/`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/mensajes/`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/postulaciones/`, { headers })
      ]);
      setStats(resStats.data);
      setUsuarios(resUser.data);
      setPerros(resPerros.data.filter(p => p.estado_adopcion === '2'));
      setMensajes(resMensajes.data);
      setLoading(false);
      setPostulaciones(resPostulaciones.data);
    } catch (err) {
      setError('Error al cargar datos de administración.');
      setLoading(false);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  // --- LÓGICA DEL CRUD ---

  const handleClose = () => {
    setShowModal(false);
    setFormData({ username: '', password: '', email: '', first_name: '', last_name: '', telefono: '', direccion: '' });
  };

  const abrirModalCrear = () => {
    setIsEdit(false);
    setShowModal(true);
  };

  const abrirModalEditar = (user) => {
    setIsEdit(true);
    setSelectedUserId(user.id);
    setFormData({
      username: user.username,
      password: '', // La contraseña se deja vacía al editar por seguridad
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      telefono: user.telefono,
      direccion: user.direccion
    });
    setShowModal(true);
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // ACTUALIZAR (PUT) - Si el password está vacío, enviamos los datos sin el campo password
        const dataUpdate = { ...formData };
        if (!dataUpdate.password) delete dataUpdate.password;
        
        await axios.put(`${import.meta.env.VITE_API_URL}/usuarios/${selectedUserId}/`, dataUpdate, { headers });
        Swal.fire('¡Éxito!', 'Usuario actualizado correctamente', 'success');
      } else {
        // CREAR (POST)
        await axios.post(`${import.meta.env.VITE_API_URL}/usuarios/`, formData, { headers });
        Swal.fire('¡Éxito!', 'Usuario creado correctamente', 'success');
      }
      handleClose();
      cargarDatos();
    } catch (err) {
      Swal.fire('Error', 'Hubo un problema al procesar la solicitud', 'error');
    }
  };

  const eliminarUsuario = async (id, nombre) => {
    const res = await Swal.fire({
      title: `¿Eliminar a ${nombre}?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    });

    if (res.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/usuarios/${id}/`, { headers });
        Swal.fire('Eliminado', 'Usuario borrado con éxito', 'success');
        cargarDatos();
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  };

const marcarMensajeLeido = async (id) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/mensajes/${id}/marcar_leido/`, {}, { headers });
    Swal.fire('Actualizado', 'Mensaje marcado como leído', 'success');
    cargarDatos();
  } catch (err) {
    Swal.fire('Error', 'No se pudo actualizar el mensaje', 'error');
  }
};

const eliminarMensaje = async (id) => {
  const res = await Swal.fire({
    title: '¿Eliminar mensaje?',
    text: "Esta acción quitará el mensaje de la bandeja de entrada permanentemente.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar'
  });

  if (res.isConfirmed) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/mensajes/${id}/`, { headers });
      Swal.fire('Eliminado', 'El mensaje ha sido borrado.', 'success');
      cargarDatos();
    } catch (err) {
      Swal.fire('Error', 'No se pudo eliminar el mensaje', 'error');
    }
  }
};

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <div className="py-5" style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <Container>
        <h2 className="fw-bold mb-4">Panel de Control Administrativo</h2>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                <Card.Title style={{ color: '#868686' }}>Total Perros</Card.Title>
                <h1 className="display-4" style={{ color: '#00ad5f', fontWeight: 'bold' }}>{stats.total_perros}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                <Card.Title style={{ color: '#868686' }}>Adoptados</Card.Title>
                <h1 className="display-4" style={{ color: '#00ad5f', fontWeight: 'bold' }}>{stats.perros_adoptados}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                <Card.Title style={{ color: '#868686' }}>Usuarios</Card.Title>
                <h1 className="display-4" style={{ color: '#00ad5f', fontWeight: 'bold' }}>{stats.total_usuarios}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                <Card.Title style={{ color: '#868686' }}>Mensajes</Card.Title>
                <h1 className="display-4" style={{ color: '#00ad5f', fontWeight: 'bold' }}>{stats.mensajes_nuevos}</h1>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Body>
            <Tabs defaultActiveKey="usuarios" className="mb-4">
                <Tab eventKey="usuarios" title="Usuarios">
                    <div className="d-flex justify-content-between mb-3">
                        <h4>Lista de Usuarios</h4>
                        <Button variant="success" onClick={abrirModalCrear}>+ Nuevo Usuario</Button>
                    </div>
                    <Table hover responsive>
                        <thead>
                            <tr>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(u => (
                            <tr key={u.id}>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.first_name} {u.last_name}</td>
                                <td>
                                <Button variant="primary" size="sm" className="me-2" onClick={() => abrirModalEditar(u)}>Editar</Button>
                                <Button variant="danger" size="sm" onClick={() => eliminarUsuario(u.id, u.username)}>Eliminar</Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
             {/* ================= PESTAÑA: PERROS ADOPTADOS Y SUS DUEÑOS ================= */}
               <Tab eventKey="perros" title="Perros Adoptados">
                    <div className="mb-3">
                        <h4>Historial de Adopciones</h4>
                        <p className="text-muted">Listado de perros con estado "Adoptado" en el sistema.</p>
                    </div>
                    <Table responsive hover className="align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>ID Perro</th>
                            <th>Nombre Perro</th>
                            <th>Raza</th>
                            <th>Adoptado por (Usuario)</th>
                            <th>Fecha de Adopción</th>
                        </tr>
                        </thead>
                        <tbody>
                        {perros && perros.map(p => {
                            // Buscamos si este perro en particular tiene una postulación confirmada
                            const postulacionAsociada = postulaciones.find(post => post.perro === p.id && post.confirmada);

                            return (
                            <tr key={p.id}>
                                <td>#{p.id}</td>
                                <td className="fw-bold">{p.nombre}</td>
                                <td>{p.raza}</td>
                                <td>
                                {postulacionAsociada ? (
                                    <span className="badge bg-info text-dark">{postulacionAsociada.usuario_username}</span>
                                ) : (
                                    <span className="text-muted">Adopción directa</span>
                                )}
                                </td>
                                <td>
                                {postulacionAsociada 
                                    ? new Date(postulacionAsociada.fecha).toLocaleDateString('es-AR') 
                                    : '-'
                                }
                                </td>
                            </tr>
                            );
                        })}
                        
                        {perros && perros.length === 0 && (
                            <tr>
                            <td colSpan="5" className="text-center py-3 text-muted">No hay adopciones registradas todavía.</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    </Tab>

                {/* ================= PESTAÑA: BANDEJA DE MENSAJES DE CONTACTO ================= */}
                <Tab eventKey="mensajes" title="Mensajes de Contacto">
                    <h4 className="mb-3">Bandeja de Entrada</h4>
                    <Table responsive hover className="align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>Fecha</th>
                            <th>Remitente</th>
                            <th>Email</th>
                            <th>Mensaje</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mensajes && mensajes.map(m => (
                            <tr key={m.id} className={m.leido ? 'table-light text-muted' : 'fw-bold table-white'}>
                            <td>{new Date(m.fecha_envio).toLocaleDateString('es-AR')}</td>
                            <td>{m.nombre}</td>
                            <td>{m.email}</td>
                            <td>{m.texto}</td>
                            <td>
                                {m.leido ? (
                                <span className="badge bg-secondary">Leído</span>
                                ) : (
                                <span className="badge bg-warning text-dark">Nuevo</span>
                                )}
                            </td>
                            <td>
                                {!m.leido && (
                                <Button 
                                    variant="outline-success" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => marcarMensajeLeido(m.id)}
                                >
                                    ✓ Leído
                                </Button>
                                )}
                                <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => eliminarMensaje(m.id)}
                                >
                                Eliminar
                                </Button>
                            </td>
                            </tr>
                        ))}
                        {mensajes && mensajes.length === 0 && (
                            <tr>
                            <td colSpan="6" className="text-center py-3 text-muted">Bandeja de entrada vacía.</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>

      {/* --- MODAL PARA CREAR/EDITAR --- */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={guardarUsuario}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control 
                type="text" required 
                value={formData.username} 
                onChange={(e) => setFormData({...formData, username: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña {isEdit && '(dejar en blanco para no cambiar)'}</Form.Label>
              <Form.Control 
                type="password" required={!isEdit}
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" required 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
            </Form.Group>
             <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" value={formData.direccion} onChange={(e) => setFormData({...formData, direccion: e.target.value})} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="success" type="submit">Guardar Cambios</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default PanelAdmin;