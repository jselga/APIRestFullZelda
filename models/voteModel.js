const mongoose = require('mongoose');
const voteSchema = new mongoose.Schema(
    {
        id_num: { type: Number, required: true },
        user_id: { type: String, required: true },
        value: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
const VoteModel = mongoose.model("votes",voteSchema);
module.exports = VoteModel;