const express = require('express');
const dbconnect = require('./config');
const MaterialModel = require('./materialModel');
const app = express();
const router = express.Router();

router.get("/materials", async(req, res) => {
    const resposta = await MaterialModel.find({});
    res.send(resposta);
})
router.get("/materials/:id_num", async (req, res) => {
    const idn = req.params.id_num;
    const resposta = await MaterialModel.findOne({id_num:idn});
    res.send(resposta);
})

router.post("/materials", async (req, res) => {
    const body = req.body;
    const resposta = await MaterialModel.create(body)
    res.send(resposta);
})



router.put("/materials/:id_num",async (req,res)=>{
    const body = req.body;
    const idn = req.params.id_num;
    const resposta = await MaterialModel.findOneAndUpdate({id_num:idn}, body)
    res.send(resposta);
})

router.delete("/materials/:id_num", async (req, res) => {
    const idn = req.params.id_num;
    const resposta = await MaterialModel.deleteOne({id_num:idn});
    res.send(resposta);
})
app.use(express.json())
app.use(router);
app.listen(3001, () => {
    console.log("El servidor està en el port 3001");

})
dbconnect();