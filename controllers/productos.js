const { response } = require("express");
const { body } = require("express-validator");
const { Producto } = require('../models');

// obtenerProductos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    const [ total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number( desde ))
            .limit(Number( limite ))
    ]);
    
    res.json({
        total,
        producto
    });
}

// obtenerProducto - populate {}
const obtenerProducto = async (req, res = response ) => {
    const { id } = req.params.id;
    const producto = await Producto.findByOne({id:id})
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre')

    res.render('productos', {listaProductos: await Producto.find(), producto});
}

// crearProducto
const crearProducto = async (req, res = response) => {
    //Ignoramos estado, usuario por que ya vienen def.
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El Producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la DATA a guardar.
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    // Guardar en DB.
    await producto.save();

    res.status(200).json(producto);

}


// actualiarProducto
const actualiarProducto = async (req, res = response) => { 
    
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    
    if ( data.nombre ) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true });

    res.json( producto );
}

// borrarProducto - estado: false
const borrarProducto = async ( req, res = response) => {
    
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate( id, {estado: false}, {new:true});

    res.json( productoBorrado );
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualiarProducto,
    borrarProducto
}