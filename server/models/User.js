const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:3,
        max:20,
    },
    username:{
      type:String,
      require:true,
      min:3,
      max:20,
      unique:true
    },
    email:{
      type:String,
      require:true,
      max:50,
      unique:true
    },
    password:{
      type:String,
      require:true,
      min:6
    },
    profilePicture:{
      type:String,
      default:""
  },
    followers:{ //contient une array list avec les id des abonnés de l'user
        type:Array,
        default:[]
    },
    following:{ //contient une array list avec les id des abonnements de l'user
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
      type:String,
      max:50
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);