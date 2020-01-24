// ====================
// Puerto
// ====================

process.env.PORT = process.env.PORT || 3000;

// ====================
// Entorno
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'Dev';

// ====================
// Base de datos
// ====================

let urlDB;

if (process.env.NODE_ENV === 'Dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

//  Creamos una variable de entorno para almacenar la cadena de conexión
process.env.URLDB = urlDB;