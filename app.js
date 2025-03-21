require('dotenv').config();

const fs = require("fs");
const yaml = require("js-yaml");
const swaggerUi = require("swagger-ui-express");


const express = require('express');
const dbconnect = require('./config');
const http = require('http');
const {setupWebSocket} = require('./socket');

const materialsRouter = require("./routes/materials.js");
const monstersRouter = require("./routes/monsters.js");
const votesRouter = require("./routes/votes.js");
const app = express();
const server = http.createServer(app);
setupWebSocket(server);

const cors = require('cors')

const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());




app.use("/materials",materialsRouter);
app.use("/monsters",monstersRouter);
app.use("/votes",votesRouter)
const PORT = process.env.API_PORT || 3001
server.listen(PORT,"0.0.0.0", () => {
    console.log(`El servidor està en el port ${PORT}`);

})
dbconnect();