const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:200
    },
    email:{
        type:String,
        required:true,
        min:8,
        max:200
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:200
    },
    data:{
        type:Date,
        default:Date.snow,
        
    }
})

module.exports=mongoose.model('User', userSchema)
