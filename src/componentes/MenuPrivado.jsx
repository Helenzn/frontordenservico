import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Modal, Button, Alert } from 'react-bootstrap';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Auth.jsx';
import { atualizarUsuario } from '../servicos/UsuarioServico.jsx';
import FormularioUsuario from './telas/usuarios/Formulario.jsx';
import {
    FiHome,
    FiUsers,
    FiTool,
    FiFileText,
    FiInfo,
    FiClipboard,
    FiSettings,
} from 'react-icons/fi';
import './Menu.css';

function MenuPrivado() {
    const [showModalEditarUsuario, setShowModalEditarUsuario] = useState(false);
    const [formUsuario, setFormUsuario] = useState({ nome: '', username: '', email: '', senha: '' });
    const [alerta, setAlerta] = useState({ status: '', message: '' });
    const [carregando, setCarregando] = useState(false);

    let usuario = null;
    try { usuario = getUsuario(); }
    catch (error) { usuario = null; }

    if (!usuario) return <Navigate to="/" replace />;

    const handleEditarUsuario = () => {
        setFormUsuario({
            nome: usuario.nome,
            username: usuario.username,
            email: usuario.email,
            senha: ''
        });
        setShowModalEditarUsuario(true);
    };

    const handleSalvarUsuario = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setAlerta({ status: '', message: '' });

        try {
            const response = await atualizarUsuario({ ...formUsuario, codigo: usuario.codigo });
            if (response && response.objeto) {
                setAlerta({ status: 'success', message: 'Dados atualizados com sucesso!' });
                setTimeout(() => {
                    setShowModalEditarUsuario(false);
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            setAlerta({ status: 'danger', message: error.message || 'Erro ao atualizar dados' });
        } finally {
            setCarregando(false);
        }
    };

    const handleCloseModal = () => {
        setShowModalEditarUsuario(false);
        setFormUsuario({ nome: '', username: '', email: '', senha: '' });
        setAlerta({ status: '', message: '' });
    };

    return (
        <>
            <Navbar expand="lg" className="custom-navbar shadow-sm">
                <Container>
                    <NavLink className="navbar-brand brand-title" to="/admin">
                        🩶 Sistema de Ordens de Serviço
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/admin">
                                <FiHome className="me-2" /> Início
                            </NavLink>
                            <NavLink className="nav-link" to="sobre">
                                <FiInfo className="me-2" /> Sobre
                            </NavLink>

                            <NavDropdown
                                title={<><FiClipboard className="me-2" /> Sistema</>}
                                id="basic-nav-dropdown"
                            >
                                <NavLink className="dropdown-item" to="clientes">
                                    <FiUsers className="me-2" /> Clientes
                                </NavLink>
                                <NavLink className="dropdown-item" to="servicos">
                                    <FiTool className="me-2" /> Serviços
                                </NavLink>
                                <NavLink className="dropdown-item" to="pedidos">
                                    <FiFileText className="me-2" /> Ordens de Serviço
                                </NavLink>
                                {usuario && usuario.tipo === 'admin' && (
                                    <NavLink className="dropdown-item" to="usuarios">
                                        <i className="bi bi-people me-2" />Usuários
                                    </NavLink>
                                )}
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={usuario ? <span style={{ color: 'white' }}>Olá, <b>{usuario.nome}</b>!</span> : "Usuário"} id="user-nav-dropdown">
                            <span className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleEditarUsuario}>
                                <i className="bi bi-person-gear me-2"></i>Editar Usuário
                            </span>
                            <NavDropdown.Divider />
                            <NavLink className="dropdown-item" to="/" onClick={() => logout()}>
                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                            </NavLink>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal de Editar Usuário */}
            <Modal show={showModalEditarUsuario} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Meus Dados</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSalvarUsuario}>
                    <Modal.Body>
                        {alerta.status && <Alert variant={alerta.status}>{alerta.message}</Alert>}
                        <FormularioUsuario
                            form={formUsuario}
                            setForm={setFormUsuario}
                            modo="completo"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit" disabled={carregando}>
                            {carregando ? 'Salvando...' : 'Salvar'} <i className="bi bi-save"></i>
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Outlet />
        </>
    );
}

export default MenuPrivado;