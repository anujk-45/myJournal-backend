const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
  try{
    console.log('Inside auth')
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token,process.env.SECRET_STRING);
    const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token})

    if(!admin){
      throw new Error()
    }

    req.token = token
    req.admin = admin
    next()
  } catch(e) {
    res.status(401).send({error: 'Please Authenticate'})
  }

}

module.exports = auth;