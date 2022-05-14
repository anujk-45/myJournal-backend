require('dotenv').config()
const express = require('express')
const connectDB = require('./db/mongoose')
const blogRouter = require('./routers/blog')
const adminRouter = require('./routers/admin')

const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json());

app.use(
  cors({
      origin : ["https://akj-myjournal.netlify.app","http://localhost:3000"],
      credentials: true,
  })
);
app.use('/blogs',blogRouter);
app.use('/admin',adminRouter);

connectDB();

app.listen(port, () => {
  console.log('Server is up on port '+port)
})