const express = require('express')
const router = express.Router()
const pool = require('../db')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

router.post('/', async (req,res)=>{
  const {email} = req.body
  try{
    const data = await pool.query("SELECT user_name,user_id,user_email FROM users WHERE user_email = $1",[email])
    if(data.rowCount == 1){
      let token = jwt.sign(
        data.rows[0],
        'secret',
        {
          expiresIn:'10m'
        }
      )
      //transporter configure
      let transporter = nodemailer.createTransport({
        // service:'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        // secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PWD
        }
      })
      let output = `<p>Hey, ${data.rows[0].user_name}.</p> </br> <p> Don't be worry. You've got a <strong>rest password link below,&nbsp;</strong>just click on it and make changes as new password that you wish .</p>
<p><a href="http://localhost:4200/reset-password/${token}">http://localhost:4200/reset-password/${token}</a></p>
<p>Thank for being with us.</p>
<p><span style="color: #000080;">Team <strong>PinUp.</strong></span></p>`;

      let mailOption = {
        from: '"PinUp Team 👻" <alan.digital007@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset PinUp password", // Subject line
        text: "do reset as you want", // plain text body
        html: output, // html body
      }
      transporter.sendMail(mailOption, (err, data) => {
        if (err) {
          console.log("Catch an error..")
          res.status(500).json({message:"un-sended.."})
        } else {
          console.log(`email sended to ${req.body.email} `)
          res.status(200).json({
            "ack": "mail sended..",
            "token":token
          })
        }
      })

    }else{
      res.status(404).json({message:'not matched any user'})
    }
  }catch(err){
    res.status(404).json({error:err})
  }
})

module.exports = router