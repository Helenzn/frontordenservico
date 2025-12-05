import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ServicosContext from './ServicosContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Formulario() {

   const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(ServicosContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Serviço</Modal.Title>
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
                                <FloatingLabel controlId="txPreco" label="Preço" className="mb-3">
                                    <Form.Control type="number" step="0.01" required name="preco"
                                        value={objeto.preco}
                                        onChange={handleChange} placeholder="Informe o preço" />
                                </FloatingLabel>
                            </Col>
                            <Col xs={12} md={12}>
                                <FloatingLabel controlId="txtDescricao" label="Descrição" className="mb-3">
                                    <Form.Control as="textarea" rows={3} required name="descricao"
                                        value={objeto.descricao}
                                        onChange={handleChange} placeholder="Informe a descrição" />
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