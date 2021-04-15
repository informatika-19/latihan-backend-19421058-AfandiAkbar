const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose= require ('mongoose')

mongoose.connect('mongodb://localhost:27017/Latihan', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then (() => {
    console.log('Connect to DB')
}).catch((e)=>{
    console.log(e)
    console.log('Unconnected to DB')
})

app.use(bodyParser.json({
    extends: true,
    limit: '20mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
}))

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/profile/:username/:id', (req, res) =>{
    console.log(req.params)
    res.send('Username Anda ' + req.params.username)

})

app.get('/daerah/:namaDaerah/:id', (req, res) =>{
    const namaDaerah = req.params.namaDaerah
    const idDaerah = req.params.id
    res.send('Daerah Anda ' + namaDaerah + ' Id daerah = ' + idDaerah)

})

//app.post('/register',(req, res) =>{
    //console.log(req.body)
    //res.json(req.body)
//})

app.use('/user',require('./routes/User'))
app.use('/Kegiatan',require('./routes/Kegiatan'))

app.listen(3000, () =>{
    console.log('Server Started')
})