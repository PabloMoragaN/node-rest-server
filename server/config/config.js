///// Archivo configuracion Global
/////=======================================
///// Puerto
/////===========================================

process.env.PORT = process.env.PORT || 3000;

////=============================
/// Entorno
////=============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

////=============================
/// BBDD
////=============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe-user:cafe1234@ds343985.mlab.com:43985/cafe';
}

//Nos inventamos un entorno
process.env.URLDB = urlDB;