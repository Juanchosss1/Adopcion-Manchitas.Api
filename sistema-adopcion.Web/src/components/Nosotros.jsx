// src/components/Nosotros.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Nosotros = () => {
  return (
    <div className="py-5" style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="display-4" style={{ color: '#2b2b2b', fontWeight: '700' }}>Sobre Nosotros</h2>
            <hr className="my-4" />
            <p className="lead" style={{ color: '#868686' }}>
              Conectamos perros que buscan un hogar con personas dispuestas a brindarles amor, cuidado y una segunda oportunidad. Promovemos la adopción responsable porque creemos que cada perro merece una familia y una vida digna.
            </p>
            <div className="mt-5 text-start">
              <h4 style={{ color: '#00ad5f' }}>Nuestra Misión</h4>
              <p>Detrás de cada perro hay una historia de superación y esperanza. Nuestra misión es ayudarlos a encontrar un hogar donde sean queridos y protegidos. Porque adoptar no solo cambia la vida de un perro, también transforma la de quien lo adopta.</p>
              
              <h4 className="mt-4" style={{ color: '#00ad5f' }}>¿Cómo ayudamos?</h4>
                <p>Somos un grupo de personas comprometidas con el bienestar animal y la búsqueda de hogares responsables para perros que han sido rescatados, abandonados o se encuentran en situación de vulnerabilidad.
                  Creemos que cada perro merece una segunda oportunidad, por eso trabajamos para brindarles cuidado, atención y mucho cariño mientras esperan encontrar una familia que los acompañe para toda la vida.
                  Nuestro objetivo es promover la adopción responsable, la tenencia consciente y el respeto por los animales, ayudando a conectar a cada perro con un hogar lleno de amor.
                </p>
            </div>
            <h4 className="display-4" style={{ color: '#00ad5f', fontWeight: '500' }}>Adoptar salva vidas</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Nosotros;