require('dotenv').config()
require('./config/database')

const express = require ('express')
const Router = require ('./routes/routes')
const cors = require('cors')
const passport = require("passport")
const PORT = process.env.PORT || 4000
const app = express()


//middlewares
app.use(cors())
app.use(express.json())
app.use(passport.initialize()) // Inicio passport
app.use('/api', Router)
app.set('port',PORT)
app.get('/',(req,res)=>{
    res.send('SERVIDOR CREADO')
})


app.listen(PORT, () => {console.log('Server ready on PORT: ' + app.get('port'))
})