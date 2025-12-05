import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function FormularioUsuario({ form, setForm, modo = 'completo' }) {
    const isLogin = modo === 'login';
    const isEdicao = form.codigo != null;

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };

    if (isLogin) {
        return (
            <div className="row g-3">
                <div className="col-12">
                    <Form.Group>
                        <Form.Label className="form-label-custom">
                            <i className="bi bi-at me-2"></i>Username
                        </Form.Label>
                        <Form.Control
                            className="form-control-custom"
                            type="text"
                            value={form.username || ''}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            placeholder="Digite o username"
                            maxLength={40}
                            required
                        />
                    </Form.Group>
                </div>
                <div className="col-12">
                    <Form.Group>
                        <Form.Label className="form-label-custom">
                            <i className="bi bi-lock me-2"></i>Senha
                        </Form.Label>
                        <Form.Control
                            className="form-control-custom"
                            type="password"
                            value={form.senha || ''}
                            onChange={(e) => setForm({ ...form, senha: e.target.value })}
                            placeholder="Digite a senha"
                            maxLength={40}
                            required
                        />
                    </Form.Group>
                </div>
            </div>
        );
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={12}>
                    <FloatingLabel controlId="txtNome" label="Nome" className="mb-3">
                        <Form.Control type="text" required name="nome"
                            value={form.nome || ''}
                            onChange={handleChange} placeholder="Informe o nome" />
                    </FloatingLabel>
                </Col>
                <Col xs={12} md={12}>
                    <FloatingLabel controlId="txtUsername" label="Username" className="mb-3">
                        <Form.Control type="text" required name="username"
                            value={form.username || ''}
                            onChange={handleChange} placeholder="Informe o username" />
                    </FloatingLabel>
                </Col>
                <Col xs={12} md={12}>
                    <FloatingLabel controlId="txtEmail" label="Email" className="mb-3">
                        <Form.Control type="email" required name="email"
                            value={form.email || ''}
                            onChange={handleChange} placeholder="Informe o email" />
                    </FloatingLabel>
                </Col>
                <Col xs={12} md={12}>
                    <FloatingLabel controlId="txtSenha" label="Senha" className="mb-3">
                        <Form.Control type="password" name="senha"
                            value={form.senha || ''}
                            onChange={handleChange} placeholder="Informe a senha" />
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>
    );
}

export default FormularioUsuario;