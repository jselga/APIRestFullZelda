const mongoose = require('mongoose');
const monsterSchema = new mongoose.Schema(

    {
        category: { type: String, required: true },
        name: { type: String, required: true, unique: true },
        common_locations: { type: [String], default: [] },
        
        description: { type: String, required: true },
        drops : {type: [String], default:[]},
        id_num: { type: Number, unique: true, required: true },
        image: { type: String, required: false }
        
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
    const MonsterModel = mongoose.model("monsters",monsterSchema);
    module.exports = MonsterModel;
