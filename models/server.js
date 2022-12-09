const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db_mongoose/configdb');
const { response } = require('express');



class Server {
    constructor(){  
        this.app = express();
        this.port = process.env.PORT;
        

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios'
        }
       
        
        // Conexion BD.
        this.conectarDB();
        // Middlewares. 
        this.middlewares();
        // Rutas de mi app.
        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares(){
        // CORS
        this.app.use( cors() );
        // Parseo y lectura del body.
        this.app.use( express.json() );
        // Directorio Publico.
        //this.app.use( express.static('public') );

    
        this.app.set('view engine', 'hbs');

        this.app.get('/', (req, res = response ) => {
            res.render('home');
        });
        this.app.get('/productos', ( req, res = response ) => {
            res.render('productos')
        });
        this.app.get('/categorias', ( req, res = response ) => {
            res.render('categorias')
        });
    
    }




    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server is running on port', this.port);
        });
    }
}


module.exports = Server;