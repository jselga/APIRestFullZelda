const express = require("express");
const VoteModel = require("../models/voteModel");

const router = express.Router();
const msgError404 = "Vot no trobat";
const msgErrorSrv = "Error del servidor";
const msgErrorCreate = "Error al emetre el vot"

router.get("/", async (req, res) => {
  try {
    const totalVotes = await VoteModel.aggregate([
      {
    $group: {
      _id: "$id_num",
        total: { $sum: "$value" }
    }
  },
  {

    $project: {
      id_num: "$_id",
        total: 1,
          _id: 0
    }
  }]);
  res.json(totalVotes);
} catch (error) {
  console.error("Error GET /votes:", error);
  res.status(500).json({ error: "Error al recuperar les dades de vots" });
}


});
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log("POST /votes body:", req.body);

    const newVote = await VoteModel.create(body);
// Versió simplificada amb countDocuments, en aquest cas es compten quantes vegades ha votat un usuari 
// independentment del valor del vot
    // const total = await VoteModel.countDocuments({ id_num: body.id_num });
    
 const total = await VoteModel.aggregate([
  {$match:{id_num:body.id_num}},
  {
    $group: {
      _id: "$id_num",
      total: { $sum: "$value" }
    }
  },
  {
    $project: {
      id_num: "$_id",
      total: 1,
      _id: 0
    }
  }
 ]);
    const { getIO } = require('../socket');
    getIO().emit('vote:update', {
      id_num: body.id_num,
      // en el cas de fer servir CountDoucments
      // total: total,
      total: total[0].total,
    });
    res.status(201).json(newVote);
  } catch (error) {
    console.error("Error POST /votes:", error);
    res.status(400).json({ error: msgErrorCreate });
  }
}
);
module.exports = router;