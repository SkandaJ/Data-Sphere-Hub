const mongoose = require('mongoose');
const dash = new mongoose.Schema(
    {
        url: {
            type:String,
            required: true,
        },
        createdFor: {
            type: String,
            required:true,
            ref: "users",
        }
    }
);
const DASH = mongoose.model("dashboard", dash);
module.exports = DASH;
