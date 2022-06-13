const express = require('express')
const app= express()

const PORT = 4000
app.set('port', PORT)

app.get('/',(req,res) => {
    res.send('SERVIDOR DE ANDRES AMUCHASTEGUI')
})
app.listen(PORT, () => {
    console.log('Servidor crado en puerto: ' + app.get('port'))
})
