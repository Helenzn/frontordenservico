import { useState, useEffect } from 'react';
import ServicosContext from './ServicosContext';
import Tabela from './Tabela';
import {
    getServicosAPI, getServicosPorCodigoAPI,
    deleteServicosPorCodigoAPI, cadastraServicosAPI
} from '../../../servicos/ServicoServico';
import Formulario from './Formulario';

function Servicos() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", preco: 0.00, descricao: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            nome: "",
            preco: 0.00,
            descricao: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async (objetoOuCodigo) => {
        if (typeof objetoOuCodigo === 'object') {
            setObjeto(objetoOuCodigo);
        } else {
            setObjeto(await getServicosPorCodigoAPI(objetoOuCodigo));
        }
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraServicosAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaServicos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaServicos = async () => {
        setListaObjetos(await getServicosAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteServicosPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaServicos();
        }
    }

    useEffect(() => {
        recuperaServicos();
    }, []);

    return (
        <ServicosContext.Provider value={
            {
                setAlerta, listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
            }
        }>
            <Tabela />
            <Formulario/>
        </ServicosContext.Provider>
    )
}

export default Servicos;