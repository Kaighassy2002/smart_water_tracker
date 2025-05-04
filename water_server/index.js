require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

const waterServer = express()


waterServer.use(cors())
waterServer.use(express.json())
waterServer.use(router)



const PORT = 3000 || process.env.PORT

waterServer.listen(PORT,()=>{
    console.log(`Water Server start at port :${PORT}`);
})

waterServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">Water Server start and waiting for client Request!!!</h1>`)
})

