const Sequelize = require('sequelize')
const db = require('../db/db')

const Client = db.define('client', {
    // id: {
    //     type: Sequelize.STRING
    // },
    user_id: {
        type: Sequelize.STRING
    },
    client_id: {
        type: Sequelize.STRING
    },
    app_name: {
        type: Sequelize.STRING
    },
    client_secret: {
        type: Sequelize.STRING
    },
    meta_created_at: {
        type: Sequelize.DATE
    },
    meta_updated_at: {
        type: Sequelize.DATE
    },
}, {
    timestamps: false
})

module.exports = Client