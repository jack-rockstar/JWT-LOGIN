const router=require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

//metodo importar
const User=require('../models/User')

//validaciones
const Joi=require('@hapi/joi')
const schemaRegister= Joi.object({
    name:Joi.string().min(6).max(255).required(),
    email:Joi.string().min(6).max(255).required().email(),
    password:Joi.string().min(6).max(255).required()
})

const schemaLogin=Joi.object({
    email:Joi.string().min(6).max(255).required().email(),
    password:Joi.string().min(6).max(255).required()
})

router.post('/login', async (req,res)=>{
   //validaciones para el login 
   const {error}=schemaLogin.validate(req.body)
   if(error)return res.status(400).json({error: error.details[0].message})

   const user= await User.findOne({email:req.body.email})
   if(!user) return res.status(400).json({error:true, mensaje:'email no registrado'})

   const passCompare=await bcrypt.compare(req.body.password, user.password)
   if(!passCompare)return res.status(400).json({error: true , mensaje:'contraseña incorrecta'})

   const token=jwt.sign({
       name:user.name,
       id:user._id,
   },process.env.TOKEN_SECRET)

   res.header('auth-token',token).json({
       error:null,
       data:{token}
   })

})




router.post('/register', async (req,res)=>{
   //validaciones de usuario
   const {error}=schemaRegister.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

   const emailExist= await User.findOne({email:req.body.email})
   if(emailExist)return res.status(400).json({error: true, mensaje:'email registrado'})

   //hash de contraseña
   const salt=await bcrypt.genSalt(10)
   const password=await bcrypt.hash(req.body.password, salt) 

    const user= new User({
        name:req.body.name,
        email:req.body.email,
        password:password
    })
    try {
        //aqui guardamos el usuario
        const userDB= await user.save()
        res.json({
            error:null,
            data:userDB
        })
        
    } catch (error) {
        res.status(400).json(error)
    }
    
})


module.exports=router