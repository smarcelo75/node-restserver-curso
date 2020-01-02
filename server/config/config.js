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
    urlDB = 'mongodb+srv://marceserrano:1NjxlRpk5ncGn5Qd@clustermarce-qh0u7.mongodb.net/cafe';
}

//  Creamos una variable de entorno para almacenar la cadena de conexión
process.env.URLDB = urlDB;