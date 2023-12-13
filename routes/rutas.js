const { Router } = require('express');
const { getPeliculas, getPelicula, getPeliculasByGenero } = require('../controllers/peliculas');

const rutas = Router();


rutas.get('/peliculas/:page', (req, res) => {
    const genero = req.query.genero;

    if(genero){
        getPeliculasByGenero(req, res);
    } else {
        getPeliculas(req, res);
    }
});
rutas.get('/pelicula/:id', getPelicula);


module.exports = rutas;