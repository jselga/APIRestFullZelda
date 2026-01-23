require('dotenv').config();
const path= require('path');
// import { fileURLToPath } from 'url';
// const __filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);


const fs = require("fs");
const yaml = require("js-yaml");
const swaggerUi = require("swagger-ui-express");


const express = require('express');
const dbconnect = require('./config');

const materialsRouter = require("./routes/materials.js");
const monstersRouter = require("./routes/monsters.js");
const app = express();

const cors = require('cors')

const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(express.json());




app.use("/materials",materialsRouter);
app.use("/monsters",monstersRouter);
const PORT = process.env.API_PORT || 3001
app.listen(PORT,"0.0.0.0", () => {
    console.log(`El servidor està en el port ${PORT}`);

})
dbconnect();