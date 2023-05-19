const config = require('./dbconfig.js');
const sql = require('mssql');
const Personaje = require('./personaje.js');

class personajeService {
    static getAllPersonajes = async () => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request().execute("getAllPersonajes");
            return result.recordset;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    static getPersonaje = async (nombre) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                            .input("pNombre", nombre)
                            .execute("getPersonajeByNombre");
            return result.recordset;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    static getPersonajexPeli = async (idmovie) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                            .input("pIdMovie", idmovie)
                            .execute("getPersonajeByIdMovie");
            return result.recordset;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    static crearPersonaje = async (personaje) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                                .input("pImagen", personaje.imagen)
                                .input("pNombre", personaje.nombre)
                                .input("pEdad", personaje.edad)
                                .input("pPeso", personaje.peso)
                                .input("pHistoria", personaje.historia)
                                .execute("insertPersonaje")
            return result.rowsAffected;
        } catch(e) {
            console.log(e);
            return e;
        }
    }

    static actualizarPersonaje = async (personaje) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                                .input("pId", personaje.id)
                                .input("pImagen", personaje.imagen)
                                .input("pNombre", personaje.nombre)
                                .input("pEdad", personaje.edad)
                                .input("pPeso", personaje.peso)
                                .input("pHistoria", personaje.historia)
                                .execute("updatePersonaje")
            return result.rowsAffected;
        } catch(e) {
            console.log(e);
            return e;
        }
    }

    static eliminarPersonaje = async (id) => {
        let conn = await sql.connect(config);
        try {
            let result = await conn.request()
                                .input("pId", id)
                                .execute("deletePersonaje")
            return result.rowsAffected;
        } catch(e) {
            console.log(e);
            return e;
        }
    }
}

module.exports = personajeService;