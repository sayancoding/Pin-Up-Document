const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4000
const app = express();

app.use(cors({origin:"*"}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.listen(PORT,_=>{
  console.log(`local server is running at ${PORT}`)
})