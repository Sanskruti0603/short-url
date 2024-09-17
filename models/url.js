const mongoose = require('mongoose');
const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,
    },
    //an array -- inside array there will be objects

    visitHistory:[{
        timestamp:{
            type:Number
        }
    }],
    createdBy:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
},{timestamps:true});   

const URL = mongoose.model('url', urlSchema);
module.exports=URL;