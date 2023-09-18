const { Router } = require('express');
const { getActores } = require('../controllers/demo');


const rutas = Router();

rutas.get('/actores', getActores);


module.exports = rutas;