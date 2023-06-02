const express = require("express");
const cors = require("cors"); //Middleware
const {createAuth, validateAuth} = require("./login.js");
const personajeService = require("./personajeService.js");
const peliserieService = require("./peliserieService.js");

let allPersonajes = [];
let allPelis = [];

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
    if(allPersonajes.length === 0) allPersonajes = await personajeService.getAllPersonajes();
    let result = allPersonajes;

    if(typeof req.query.name !== "undefined") { //if param exists
        result = result.filter(element => element.nombre == req.query.name);
    }

    if(typeof req.query.age !== "undefined") {
        result = result.filter(element => element.edad == req.query.age);
    }

    if(typeof req.query.movies !== "undefined") {
        let personajesxpeli = await personajeService.getPersonajexPeli(parseInt(req.query.movies));
        result = personajesxpeli.filter(element => result.some(x => x.id == element.id));
    }

    res.send(JSON.stringify(result));
})

app.get("/character/:nombre", async (req, res) => {
    if(allPersonajes.length === 0) allPersonajes = await personajeService.getAllPersonajes();
    
    let result = allPersonajes.find(personaje => personaje.nombre == req.params.nombre);

    res.send(JSON.stringify(result));
})

app.post("/character", async (req, res) => {
    allPersonajes.push(JSON.parse(req.body.personaje));
    
    let result = await personajeService.crearPersonaje(req.body.personaje);
    res.send(JSON.stringify(result));
})

app.put("/character", async (req, res) => {
    let idx = allPersonajes.indexOf(allPersonajes.filter(element => element.id == req.body.personaje.id));
    allPersonajes[idx] = JSON.parse(req.body.personaje);
    
    let result = await personajeService.actualizarPersonaje(req.body.personaje);
    res.send(JSON.stringify(result));
})

app.delete("/character/:id", async (req, res) => {
    let idx = allPersonajes.indexOf(allPersonajes.filter(element => element.id == req.body.personaje.id));
    allPersonajes.splice(idx, 1);

    let result = await personajeService.eliminarPersonaje(req.params.id);
    res.send(JSON.stringify(result));
})

//Peliseries
app.get("/movies", async (req, res) => {
    if(allPelis.length === 0) allPelis = await peliserieService.getAllPelis();
    let result = allPelis;

    if(typeof req.query.name !== "undefined") { //if param exists
        result = result.filter(element => element.nombre == req.query.name);
    }

    if(typeof req.query.order !== "undefined") {
        const comparerASC = (a, b) => {
            if (a.nombre == b.nombre) return 0;
            return a.nombre > b.nombre ? 1 : -1;
        }

        const comparerDESC = (a,b) => {
            return comparerASC(b,a);
        }

        if(req.query.order === "ASC") {
            result.sort(comparerASC)
        } else {
            result.sort(comparerDESC);
        }
    }

    res.send(JSON.stringify(result));
})

app.get("/movie/:nombre", async (req, res) => {
    if(allPelis.length === 0) allPelis = await peliserieService.getAllPelis();
    
    let result = allPelis.find(peli => peli.nombre == req.params.nombre);

    res.send(JSON.stringify(result));
})

app.post("/movie", async (req, res) => {
    allPelis.push(JSON.parse(req.body.peli));
    
    let result = await peliserieService.crearPeli(req.body.peli);
    res.send(JSON.stringify(result));
})

app.put("/movie", async (req, res) => {
    let idx = allPelis.indexOf(allPelis.filter(element => element.id == req.body.peli.id));
    allPelis[idx] = JSON.parse(req.body.peli);
    
    let result = await peliserieService.actualizarPeli(req.body.personaje);
    res.send(JSON.stringify(result));
})

app.delete("/movie", async (req, res) => {
    let idx = allPelis.indexOf(allPelis.filter(element => element.id == req.body.peli.id));
    allPelis.splice(idx, 1);

    let result = await peliserieService.eliminarPeli(req.params.id);
    res.send(JSON.stringify(result));
})

app.listen(8080, 'localhost', () => {
    console.log("listening on port 8080");
})