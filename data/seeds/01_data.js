exports.seed = async function (knex) {
  await knex('plants').truncate()
  await knex('users').truncate()
  await knex('users').insert([
    { username: 'user1', password: '123A', phone_number: '321-123-4321' },
    { username: 'user2', password: '456B', phone_number: '407-567-1236' },
    { username: 'user3', password: '789C', phone_number: '501-111-0231' },
    { username: 'user4', password: '101112D', phone_number: '101-122-5688' },
    { username: 'user5', password: '131415D', phone_number: '321-111-2699' }
  ])
  await knex('plants').insert([
    {
      nickname: 'Tullie',
      species: 'Tulip', 
      scientific_name: 'Tulipa',
      h2oFrequency: 'once a week',
      img: '',
      user_id: 2
    },
    {
      nickname: 'Sunny',
      species: 'Sunflower', 
      scientific_name: 'Helianthus Annuus',
      h2oFrequency: 'once a week',
      img: '',
      user_id: 4
    },
    {
      nickname: 'Starlight',
      species: 'Marigold', 
      scientific_name: 'Tagetes',
      h2oFrequency: 'once a week',
      img: '',
      user_id: 5
    },
    {
      nickname: 'Lilypad',
      species: 'Lily', 
      scientific_name: 'Lilium',
      h2oFrequency: 'once a week',
      img: '',
      user_id: 3
    },
    {
      nickname: 'Pony',
      species: 'Peony', 
      scientific_name: 'Paeonia',
      h2oFrequency: 'every 10 to 14 days',
      img: '',
      user_id: 1
    }
  ])
}