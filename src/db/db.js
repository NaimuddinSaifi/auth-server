const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

const dbName = process.env.DB_NAME || 'auth-db'
const dbUser = process.env.DB_USER || 'postgres'
const dbPassword = process.env.DB_PASS || 'naimu'
const dbHost = process.env.DB || 'localhost'

// module.exports = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   dialect: 'postgres'
// })\
const url = 'mongodb+srv://naimuddin:naimu@cluster0.yuf1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(process.env.DATABASE_URL || url).then(res => {
  console.log(res, 'res')
}).catch(err => {
  console.log(err, 'err')
})



