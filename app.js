const express = require('express');
const dbconnect = require('./config');

const materialsRouter = require("./routes/materials.js");
const app = express();

const cors = require('cors')
app.use(cors());
app.use(express.json());




app.use("/materials",materialsRouter);
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`El servidor està en el port ${PORT}`);

})
dbconnect();