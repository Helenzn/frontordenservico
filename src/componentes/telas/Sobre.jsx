import Container from 'react-bootstrap/Container';
import "./../../componentes/Menu.css";
import { FiInfo } from 'react-icons/fi';

const Sobre = () => (
  <div>
    <section className="hero-section text-center">
      <Container>
        <h1 className="hero-title">
          <FiInfo className="me-2" /> Sobre o Sistema de Ordens de Serviço 🩶
        </h1>

        <p className="hero-subtitle">
          O <strong>Sistema de Ordens de Serviço</strong> foi desenvolvido na Disciplina de <strong>Programação Web 2025/2</strong>.
        </p>

        <p className="hero-subtitle">
          O projeto é composto por duas aplicações: uma API para o <strong>back-end</strong> e outra para o <strong>front-end</strong>.
        </p>

        <p className="hero-subtitle">
          <strong>Instituto Federal Sul-rio-grandense - PF/RS</strong>
        </p>

        <p className="hero-subtitle">
          <strong>Aluna:</strong> Helen Zanco Neis
        </p>
      </Container>
    </section>
  </div>
);

export default Sobre;
