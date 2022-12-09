
const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'Rol Obligatorio']
    }
});


module.exports = model( 'Rol', RolSchema);