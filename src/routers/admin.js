const express = require('express')
const router = new express.Router()
const cors = require('cors')
const Admin = require('../models/admin')
const auth = require('../middleware/auth')

router.post('/login', cors(), async (req, res) => {
  try{   
    console.log('Inside Login')
    const admin = await Admin.findByCredentials(req.body.id, req.body.password)
    const token = await admin.generateAuthToken(admin);
    res.send({admin, token})
  } catch(e) {
    res.status(400).send(e)
  }
})

router.get('/logout', cors(), auth, async (req, res) => {
  try{
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.admin.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;