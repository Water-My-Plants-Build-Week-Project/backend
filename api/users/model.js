const db = require('../../data/db-config.js')

function find() { //this is for the user get endpoint only accessible with sessions (all users are displayed)
    return db('users as u')
        .join('plants as p', 'u.user_id', 'p.user_id')
        .select('u.username', 'p.nickname', 'p.species')
        .orderBy('u.username')
}

function findBy(filter) { // an array with all the users that match that filter
    return db('users').where(filter).orderBy('user_id')
}

function findById(user_id) { // returns the user by id 
    return db('users').where({user_id}).first()
}

async function add(user) { // user register post endpoint 
    const [userID] = await db('users').insert(user, 'user_id');
    return findById(userID)
}

function update(id, user) { // updates user object put endpoint
    return db('users')
      .where('id', Number(id))
      .update(user);
}

module.exports = { add, find, findBy, findById, update };