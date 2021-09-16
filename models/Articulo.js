const mongoose=require('mongoose')

const userSchema1=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:200
    },
    marca:{
        type:String,
        required:true,
        min:2,
        max:200
    },
    stock:{
        type:Number,
        required:true,
        min:1,
        max:200
    },
    precio:{
        type:Number,
        required:true,
        min:3,
        max:400
    }
})

module.exports=mongoose.model('Articulo',userSchema1)