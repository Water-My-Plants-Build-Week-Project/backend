const db = require('../../data/db-config.js')


function findUserPlants(username) { // this is for plants get endpoint user can see all their plants
    return db('plants as p')
        .join('users as u', 'p.user_id', 'u.user_id')
        .select('p.id', 'p.nickname', 'p.species', 'p.scientific_name', 'p.h2oFrequency')
        .where('u.username', username)
}

function addNewPlant(newPlant, username) { // post endpoint creates a new plant object
    return db('plants')
        .join('users as u', 'p.user_id', 'u.user_id')
        .insert(newPlant)
        .where('u.username', username)
        .then(ids => ({ id: ids[0] }))
}

function update(id, plant) { // put endpoint updates existing plant object
    return db('plants')
      .where({id})
      .update(plant);
}

function remove(id) { // delete endpoint deletes plant object
    return db('plants')
      .where({id})
      .del();
}



module.exports = { findUserPlants, addNewPlant, update, remove };

