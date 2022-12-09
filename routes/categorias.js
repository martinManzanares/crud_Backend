const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualiarCategoria, 
        borrarCategoria} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/dbValidators');

const router = Router();

// POSTMAN: localhost:8080/api/categorias
// ENDPOINTS:.
// Obtener todas las categorias - publico.
router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria );

// Crear categoria - privado - cualquier persona con un token valido.
router.post('/', [
    validarJWT, 
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    validarCampos
    ], crearCategoria );

// Actualizar - privado - cualquiera con token valido.
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualiarCategoria );

// Borrar una categoria - ADMIN.
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);



module.exports = router;