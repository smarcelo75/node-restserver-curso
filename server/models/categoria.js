const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categoriaSchema = Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);