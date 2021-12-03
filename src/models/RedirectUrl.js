const Sequelize = require('sequelize')
const db = require('../db/db')

const RedirectUrl = db.define('redirecturl', {
    // id: {
    //     type: Sequelize.STRING
    // },
    client_id: {
        type: Sequelize.STRING
    },
    redirect_uri: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false
})

module.exports = RedirectUrl