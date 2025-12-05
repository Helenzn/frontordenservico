export const getPedidosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await response.json()
    return data;
}

export const getPedidosPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deletePedidosPorCodigoAPI = async codigo=> {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraPedidosAPI = async (objeto, metodo) => {
    const url = metodo === "PUT" 
        ? `${process.env.REACT_APP_ENDERECO_API}/pedidos/${objeto.codigo}`
        : `${process.env.REACT_APP_ENDERECO_API}/pedidos`;
    
    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}