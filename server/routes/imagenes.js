const express = require('express');
const path = require('path');
const fs = require('fs');
const { verificaTokenImagen } = require('../middlewares/autenticacion');
let app = express();

app.get('/imagen/:tipo/:img', verificaTokenImagen, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let pathImagenOriginal = path.resolve(__dirname, '../assets/original.jpg');
        res.sendFile(pathImagenOriginal);
    }
});

module.exports = app;