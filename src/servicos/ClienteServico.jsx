export const getClientesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await response.json()
    return data;
}

export const getClientesPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteClientesPorCodigoAPI = async codigo=> {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clientes/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraClientesAPI = async (objeto, metodo) => {
    const url = metodo === "PUT" 
        ? `${process.env.REACT_APP_ENDERECO_API}/clientes/${objeto.codigo}`
        : `${process.env.REACT_APP_ENDERECO_API}/clientes`;
    
    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}