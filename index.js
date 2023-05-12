const express = require("express");
const cors = require("cors"); //Middleware

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
    console.log("listening on port 8080");
})