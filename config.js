
const mongoose = require('mongoose');
const url = process.env.MONGO_SRV_URL||"mongodb://localhost:27017/zelda_botw";
const  dbconnect = async() => {
    try {
        await mongoose.connect(url);
        console.log("✅ Connexió correcta a MongoDB!");
    } catch (error) {
        console.error("❌ Error de connexió:", error);
    }
}

module.exports = dbconnect;