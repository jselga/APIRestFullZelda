const express = require("express");
const MonsterModel = require("../models/monsterModel");

const router = express.Router();
const msgError404 = "Monstruo no encontrado";
const msgErrorSrv = "Error del servidor";
const msgErrorCreate= "Error al crear monstruo"
const msgOkDelete ="Monstruo eliminado correctamente";

router.get("/", async (req, res) => {
  try {
    const monsters = await MonsterModel.find();
    res.json(monsters);
  } catch (error) {
    res.status(500).json({ error: msgErrorSrv });
  }
});


router.get("/:id_num", async (req, res) => {
  try {
    const monster = await MonsterModel.findOne({ id_num: req.params.id_num });
    if (!monster) {
      return res.status(404).json({ error: msgError404 });
    }
    res.json(monster);
  } catch (error) {
    res.status(500).json({ error: msgErrorSrv });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMonster = await MonsterModel.create(req.body);
    res.status(201).json(newMonster);
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) {
      res.status(400).json({message: msgErrorCreate,error });
    }else{
      res.status(500).json({message: msgErrorSrv, error });
    }
    
    
  }
});


router.put("/:id_num", async (req, res) => {
  try {
    const updatedMonster = await MonsterModel.findOneAndUpdate(
      { id_num: req.params.id_num },
      {$set: req.body},
      { new: true, runValidators:true }
    );
    if (!updatedMonster) {
      return res.status(404).json({ error:msgError404 });
    }
    res.json(updatedMonster);
  } catch (error) {
    res.status(400).json({ error: msgErrorSrv });
  }
});


router.delete("/:id_num", async (req, res) => {
  try {
    const deletedMonster = await MonsterModel.findOneAndDelete({ id_num: req.params.id_num });
    if (!deletedMonster) {
      return res.status(404).json({ error: msgError404 });
    }
    res.json({ message:msgOkDelete });
  } catch (error) {
    res.status(500).json({ error: msgErrorSrv });
  }
});

module.exports = router;
