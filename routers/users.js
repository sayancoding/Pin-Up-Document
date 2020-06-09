const express = require('express')
const router = express.Router()
const pool  = require('../db')

router.get('/', async (req,res)=>{
  try {
    const data = await pool.query("SELECT * FROM users")
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(404).json({ error: error })
  }
})

router.get('/:id', async (req,res)=>{
  try {
    const data = await pool.query("SELECT * FROM users WHERE user_id = $1",[req.params.id])
    if(data.rowCount > 0)
    res.status(200).json(data.rows);
    else
    res.status(401).json({msg : "No entity found.."})
  } catch (error) {
    res.status(404).json({ error: error })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users WHERE user_email = $1",[req.body.email])
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(404).json({ error: error })
  }
})


module.exports = router