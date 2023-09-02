const { request, response } = require("express");
const axios = require('axios');

const getPeliculas = (req = request, res = request) => {
    const queryParam = req.query;
    res.json({name:'peliculas'});
}

const getPelicula = (req = request, res = request) => {
    const {id} = req.params;
    console.log(id);
    res.status(200).json({name:`Pelicula con id: ${id}`});
}


const getEstrenos = (req = request, res = request) => {
    res.json({name:'Estrenos'});
}

const getActores = (req = request, res = request) => {
    res.json({name:'Actores'});
}

const getOrigenNombre = (req = request, res = request) => {
    console.log(req.params);

    const { name } = req.params;

  /*axios.get(`https://api.nationalize.io/?name=${name}`)
    .then( (response)=> {
        console.log(response);
        res.status(200).json({
            status: response.status,
            statusText: response.statusText,
            data: response.data
        });
    }).catch... */

    //Se puede desestructurar el response en lo que te interesa y el json 
    //se queda solo con la parte izq porque es le mismmo dato
    axios.get(`https://api.nationalize.io/?name=${name}`)
    .then( ( { status, data, statusText } )=> {
        //handle success
        
        console.log(status, data, statusText);
        res.status(200).json({
            status,
            statusText,
            data
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(401).json({msg:'error inesperado'});
    });
    
}


module.exports = {
    getPeliculas,
    getEstrenos,
    getActores,
    getPelicula,
    getOrigenNombre
};