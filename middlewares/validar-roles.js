const { response } = require("express");
const { removeListener } = require("../models/rol");
const rol = require("../models/rol");


const esAdminRol = (req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { rol, nombre } = req.usuario;
    
    if ( rol !== 'ADMIN_ROL' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - NO puede hacer esto`
        });
    }

    next();
}

const tieneRol = ( ...rols ) => {
    return (req, res = response, next) => {
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if ( !rols.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ rols } `
            });
        }
    
        next();
    }
}


module.exports = {
    esAdminRol,
    tieneRol
}