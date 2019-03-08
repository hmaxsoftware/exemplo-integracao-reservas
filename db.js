const db = require('node-localdb')

/**
 * 
 * @param {string} table 
 */
function get(table) {
    return db(`./dados/${table}.json`)
}

/**
 * @param {string} table
 * @param {object} newData 
 * @param {object} criteria
 */
async function update(table, newData, criteria) {
    const dao = get(table)

    let entity = await dao.findOne(criteria || {})

    const newEntity = !entity
    if (newEntity) entity = {}
    
    for (const key in newData) {
        entity[key] = newData[key]
    }

    if (newEntity) return dao.insert(entity)
    return dao.update({}, entity)
}

module.exports = {
    get: get,
    update: update
}