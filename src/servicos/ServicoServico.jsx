export const getServicosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/servicos`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await response.json()
    return data;
}

export const getServicosPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/servicos/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteServicosPorCodigoAPI = async codigo=> {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/servicos/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraServicosAPI = async (objeto, metodo) => {
    const url = metodo === "PUT" 
        ? `${process.env.REACT_APP_ENDERECO_API}/servicos/${objeto.codigo}`
        : `${process.env.REACT_APP_ENDERECO_API}/servicos`;
    
    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}