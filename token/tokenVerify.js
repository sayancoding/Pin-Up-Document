const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
  try {
    if(!req.headers.authorization){
      return res.status(401).json({message : "unauthorized !"})
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token == null){
      return res.status(401).json({ message: "unauthorized !" })
    }
    let payload = jwt.verify(token,'Secret')
    if(!payload){
      return res.status(401).json({ message: "unauthorized !" })
    }
    req.userData = payload
    next();
  } catch (error) {
    return res.status(401).json({ error : error })
  }
}