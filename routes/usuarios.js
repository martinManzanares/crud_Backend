const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/dbValidators');


const { usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPost );


router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );



module.exports = router;