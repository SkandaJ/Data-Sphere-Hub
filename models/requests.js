const mongoose = require('mongoose');
const req = new mongoose.Schema({
    title:{
        type:String,
        requried:true,
    },
    file:{
        type: Buffer,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    developers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"dev",
    }
});

const REQ = mongoose.model("request", req);
module.exports = REQ;