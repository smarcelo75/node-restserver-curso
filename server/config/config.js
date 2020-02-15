// ====================
// Puerto
// ====================

process.env.PORT = process.env.PORT || 3000;

// ====================
// Entorno
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'Dev';

// =====================
// Vencimiento del token
// =====================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ========================
// Semilla de autenticación
// ========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

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

// ====================
// GOOGLE Client ID
// ====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '423167117508-ueatert8ppc9c818gkjsrr59epqma1tg.apps.googleusercontent.com';