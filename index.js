require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const mongoose = require('mongoose');

// const router = require('./routes/route')
// const db = require('./db/db')

// db.authenticate()
//   .then(() => console.log('DB Success.'))
//   .catch(() => console.log('DB Error.'))


mongoose.connect(process.env.DATABASE_URL).then(res => {
  console.log('DB CONNECTED.')
}).catch(err => {
  console.log('err')
})
console.log(22,process.env.NODE_ENV)
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/api', router)

app.use('/', (req, res) => {
  return res.send('Auth Server.')
})

app.listen(port, () => {
  console.log(`Auth Server live at ${port}`)
})