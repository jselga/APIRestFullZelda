const express = require('express');
const MaterialModel = require('../models/materialModel')


const router = express.Router();
const msgError404 = "Material no encontrado";
const msgErrorSrv = "Error del servidor";
const msgOkDelete ="Material eliminado correctamente";

router.get("/", async (req, res) => {
    try {
        const resposta = await MaterialModel.find({});
        res.send(resposta);
    } catch (error) {
        res.status(500).json({ message: msgErrorSrv });
    }
})
router.get("/:id_num", async (req, res) => {
    try {
        const idn = req.params.id_num;
        const resposta = await MaterialModel.findOne({ id_num: idn });
        if (!resposta) {
            return res.status(404).json({ message: msgError404 });
        }
        res.send(resposta); 
    } catch (error) {
        res.status(500).json({ message: msgErrorSrv });
    }
    
})
router.get("/name/:name",async (req,res)=>{
    try {
        const nom = req.params.name.toLowerCase(); 

        const resposta = await MaterialModel.findOne({ name: new RegExp(`^${nom}$`, "i") }); // Cerca insensible a majúscules

        if (!resposta) {
            return res.status(404).json({ message: msgError404 });
        }

        res.json(resposta);
    } catch (error) {
        res.status(500).json({ message: msgErrorSrv, error });
    }
})

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        const resposta = await MaterialModel.create(body);
        res.status(201).json(resposta);
    } catch (error) {
        res.status(500).json({ message: msgErrorSrv, error });
    }
 

})



router.put("/:id_num", async (req, res) => {
    try {
        const body = req.body;
        const idn = req.params.id_num;
        const resposta = await MaterialModel.findOneAndUpdate(
            { id_num: idn },
            { $set: body },
            { new: true, runValidators: true }
        )
        if (!resposta) {
            return res.status(404).json({ message: msgError404 });
        }
        res.send(resposta);
    } catch (error) {
        res.status(500).json({ message: msgErrorSrv });
    }
})

router.delete("/:id_num", async (req, res) => {
    try {
        const idn = req.params.id_num;
        const resposta = await MaterialModel.findOneAndDelete({ id_num: idn });

        if (!resposta) {
            return res.status(404).json({ message: msgError404 });
        }

        res.json({ message: msgOkDelete });
    } catch (error) {
        res.status(500).json({ message: msgErrorSrv, error });
    }
});
module.exports = router;


