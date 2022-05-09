const mongoose = require('mongoose')
const URI = process.env.DATABASE;

const connectDB = async() => {
  await mongoose.connect(URI);
  console.log('Database Connected'); 
}

module.exports = connectDB;