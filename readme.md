## api de consumo de TMDB

es una api que consume la api de [TMDB](https://www.themoviedb.org/) para levantarlo en un servidor en render   

rutas hechas hasta ahora:  
    la raiz : https://proyecto-labo4.onrender.com

- Lista de registros:  
    te devulve el discover de peliculas  
    `/peliculas`  

- Busqueda por id:  
    te devuelve Details de la pelicula  
    `/pelicula/{id}`

 - Lista de peliculas relacionadas por id:  
   `/pelicula/{id}/relacionadas`

- Lista de peliculas por genero:  
    **los generos tienen que estar con la primer letra en mayuscula**  
    te devuelve una lista de peliculas filtrada por genero  
    `/peliculas?genero={genero}`

 
