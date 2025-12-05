import { getToken } from '../seguranca/Auth';

export const listarUsuarios = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json()
    return data;
};

export const obterUsuario = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios/${codigo}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json()
    return data;
};

export const criarUsuario = async (usuario) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar usuário');

    return data;
};

export const atualizarUsuario = async (usuario) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(usuario)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar usuário');

    return data;
};

export const removerUsuario = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuarios/${codigo}`,
        {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao remover usuário');

    return data;
};

export default { listarUsuarios, obterUsuario, criarUsuario, atualizarUsuario, removerUsuario };