import { useContext } from 'react'
import ClientesContext from './ClientesContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getUsuario } from '../../../seguranca/Auth';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ClientesContext);
    
    let usuario = null;
    try { usuario = getUsuario(); }
    catch (error) { usuario = null; }
    
    const isAdmin = usuario && usuario.tipo === 'admin';

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{color: "#000000a1",fontWeight: "bold"}}>Clientes</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>

            {listaObjetos.length === 0 && <h1 style={{color: "#000000a1"}}>Nenhum cliente encontrado</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">

                                    <Button variant="info" onClick={() => editarObjeto(objeto)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    {isAdmin && (
                                        <Button variant="danger" onClick={() => { remover(objeto.codigo); }}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    )}
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.email}</td>
                                <td>{objeto.telefone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;