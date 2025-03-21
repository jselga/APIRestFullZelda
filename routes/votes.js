const express = require("express");
const VoteModel = require("../models/voteModel");

const router = express.Router();
const msgError404 = "Vot no trobat";
const msgErrorSrv = "Error del servidor";
const msgErrorCreate= "Error al emetre el vot"

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log("POST /votes body:", req.body);

    const newVote = await VoteModel.create(body);
    const total = await VoteModel.countDocuments({id_num: body.id_num});

    const {getIO}=require('../socket');
    getIO().emit('vote:update',{
        id_num: body.id_num,
        total,
    });
    res.status(201).json(newVote);
  } catch (error) {
    console.error("Error POST /votes:", error);
    res.status(400).json({ error: msgErrorCreate });
  }
}
);
module.exports = router;