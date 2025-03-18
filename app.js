const express = require('express');
const dbconnect = require('./config');

const materialsRouter = require("./routes/materials.js");
const monstersRouter = require("./routes/monsters.js");
const app = express();

const cors = require('cors')
app.use(cors());
app.use(express.json());




app.use("/materials",materialsRouter);
app.use("/monsters",monstersRouter);
const PORT = process.env.API_PORT || 3001
app.listen(PORT,"0.0.0.0", () => {
    console.log(`El servidor està en el port ${PORT}`);

})
dbconnect();