import { useState, useEffect } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { listarUsuarios, criarUsuario, atualizarUsuario, removerUsuario } from '../../../servicos/UsuarioServico';
import FormularioUsuario from './Formulario';
import Alerta from '../../comuns/Alerta';
import { getUsuario } from '../../../seguranca/Auth';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [usuarioEdicao, setUsuarioEdicao] = useState(null);
    const [form, setForm] = useState({ nome: '', username: '', email: '', senha: '', tipo: 'comum' });
    const [alerta, setAlerta] = useState({ status: '', message: '' });
    const [carregando, setCarregando] = useState(false);
    
    let usuario = null;
    try { usuario = getUsuario(); }
    catch (error) { usuario = null; }
    
    const isAdmin = usuario && usuario.tipo === 'admin';

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            const response = await listarUsuarios();
            if (response && response.objeto) {
                setUsuarios(response.objeto);
            }
        } catch (error) {
            setAlerta({ status: 'danger', message: 'Erro ao carregar usuários: ' + error.message });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setAlerta({ status: '', message: '' });

        try {
            if (usuarioEdicao) {
                const response = await atualizarUsuario({ ...form, codigo: usuarioEdicao.codigo });
                if (response && response.objeto) {
                    setAlerta({ status: 'success', message: 'Usuário atualizado com sucesso!' });
                }
            } else {
                const response = await criarUsuario(form);
                if (response && response.objeto) {
                    setAlerta({ status: 'success', message: 'Usuário criado com sucesso!' });
                }
            }
            
            await carregarUsuarios();
            handleCloseModal();
        } catch (error) {
            setAlerta({ status: 'danger', message: error.message || 'Erro ao salvar usuário' });
        } finally {
            setCarregando(false);
        }
    };

    const handleEdit = (usuario) => {
        setUsuarioEdicao(usuario);
        setForm({
            nome: usuario.nome,
            username: usuario.username,
            email: usuario.email,
            senha: '',
            tipo: usuario.tipo
        });
        setShowModal(true);
    };

    const handleDelete = async (codigo) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await removerUsuario(codigo);
                setAlerta({ status: 'success', message: 'Usuário removido com sucesso!' });
                await carregarUsuarios();
            } catch (error) {
                setAlerta({ status: 'danger', message: 'Erro ao remover usuário: ' + error.message });
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setUsuarioEdicao(null);
        setForm({ nome: '', username: '', email: '', senha: '', tipo: 'comum' });
        setAlerta({ status: '', message: '' });
    };

    const handleNewUser = () => {
        setUsuarioEdicao(null);
        setForm({ nome: '', username: '', email: '', senha: '', tipo: 'comum' });
        setShowModal(true);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{color: "#000000a1",fontWeight: "bold"}}>Usuários</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={handleNewUser}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {usuarios.length === 0 && <h1 style={{color: "#000000a1"}}>Nenhum usuário encontrado</h1>}
            {usuarios.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.codigo}>
                                <td align="center">
                                    <Button variant="info" onClick={() => handleEdit(usuario)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    {isAdmin && (
                                        <Button variant="danger" onClick={() => handleDelete(usuario.codigo)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    )}
                                </td>
                                <td>{usuario.codigo}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuário</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {alerta.status && <Alert variant={alerta.status}>{alerta.message}</Alert>}
                        <FormularioUsuario
                            form={form}
                            setForm={setForm}
                            modo="completo"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="submit" disabled={carregando}>
                            Salvar <i className="bi bi-save"></i>
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default Usuarios;