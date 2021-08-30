const mongoose=require('mongoose')

const userSchema1=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:200
    },
    name1:{
        type:String,
        required:true,
        min:2,
        max:200
    },
    ability:{
        type:String,
        required:true,
        min:5,
        max:200
    },
    roll:{
        type:String,
        required:true,
        min:3,
        max:400
    }
})

module.exports=mongoose.model('Dota',userSchema1)