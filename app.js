const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pool = require('./db')
const PORT = process.env.PORT || 4000
const app = express();

app.use(cors({origin:"*"}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

pool.query('SELECT NOW()', (err, res) => {
  try{
    console.log("db Connected..")
  }
  catch{
    console.log(err)
  }
})

app.get('/users', async (req,res)=>{
  try {
    const data = await pool.query("SELECT user_id, user_name,user_email FROM users")
    res.json(data.rows);
  } catch (error) {
    res.status(404).json(error)
  }
})

app.post('/signup',async (req,res)=>{
  const {user_name,user_email,user_pwd} = req.body
  try {
    const data = pool.query("INSERT INTO users(user_name,user_email,user_pwd) VALUES($1,$2,$3)",[user_name,user_email,user_pwd])
    res.json(data)
  } catch (error) {
    
  }
  // console.log(req.body)
})

app.listen(PORT,_=>{
  console.log(`local server is running at ${PORT}`)
})