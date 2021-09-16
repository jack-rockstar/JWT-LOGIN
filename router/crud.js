const router=require('express').Router()

const producto=require('../models/Articulo')

//leer datos de la base de datos
router.get('/', async (req,res)=>{
    try {
        const articulos= await producto.find()
        res.json({
            error:null,
            data:{
                title:'Mis datos',
                articulos
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
        let articulo=new producto(body)
        await articulo.save()
        res.json({
            error:null,
            data:articulo
        })
    } catch (error) {
        console.log(error)
    }
})

//sirve para eliminar el articulo
router.delete('/:id', async (req,res)=>{
    const id=req.params.id
    try {
        let articulo=await producto.findOneAndDelete({_id: id})
        if(articulo) res.json({error:null, mensaje:'articulo eliminado' })
        
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
        let articulo=await producto.findByIdAndUpdate(id,body)
        res.json({error:null, mensaje:'Articulo actualizado'})
    } catch (error) {
        console.log(error)
        res.json({error:true, mensaje:'No se encontro el id seleccionado'})
    }
})





module.exports=router