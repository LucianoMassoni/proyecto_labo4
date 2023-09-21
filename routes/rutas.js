const { Router } = require('express');
const { getPeliculas, getEstrenos, getPelicula, getPeliculasByGenero } = require('../controllers/peliculas');

const rutas = Router();


rutas.get('/peliculas', (req, res) => {
    const genero = req.query.genero;

    if(genero){
        getPeliculasByGenero(req, res);
    } else {
        getPeliculas(req, res);
    }
});
rutas.get('/pelicula/:id', getPelicula);
rutas.get('/estrenos', getEstrenos);


module.exports = rutas;