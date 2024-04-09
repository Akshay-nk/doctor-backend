require('dotenv').config();
const express = require('express')
const cors = require('cors') 
 const router = require('./Rourer/router')
require('./DB/connection')


//create express server

const bookapp = express()

//data sharing
bookapp.use(cors())
//parse json
bookapp.use(express.json())

bookapp.use(router)
// bookapp.use('/uploads',express.static('./uploads'))

const PORT =4000 || process.env.PORT

bookapp.listen(PORT, () => {
  console.log(`Doctor App started running at port:${PORT} and waiting for the client request!`);
})

bookapp.get( '/', (req , res) =>{

    res.send('<h1>Project  Fair Server started and waiting for the client request!!!</h1>');

})

bookapp.post('/' , (req ,res)=>{
    res.send('post request')
})