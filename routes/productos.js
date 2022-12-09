const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        actualiarProducto, 
        borrarProducto } = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/dbValidators');

const router = Router();

// POSTMAN: localhost:8080/api/categorias
// ENDPOINTS:.
// Obtener todos los productos - publico.
router.get('/', obtenerProductos );

// Obtener un producto por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );

// Crear producto - privado - cualquier persona con un token valido.
router.post('/', [
    validarJWT, 
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
    ], crearProducto );

// Actualizar producto - privado - cualquiera con token valido.
router.put('/:id',[
    validarJWT,
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualiarProducto );

// Borrar un producto - ADMIN.
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );


module.exports = router;