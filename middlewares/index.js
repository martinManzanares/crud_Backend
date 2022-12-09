

const  validaCampos  = require('../middlewares/validar-campos');
const  validaJWT  = require('../middlewares/validar-jwt');
const  validaRols = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRols
}