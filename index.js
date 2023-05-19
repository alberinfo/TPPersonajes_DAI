const express = require("express");
const cors = require("cors"); //Middleware
const {createAuth, validateAuth} = require("./login.js");
const personajeService = require("./personajeService.js");

const app = express();
app.use(express.json());
//app.use(cors());

app.get("/auth/login", async (req, res) => {
    res.send(createAuth());
})

const authChecker = async (req, res, next) => {
    if(validateAuth(req.body.authId)) next();
    else res.send("Auth failed!");
}

app.use(authChecker);

//Personajes
app.get("/characters", async (req, res) => {
    let result = await personajeService.getAllPersonajes();

    if(typeof req.query.name !== "undefined") { //if param exists
        result = result.filter(element => element.nombre == req.query.name);
    }

    if(typeof req.query.age !== "undefined") {
        result = result.filter(element => element.edad == req.query.age);
    }

    if(typeof req.query.movies !== "undefined") {
        let personajesxpeli = await personajeService.getPersonajexPeli(req.query.movies);
        console.log(result);
        result = personajesxpeli.filter(element => result.includes(element) === true);
    }

    res.send(JSON.stringify(result));
})

app.get("/character/:nombre", async (req, res) => {
    let result = await personajeService.getPersonaje(req.params.nombre);
    res.send(JSON.stringify(result));
})

app.post("/character", async (req, res) => {
    let result = await personajeService.crearPersonaje(req.body.personaje);
    res.send(JSON.stringify(result));
})

app.put("/character", async (req, res) => {
    let result = await personajeService.actualizarPersonaje(req.body.personaje);
    res.send(JSON.stringify(result));
})

app.delete("/character/:id", async (req, res) => {
    let result = await personajeService.eliminarPersonaje(req.params.id);
    res.send(JSON.stringify(result));
})

//Peliseries
app.get("/movies", async (req, res) => {

})

app.get("/movie", async (req, res) => {

})

app.post("/movie", async (req, res) => {

})

app.put("/movie", async (req, res) => {

})

app.delete("/movie", async (req, res) => {

})

app.listen(8080, 'localhost', () => {
    console.log("listening on port 8080");
})