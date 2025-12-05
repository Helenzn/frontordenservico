import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import {
    FiHome,
    FiUsers,
    FiTool,
    FiFileText,
    FiInfo,
    FiClipboard,
} from 'react-icons/fi';
import './Menu.css';

function Menu() {
    return (
        <div>
            <Navbar expand="lg" className="custom-navbar shadow-sm">
                <Container>
                    <NavLink className="navbar-brand brand-title" to="/">
                        🩶 Sistema de Ordens de Serviço
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/">
                                <FiHome className="me-2" /> Início
                            </NavLink>

                            <NavDropdown
                                title={<><FiClipboard className="me-2" /> Ordens</>}
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
                            </NavDropdown>

                            <NavLink className="nav-link" to="/sobre">
                                <FiInfo className="me-2" /> Sobre
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Menu;
