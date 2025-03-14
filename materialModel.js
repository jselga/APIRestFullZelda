const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        name: { type: String, required: true, unique: true },
        common_locations: { type: [String], default: [] },
        cooking_effect: { type: String, default: "" },
        description: { type: String, required: true },
        hearts_recovered: { type: Number, required: true },
        id_num: { type: Number, unique: true, required: true },
        image: { type: String, required: false }
        
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
const MaterialModel = mongoose.model("materials", materialSchema);
module.exports = MaterialModel;