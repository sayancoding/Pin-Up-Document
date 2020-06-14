const express = require('express')
const router = express.Router()
const pool = require('../db')
const tokenChecker = require('../token/tokenVerify')

router.get('/', tokenChecker ,async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM docs WHERE user_id = $1 ", [req.userData.user_id])
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(404).json({ error: error })
  }
})

router.post('/', tokenChecker ,async(req,res)=>{
  const {title, desc} = req.body
  try {
    const result = await pool.query("INSERT INTO docs(user_id, doc_title, doc_desc) VALUES($1, $2, $3)", [req.userData.user_id,title,desc])
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({error : error})
  }
})

module.exports = router