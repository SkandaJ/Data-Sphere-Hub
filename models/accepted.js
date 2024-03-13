const mongoose = require('mongoose');
const accepted = new mongoose.Schema({
    developer: {
        type:String,
        required:true,
    },
    title: {
        type:String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    },
});
const Accepted = mongoose.model("accepted", accepted);
module.exports = Accepted;