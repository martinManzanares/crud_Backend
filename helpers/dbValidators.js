
const Rol = require('../models/rol');
const {Usuario, Categoria, Producto } = require('../models/');

const esRolValido = async ( rol = '' ) => {
    const existeRol = await Rol.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

const emailExiste = async ( correo = '' ) => {
    // Verificar si correo existe.
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya esta registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    // Verificar si usuario existe.
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El id: ${ id } no existe`);
    }
}

// Validador de categoria.
const existeCategoriaPorId = async ( id ) => {
    // Verificar si usuario existe.
    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`El id: ${ id } no existe`);
    }
}

// Validador de producto.
const existeProductoPorId = async ( id ) => {
    // Verificar si usuario existe.
    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
        throw new Error(`El id: ${ id } no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}