const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
require('dotenv').config()


//con esto usamos express
const app= express()

//cors
const cors = require('cors')
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

//capturar body
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//conexion a base de datos
const uri=`mongodb://${process.env.USER}:${process.env.PASSWORD}@cluster0-shard-00-00.ewv87.mongodb.net:27017,cluster0-shard-00-01.ewv87.mongodb.net:27017,cluster0-shard-00-02.ewv87.mongodb.net:27017/${process.env.DBNAME}?ssl=true&replicaSet=atlas-azln5q-shard-0&authSource=admin&retryWrites=true&w=majority`
const option={useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri,option)

.then(()=> console.log('Base de datos conectada'))
.catch(e=> console.log('error db',e))



//importar rutas
const authRouter= require('./router/auth')
const validToken=require('./router/validate-token')
const admin=require('./router/admin')
const crud=require('./router/crud')



//router middleware
app.use('/api/user', authRouter)
app.use('/api/admin',validToken,admin)
app.use('/api/user/home', authRouter, validToken, crud)
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + "/public"));
/*app.get('/', (req,res)=>{
    res.json({
        estado:true,
        mensaje:'funciona!'
    })
}) */


//iniciar servidor
const PORT=process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log('servidor corriendo en:',PORT)
})

