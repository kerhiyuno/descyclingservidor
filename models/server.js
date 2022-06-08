const express = require('express');
const cors = require('cors');

const { dbconnection } = require ( '../controllers/connectMysql')

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 4000;
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        dbconnection();
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
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`El servidor esta funcionando en el puerto ${this.port}` );
        });
    }

}

module.exports = Server;
