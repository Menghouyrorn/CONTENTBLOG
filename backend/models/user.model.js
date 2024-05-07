const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports=User;

