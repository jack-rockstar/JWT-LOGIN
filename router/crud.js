const router=require('express').Router()

const dota=require('../models/Dota')

//leer datos de la base de datos
router.get('/', async (req,res)=>{
    try {
        const arrayDota= await dota.find()
        res.json({
            error:null,
            data:{
                title:'Mis datos',
                arrayDota
            }
        })

    } catch (error) {
        console.log(error)
    }
})

//Sirve para poder guardar los datos en la base de datos
router.post('/', async (req,res)=>{
    
    const body=req.body

    try {
        let heroedb=new dota(body)
        await heroedb.save()
        res.json({
            error:null,
            data:heroedb
        })
    } catch (error) {
        console.log(error)
    }
})

//sirve para eliminar el heroe
router.delete('/:id', async (req,res)=>{
    const id=req.params.id
    try {
        let heroedb=await dota.findOneAndDelete({_id: id})
        if(heroedb) res.json({error:null, mensaje:'heroe eliminado' })
        
    } catch (error) {
        console.log(error)
        res.json({error:true, mensaje:'Fallo al eliminar'})
    }
})

//Para Actualizar un dato de la base de datos
router.put('/:id', async (req,res)=>{
    const id=req.params.id
    const body=req.body
    try {
        let heroedb=await dota.findByIdAndUpdate(id,body)
        res.json({error:null, mensaje:'Heroe actualizado'})
    } catch (error) {
        console.log(error)
        res.json({error:true, mensaje:'No se encontro el id seleccionado'})
    }
})





module.exports=router