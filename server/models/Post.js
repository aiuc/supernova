const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true,
        max:250
    },
    likes:{
        type:Array,
        default:[]
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Post", PostSchema);