import { useContext } from 'react'
import ServicosContext from './ServicosContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getUsuario } from '../../../seguranca/Auth';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ServicosContext);
    
    let usuario = null;
    try { usuario = getUsuario(); }
    catch (error) { usuario = null; }
    
    const isAdmin = usuario && usuario.tipo === 'admin';

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{color: "#000000a1",fontWeight: "bold"}}>Serviços</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <h1 style={{color: "#000000a1"}}>Nenhum serviço encontrado</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
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
                                <td>{objeto.preco}</td>
                                <td>{objeto.descricao}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;