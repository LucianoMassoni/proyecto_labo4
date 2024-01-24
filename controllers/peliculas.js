const { request, response } = require("express");
const axios = require('axios');
const apiKey = process.env.APIKEY; 


const getPeliculas = (req = request, res = request) => {
  try {
    const { page } = req.params;

    axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          include_adult: false,
          include_video: false,
          language: 'es-AR',
          page: page,
          sort_by: 'popularity.desc',
          api_key: apiKey,
        },
      })
        .then( ( { status, data } ) => {
          res.status(status).json(data);
        })
  } catch (error) {
    res.status(error.status).json({
      error:error.status +" "+ error.statusText,
      message:error.status_message
    });
  }

}

const getPeliculasRelacionadas = (req = request, res = request) => {
  try {
    const { id } = req.params;
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      {
        params: {
          language: 'es-AR',
          page: 1,
          api_key: apiKey
        },
      })
        .then( ( { status, data } ) => {
          res.status(status).json(data);
        })
  } catch (error) {
    res.status(error.status).json({
      error:error.status +" "+ error.statusText,
      message:error.status_message
    });
  }

}

const getPelicula = (req = request, res = request) => {
    //cuando quiera pasar las cosas por url como peliculas?id=12 lo dejo solo y en el controller 
    //uso el  req.query en vez del req.params que es para usarlo como pelicula/12
    const { id } = req.params;
    console.log(id);
      
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: {
            language: 'es-AR',
            api_key: apiKey
          },
        })
        .then( ( { status, data } ) => {
          res.status(status).json(data);
        })
        .catch( ({response}) => {
          console.log("entro en el error");
          //console.error(error);
          res.status(response.status).json({
            error:response.status +" "+ response.statusText,
            message:response.data.status_message
          });
        });
}



const getGeneroId = (genero) => {
  return new Promise((resolve, reject) => {
    axios.get(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        params: {
          language: 'es-AR', 
          api_key: apiKey, 
        },
      }
    )
    .then(({ data }) => {
      const generoEncontrado = data.genres.find((genre) => genre.name === genero);
      if (generoEncontrado) {
        resolve(generoEncontrado.id);
      } else {
        reject({
          status: 404,
          statusText: 'Not Found',
          status_message: 'The genre you requested could not be found.',
        });
      }
    })
    .catch((error) => {
      reject(error);
    });
  });
};

const getPeliculasByGenero = async(req = request, res = request) => {
  try {
    const { page } = req.params;
    const { genero } = req.query; 
    const generoId = await getGeneroId(genero);
    console.log(generoId);

    axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          include_adult: false,
          include_video: false,
          language: 'es-AR',
          sort_by: 'popularity.desc',
          page:page,
          with_genres:generoId,
          api_key: apiKey,
          //original_lenguage: 'en'
        },
      })
        .then( ( { status, data } ) => {
          res.status(status).json(data);
        })
  } catch (error) {
    res.status(error.status).json({
      error:error.status +" "+ error.statusText,
      message:error.status_message
    });
  }

}


module.exports = {
    getPeliculas,
    getPelicula,
    getPeliculasByGenero,
    getPeliculasRelacionadas
};