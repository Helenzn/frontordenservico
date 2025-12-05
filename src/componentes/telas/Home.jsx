import Container from 'react-bootstrap/Container';
import "./../../componentes/Menu.css";
import { FiHome } from 'react-icons/fi';

const Home = () => (
  <div>
    <section className="hero-section text-center">
      <Container>
        <h1 className="hero-title">
          <FiHome className="me-2" /> Simplifique suas Ordens de Serviço 🩶
        </h1>

        <p className="hero-subtitle">
          Gerencie <strong>clientes</strong>, <strong>serviços</strong> e <strong>ordens</strong> em um só lugar —
          com eficiência, clareza e confiança.
        </p>

        <img
          src="https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=1000&q=80"
          alt="Painel do Sistema de Ordens de Serviço"
          className="hero-image"
        />
      </Container>
    </section>
  </div>
);

export default Home;
