const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    temp: {
        type: String,
        required: true
    }
});

// We will create a new collection
const Api = new mongoose.model("Api", apiSchema);
module.exports = Api;