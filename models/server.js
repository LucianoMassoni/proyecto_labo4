const express = require('express'); 
const cors = require('cors');


class server{

    constructor(){
        this.port = process.env.PORT || 3000;
        
        this.app = express();

        // 1 en orden
        this.middleware();

        // 2 en orden
        this.routers();

    }

    middleware(){
        //probar alguna regla de restrición
        this.app.use(cors());

        //Cuando se usa un .use asociarlo a un middleware. ej. cors
        this.app.use(express.static('public'))
    }

    routers(){
        this.app.get('/', (req, res) => {
            res.send('Hello World')
          });

        this.app.use('/api/v1/demo', require('../routes/demo'));
        this.app.use('/api/v1/demo', require('../routes/actores'));

    }

    //cuando hay un middeleware 

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`App escuchando en el puerto ${this.port}`)
        });
    }
    
}

module.exports = server;