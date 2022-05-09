const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
  id: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

adminSchema.methods.generateAuthToken = async function(admin) {
  const token = jwt.sign({_id: admin._id.toString()}, process.env.SECRET_STRING)
  admin.tokens = admin.tokens.concat({token: token})
  await admin.save()
  return token
}

adminSchema.statics.findByCredentials = async (id, password) => {
  const admin = await Admin.findOne({id})
  console.log(password)
  if(!admin){
    console.log('admin not found');
    throw new Error('Unable to login')
  }else {
    console.log(admin);
  }
    const isMatch = await bcrypt.compare(password,admin.password)

  if(!isMatch){
    console.log('Password not matching');
    throw new Error('Unable to login')
  }

  return admin
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin