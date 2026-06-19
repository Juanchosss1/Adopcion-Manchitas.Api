// src/components/Contacto.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const Contacto = () => {
    const [mensaje, setMensaje] = useState({ nombre: '', email: '', texto: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/contacto/enviar/`, mensaje);
            Swal.fire({
            title: '¡Mensaje enviado!',
            text: 'Tu mensaje fue guardado en nuestra base de datos.',
            icon: 'success'
            });
            setMensaje({ nombre: '', email: '', texto: '' });
        } catch (error) {
            Swal.fire('Error', 'No se pudo enviar el mensaje', 'error');
        }
    };
    
    return (
        <div className="py-5" style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Container>
            <Row className="justify-content-center">
            <Col md={6}>
                <h2 className="text-center mb-4" style={{ color: '#2b2b2b', fontWeight: '700' }}>Contacto</h2>
                <Form onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" required value={mensaje.nombre} onChange={(e) => setMensaje({...mensaje, nombre: e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required value={mensaje.email} onChange={(e) => setMensaje({...mensaje, email: e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={4} required value={mensaje.texto} onChange={(e) => setMensaje({...mensaje, texto: e.target.value})} />
                </Form.Group>
                <Button type="submit" className="w-100" style={{ backgroundColor: '#00ad5f', border: 'none' }}>
                    Enviar Mensaje
                </Button>
                </Form>
            </Col>
            </Row>
        </Container>
        </div>
    );
};

export default Contacto;