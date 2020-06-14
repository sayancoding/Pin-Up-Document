const express = require('express')
const router = express.Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users")
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(404).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.params.id])
    if (data.rowCount > 0)
      res.status(200).json(data.rows);
    else
      throw new Error("no entity found")
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.params.id])
    if (data.rowCount > 0) {
      pool.query("DELETE FROM users WHERE user_id = $1", [req.params.id])
        .then(_ => {
          res.status(200).json({ message: `id ${req.params.id} is now deleted` })
        })
    }
    else
      throw new Error("no entity found")
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.post('/signin', async (req, res) => {

  try {
    const data = await pool.query("SELECT * FROM users WHERE user_email = $1", [req.body.email])
    if (data.rowCount != 0) {
      bcrypt.compare(req.body.pwd, data.rows[0].user_pwd, async (err, result) => {
        if (err) {
          return res.status(500).json({ error: err })
        } else {
          if (result) {
            const token = jwt.sign(
              {
                "user_id": data.rows[0].user_id,
                "user_name":data.rows[0].user_name,
                "user_email": data.rows[0].user_email,
                "user_id": data.rows[0].user_id
              },
              'Secret',
              {
                expiresIn : '1h'
              }
            )
            return res.status(200).json({
              message:"auth successful",
              token : token
            });
          }
          else
            return res.status(401).json({ error: "auth deny : incorrect password " });
        }
      })
    }
    else
      throw new Error("unauthorized : no user are there")
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

// User Sign up 
router.post('/signup', async (req, res) => {
  const { name, email, pwd } = req.body
  bcrypt.hash(pwd, 10, async (err, hash) => {
    if (!err) {
      try {
        const data = await pool.query("INSERT INTO users(user_name,user_email,user_pwd) VALUES($1,$2,$3) RETURNING *", [name, email, hash])
        res.status(200).json({message:'User created Successfully',saveDat:data.rows})
      } catch (err) {
        res.status(404).json({ error: err })
      }
    } else {
      return res.status(500).json({ error: err })
    }
  })

})


module.exports = router