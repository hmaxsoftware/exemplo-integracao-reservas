const db = require('./db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const integracao = require('./integracao')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static('node_modules/specre'))

app.set('view engine', 'pug')
app.set('views', './views')

function dateToStr(date) {
    var y = date.getFullYear().toString()
    var m = (date.getMonth() + 1).toString()
    var d = date.getDate().toString()
    if (m.length < 2) m = `0${m}`
    if (d.length < 2) d = `0${d}`
    return `${y}-${m}-${d}`
}

// Middleware para arquivos estáticos
app.get('/', async (req, res) => {
    const cfg = await db.get('cfg').findOne({}) || {}
    if (!cfg.aptos) cfg.aptos = []
    
    const now = new Date()
    cfg.inicio = dateToStr(now)
    cfg.fim = dateToStr(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30))

    res.render('index', cfg)
})

// Rotas AJAX
app.get('/getTiposApto', integracao.getTiposApto)
app.get('/getInventario', integracao.getInventario)
app.post('/setCredenciais', integracao.setCredenciais)
app.post('/setCfgIntegrador', integracao.setCfgIntegrador)

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})