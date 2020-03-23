const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const Producto = require('../models/producto');
const app = express();
const camposCategoria = 'descripcion';
const camposUsuario = 'nombre email role';


// ==============================
// Muestrar todos los productos
// ==============================
app.get('/producto', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    desde = Number(desde);
    limite = Number(limite);

    Producto.find({ disponible: true })
        .sort('nombre')
        .populate('categoria', camposCategoria)
        .populate('usuario', camposUsuario)
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.count({ disponible: true }, (err, cantidad) => {
                res.json({
                    ok: true,
                    productos,
                    cantidad
                });
            });
        });
});

// ==============================
// Muestrar producto x id
// ==============================
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('categoria', camposCategoria)
        .populate('usuario', camposUsuario)
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB || productoDB.disponible === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        })
});

// ============================
// Buscar productos
// ============================
app.get('/producto/buscar/:criterio', verificaToken, (req, res) => {
    let criterio = req.params.criterio;
    let regex = new RegExp(criterio, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', camposCategoria)
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        })
});

// ============================
// Crear un nuevo producto
// ============================
app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoriaID,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo crear el nuevo producto'
                }
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});

// ============================
// Modificar un producto
// ============================
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    //  El metodo pick de underscore permite indicar que campos seran modificables del body que se recibe del request
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

// ============================
// Eliminar un producto
// ============================
app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB,
            message: `El producto ${productoDB.nombre} ha sido eliminado`
        });
    });
});

module.exports = app;