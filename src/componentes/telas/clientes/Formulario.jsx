import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ClientesContext from './ClientesContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(ClientesContext);
    console.log(objeto)
    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <form id="formulario" onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />

                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtNome" label="Nome" className="mb-3">
                                    <Form.Control type="text" required name="nome"

                                        value={objeto.nome}
                                        onChange={handleChange} placeholder="Informe o nome" />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txEmail" label="Email" className="mb-3">
                                    <Form.Control type="text" required name="email"
                                        value={objeto.email}
                                        onChange={handleChange} placeholder="Informe o e-mail" />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtTelefone" label="Telefone" className="mb-3">
                                    <Form.Control type="text" required name="telefone"
                                        value={objeto.telefone}
                                        onChange={handleChange} placeholder="Informe o telefone" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit">
                        Salvar  <i className="bi bi-save"></i>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default Formulario;