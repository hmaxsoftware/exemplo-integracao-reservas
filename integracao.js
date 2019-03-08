const db = require('./db')
const { ReservaOnlineClient } = require('@hmaxsoftware/sdk-reservas')

async function getTiposApto(req, res) {
    try {
        // Pegar credenciais
        const cfg = await db.get('cfg').findOne({}) || {}

        // Enviar novas URLs para a API da HMAX
        const client = new ReservaOnlineClient(cfg.token || '', cfg.user || '', cfg.password || '')
        const result = await client.getTiposApto()

        // Salvar tipos localmente - Apaga os anteriores e reinsere os novos
        await db.update('cfg', {aptos: result})

        // Devolver resposta para interface
        res.json({success: true, list: result})
    } catch (error) {
        console.error(error)
        res.status(error.statusCode || 500).json(error.data)
    }
}

async function getInventario(req, res) {
    try {
        const inicio = new Date(req.query.inicio)
        const fim = new Date(req.query.fim)

        // Pegar credenciais
        const cfg = await db.get('cfg').findOne({}) || {}

        // Consultar disponibilidade para o período solicitado
        const client = new ReservaOnlineClient(cfg.token || '', cfg.user || '', cfg.password || '')
        const result = await client.getInventario(inicio, fim)

        // Salvar tipos localmente - Apaga os anteriores e reinsere os novos
        // await db.update('cfg', {aptos: result})

        // Devolver resposta para interface
        res.json({success: true, list: result})
    } catch (error) {
        console.error(error)
        res.status(error.statusCode || 500).json(error.data)
    }
}

async function setCredenciais(req, res) {
    await db.update('cfg', req.body)
    res.json({success: true})
}

async function setCfgIntegrador(req, res) {
    try {
        // Pegar credenciais
        const cfg = await db.get('cfg').findOne({}) || {}

        // Enviar novas URLs para a API da HMAX
        const client = new ReservaOnlineClient(cfg.token || '')
        const result = await client.setCfgIntegrador(req.body)

        // Salvar URLs localmente
        await db.update('cfg', req.body)

        // Devolver resposta para interface
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(error.statusCode || 500).json(error.data)
    }
}

module.exports = {
    getTiposApto: getTiposApto,
    getInventario: getInventario,
    setCredenciais: setCredenciais,
    setCfgIntegrador: setCfgIntegrador
}