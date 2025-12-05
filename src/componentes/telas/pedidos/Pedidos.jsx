import { useState, useEffect } from 'react';
import PedidosContext from './PedidosContext';
import Tabela from './Tabela';
import {
    getPedidosAPI, getPedidosPorCodigoAPI,
    deletePedidosPorCodigoAPI, cadastraPedidosAPI
} from '../../../servicos/PedidoServico';
import Formulario from './Formulario';

function Pedidos() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "",
        data: "",
        codigo_cliente: "",
        codigo_servico: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "",
            data: "",
            codigo_cliente: "",
            codigo_servico: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async (objetoOuCodigo) => {
        let pedido;
        if (typeof objetoOuCodigo === 'object') {
            pedido = objetoOuCodigo;
        } else {
            pedido = await getPedidosPorCodigoAPI(objetoOuCodigo);
        }
        if (pedido.data) {
            const date = new Date(pedido.data);
            pedido.data = !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : "";
        }
        setObjeto(pedido);
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPedidosAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaPedidos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPedidos = async () => {
        setListaObjetos(await getPedidosAPI());
    }

    const remover = async codigo=> {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deletePedidosPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaPedidos();
        }
    }

    useEffect(() => {
        recuperaPedidos();
    }, []);

    return (
        <PedidosContext.Provider value={
            {
                setAlerta, listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
            }
        }>
            <Tabela/>
            <Formulario />
        </PedidosContext.Provider>
   )
}

export default Pedidos;