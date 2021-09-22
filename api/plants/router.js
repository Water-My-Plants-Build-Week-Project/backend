const express = require('express')
const router = express.Router()
const Plants = require('./model.js')


// ENDPOINTS

//GET /api/plants/:username
router.get('/:username', (req,res,next)=>{
    const {username} = req.params
    Plants.findUserPlants(username)
        .then(plants =>{
            console.log(plants)
            res.status(200).json(plants)
        })
        .catch(next)
})

//POST /api/plants/:username
router.post('/:username', (req,res)=>{ //have to add the user_id to the plant object so it is added to the user object
    const newPlant = req.body
    const {username} = req.params
    if(!newPlant.nickname || !newPlant.species || !newPlant.h2oFrequency){
        res.status(400).json({message: "Missing nickname, species, and/or h2oFrequency field"})
    }else {
        Plants.addNewPlant(newPlant, username)
            .then(plant =>{
                res.status(201).json(plant)
                console.log('New plant added: ',plant)
            })
            .catch(error => {
                res.status(500).json({
                  message: "There was an error while saving the plant to the database",
                });
                console.log(error)
              });
    }
})

//PUT /api/plants/:id
router.put('/:id', async (req,res) =>{
    const plant = req.body
    const {id} = req.params
    try{
      if(!plant.nickname || !plant.species){
          res.status(400).json({message: "Please provide a nickname and/or species for your plant"})
      }else{
          const updatedPlant = await Plants.update(id, plant)
          if(!updatedPlant){
              res.status(404).json({message: "The plant with the specified ID does not exist"})
          }else{
              res.status(200).json(updatedPlant)
              console.log('Plant information has been updated')
          }
      }
    }catch(err){
      res.status(500).json({message: "The plant information could not be modified"})
      console.log(err)
  }
})

// DELETE /api/plants/:id
router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const deletedPlant = await Plants.remove(id)
        if(!deletedPlant){
            res.status(404).json({message: "The plant with the specified ID does not exist"})
        }else{
            res.status(200).json(deletedPlant)
            console.log('Plant was deleted!')
        }
    }catch(err){
        res.status(500).json({message: "The plant could not be removed"})
    }
})







module.exports = router;