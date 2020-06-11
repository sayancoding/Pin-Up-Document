const express = require('express')
const router = express.Router()
const pool = require('../db')
// const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM docs")
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(404).json({ error: error })
  }
})

module.exports = router