const express = require("express");
const cors = require("cors"); //Middleware
const {createAuth, validateAuth} = require("./login.js");

const app = express();
app.use(express.json());
//app.use(cors());

app.get("/auth/login", (req, res) => {
    res.send(createAuth());
})

const authChecker = (req, res, next) => {
    if(validateAuth(req.body.authId)) next();
    else res.send("Auth failed!");
}

app.use(authChecker);

app.get("/", (req, res) => {
    res.send("LMAO");
})

app.listen(8080, 'localhost', () => {
    console.log("listening on port 8080");
})