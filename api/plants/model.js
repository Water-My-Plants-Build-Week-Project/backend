const db = require('../../data/db-config.js')

function find() {
    return db('plants as p')
        .join('users as u', 'p.user_id', 'u.user_id')
        .select('u.username', 'p.nickname', 'p.species')
        .orderBy('u.username')
}

function findByUsername(username) {
    return db('plants as p')
        .join('users as u', 'p.user_id', 'u.user_id')
        .select('u.username', 'p.nickname', 'p.species', 'p.scientific_name', 'p.h2oFrequency')
        .where(username)
}

async function add(plant) {
    const [plantID] = await db('plants').insert(plant, 'plants_id');
    return findByUsername(plantID)
}

  module.exports = { add, find, findByUsername };