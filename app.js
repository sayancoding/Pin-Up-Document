const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pool = require('./db')
const PORT = process.env.PORT || 4000
const app = express();

const Users = require('./routers/users')
const Docs = require('./routers/docs')
app.use(cors({origin:"*"}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


pool.query('SELECT NOW()', (err, res) => {
  try{
    console.log("db Connected..")
  }
  catch(err){
    console.log(err)
  }
})
// all routes are here
// Get user data
app.use('/users',Users)
app.use('/docs',Docs)

app.listen(PORT,_=>{
  console.log(`local server is running at ${PORT}`)
})