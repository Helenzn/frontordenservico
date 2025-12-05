import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import FormularioUsuario from './telas/usuarios/Formulario.jsx';
import { login, getToken } from '../seguranca/Auth';
import { criarUsuario } from '../servicos/UsuarioServico.jsx';
import {
    FiHome,
    FiInfo,
} from 'react-icons/fi';
import './Menu.css';

function MenuPublico() {
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalRegistro, setShowModalRegistro] = useState(false);
    const [formLogin, setFormLogin] = useState({ username: "", senha: "" });
    const [formRegistro, setFormRegistro] = useState({ nome: "", username: "", email: "", senha: "" });
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarregando] = useState(false);
    const [autenticado, setAutenticado] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const body = { username: formLogin.username, senha: formLogin.senha };
            setCarregando(true);
            setAlerta({ status: "", message: "" });

            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.auth === false) {
                setAlerta({ status: "danger", message: data.message });
                return;
            }

            login(data);
            setShowModalLogin(false);
            setFormLogin({ username: "", senha: "" });
            setAutenticado(true);
        } catch (err) {
            setAlerta({ status: "danger", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        if (!formRegistro.nome || !formRegistro.username || !formRegistro.email || !formRegistro.senha) return;

        setCarregando(true);
        setAlerta({ status: "", message: "" });

        try {
            const response = await criarUsuario(formRegistro);

            if (response && response.objeto) {
                setAlerta({ status: "success", message: "Usuário criado com sucesso! Você pode fazer login agora." });
                setFormRegistro({ nome: "", username: "", email: "", senha: "" });
                setTimeout(() => {
                    setShowModalRegistro(false);
                    setShowModalLogin(true);
                }, 1500);
            } else {
                setAlerta({ status: "danger", message: "Erro ao criar usuário. Verifique os dados e tente novamente." });
            }
        } catch (error) {
            setAlerta({ status: "danger", message: error.message || "Erro ao criar usuário" });
        } finally {
            setCarregando(false);
        }
    };

    const handleCloseLogin = () => {
        setShowModalLogin(false);
        setFormLogin({ username: "", senha: "" });
        setAlerta({ status: "", message: "" });
    };

    const handleCloseRegistro = () => {
        setShowModalRegistro(false);
        setFormRegistro({ nome: "", username: "", email: "", senha: "" });
        setAlerta({ status: "", message: "" });
    };

    if (autenticado === true) return <Navigate to="/admin" />;

    return (
        <>
            <Navbar expand="lg" className="custom-navbar shadow-sm">
                <Container>
                    <NavLink className="navbar-brand brand-title" exact="true" to="/">
                        🩶 Sistema de Ordens de Serviço
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" exact="true" to="/">
                                <FiHome className="me-2" /> Início
                            </NavLink>
                            <NavLink className="nav-link" exact="true" to="/sobre">
                                <FiInfo className="me-2" /> Sobre
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <span className="nav-link active mx-2" style={{ cursor: 'pointer' }} onClick={() => setShowModalLogin(true)} >
                                <span style={{ color: 'white', fontWeight: 'bold' }}>Entrar</span>
                            </span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={() => setShowModalRegistro(true)} >
                                <span style={{ color: 'white', fontWeight: 'bold' }}>Registrar</span>
                            </span>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal de Login */}
            <Modal show={showModalLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-box-arrow-in-right me-2"></i>Login de usuário</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleLogin}>
                    <Modal.Body>
                        {alerta.status && <Alert variant={alerta.status}>{alerta.message}</Alert>}
                        <FormularioUsuario
                            form={formLogin}
                            setForm={setFormLogin}
                            modo="login"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit" disabled={carregando}>
                            <i className="bi bi-box-arrow-in-right me-2"></i>{carregando ? 'Entrando...' : 'Efetuar login'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={showModalRegistro} onHide={handleCloseRegistro}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="bi bi-person-plus me-2"></i>Registrar novo usuário</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleRegistro}>
                    <Modal.Body>
                        {alerta.status && <Alert variant={alerta.status}>{alerta.message}</Alert>}
                        <FormularioUsuario
                            form={formRegistro}
                            setForm={setFormRegistro}
                            modo="completo"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit" disabled={carregando}>
                            <i className="bi bi-person-plus me-2"></i>{carregando ? 'Registrando...' : 'Registrar'}</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Outlet />
        </>
    );
}

export default MenuPublico;