const express = require('express')
const router = express.Router()
const Users = require('./model.js')
const bcrypt = require('bcryptjs')
const { restricted } = require('./middleware.js')


// ENDPOINTS

//GET
router.get('/',restricted, (req,res,next) =>{ // provides an array of all the users and their phone numbers
    Users.find()
        .then(users =>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(next)
})

router.get('/logout', (req,res)=>{
    if(req.session){
      req.session.destroy(err =>{
        if(err){
          res.json('Unable to end session')
        }else{
          res.json('Session ended successfully')
          console.log('User logged out successfully!')
        }
      })
    }else{
      res.json('No session found')
  }
})

//POST
router.post('/register', async (req,res) =>{
    try{
        const hash = bcrypt.hashSync(req.body.password,10)
        const newUser = await Users.add({username:req.body.username, password:hash, phone_number:req.body.phone_number})
        res.status(200).json(newUser)
        console.log(`Welcome, ${req.body.username}!`)
    }catch(e){
        res.status(500).json(`Server error: ${e}`)
    }
})

router.post('/login', async (req,res)=>{
    const originalUser = await Users.findBy({username:req.body.username})
    const { username, password } = originalUser[0]
    try{
      const verifiedUser = bcrypt.compareSync(req.body.password,password)
      if(verifiedUser){
        req.session.user = username
        res.json({message: `Welcome back ${username}!`})
        console.log(`User ${username} was logged in successfully!`)
      }else {
        res.status(401).json({err: 'Invalid credentials'})
      }
    }catch(e){
          res.status(500).json({message:e.message})
      }
  })

  // PUT
  router.put('/:user_id', async (req,res) =>{
      const user = req.body
      const {user_id} = req.params
      try{
        if(!user.password || !user.phone_number){
            res.status(400).json({message: "Please provide a new password and/or phone number"})
        }else{
            const updatedUser = await Users.update(user_id, user)
            if(!updatedUser){
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }else{
                res.status(200).json(updatedUser)
                console.log('User information has been updated')
            }
        }
      }catch(err){
        res.status(500).json({message: "The user information could not be modified"})
        console.log(err)
    }
  })



module.exports = router;