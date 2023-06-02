const config = require('./dbconfig.js');
const sql = require('mssql');
const Peliserie = require('./peliserie.js');

class peliserieService {
    static getAllPelis = async () => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request().execute("getAllPelicula");
            return result.recordset;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    static getPeli = async (titulo) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                            .input("pTitulo", titulo)
                            .execute("getPeliculaByNombre");
            return result.recordset;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    static crearPeli = async (peli) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                                .input("pImagen", peli.imagen)
                                .input("pTitulo", peli.titulo)
                                .input("pFechaCreado", peli.fechaCreado)
                                .input("pCalificacion", peli.calificacion)
                                .execute("insertPelicula")
            return result.rowsAffected;
        } catch(e) {
            console.log(e);
            return e;
        }
    }

    static actualizarPeli = async (peli) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                                .input("pId", peli.id)
                                .input("pTitulo", peli.titulo)
                                .input("pFechaCreado", peli.fechaCreado)
                                .input("pCalificacion", peli.calificacion)
                                .execute("updatePelicula")
            return result.rowsAffected;
        } catch(e) {
            console.log(e);
            return e;
        }
    }

    static eliminarPeli = async (id) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                                .input("pId", id)
                                .execute("deletePelicula")
            return result.rowsAffected;
        } catch(e) {
            console.log(e);
            return e;
        }
    }
}

module.exports = peliserieService;