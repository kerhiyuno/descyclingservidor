const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 4000;
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.categoriasPath, require('../routes/categorias'));
        this.app.use( this.productosPath, require('../routes/productos'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`El servidor esta funcionando en el puerto ${this.port}` );
        });
    }

}

module.exports = Server;
