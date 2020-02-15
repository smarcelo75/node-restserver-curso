// Obtiene la configuracion del puerto del archivo config
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const portNumber = process.env.PORT;
const path = require('path');

// Los siguientes middelware permiten parsear el body de la peticion. 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Se llama al configurador global de rutas
app.use(require('./routes/index'));

app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {

        if (err) throw err

        console.log('Servidor de base de datos MongoDB esta ONLINE');
    });

app.listen(portNumber, () => {
    console.log(`Servidor escuchando en puerto ${portNumber}`);
});