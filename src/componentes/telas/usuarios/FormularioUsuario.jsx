import { Form } from 'react-bootstrap';

function FormularioUsuario({ form, setForm, modo = 'completo' }) {
    const isLogin = modo === 'login';
    const isEdicao = form.codigo != null;

    return (
        <>


            <div className={isLogin ? "row g-3" : "d-flex flex-column gap-3"}>
                {!isLogin && (
                    <Form.Group>
                        <Form.Label className="form-label-custom">
                            <i className="bi bi-person me-2"></i>Nome Completo
                        </Form.Label>
                        <Form.Control
                            className="form-control-custom"
                            type="text"
                            value={form.nome || ''}
                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                            placeholder="Digite o nome completo"
                            required
                        />
                    </Form.Group>
                )}

                <div className={isLogin ? "col-12" : ""}>
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

                {!isLogin && (
                    <Form.Group>
                        <Form.Label className="form-label-custom">
                            <i className="bi bi-envelope me-2"></i>E-mail
                        </Form.Label>
                        <Form.Control
                            className="form-control-custom"
                            type="email"
                            value={form.email || ''}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Digite o email"
                            required
                        />
                    </Form.Group>
                )}

                <div className={isLogin ? "col-12" : ""}>
                    <Form.Group>
                        <Form.Label className="form-label-custom">
                            <i className="bi bi-lock me-2"></i>Senha
                        </Form.Label>
                        <Form.Control
                            className="form-control-custom"
                            type="password"
                            value={form.senha || ''}
                            onChange={(e) => setForm({ ...form, senha: e.target.value })}
                            placeholder={isEdicao && !isLogin ? "Digite nova senha (opcional)" : "Digite a senha"}
                            maxLength={40}
                            required={!isEdicao}
                        />
                        {isEdicao && !isLogin && (
                            <Form.Text className="text-muted">Deixe em branco para manter a senha atual</Form.Text>
                        )}
                    </Form.Group>
                </div>
            </div>
        </>
    );
}

export default FormularioUsuario;