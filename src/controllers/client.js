const User = require('../models/User')
const Client = require('../models/Client')
const RedirectUrl = require('../models/RedirectUrl')
const common = require('../common/common')
const { Sequelize } = require('../db/db')

module.exports = {

    validateClient: async (req, res) => {
        try {
            const clientId = req.query.client_id
            const redirectUri = req.query.redirect_uri
            const clientIdExists = await Client.findOne({ where: { client_id: clientId } })
            if (!clientIdExists) {
                return res.send({
                    code: 404,
                    message: 'Invalid Client Id.',
                })
            }
            if (redirectUri !== clientIdExists.redirect_uri) {
                return res.send({
                    code: 400,
                    message: 'Redirect Uri Mismatch.',
                })
            }
            return res.send({
                code: 200,
                message: 'Ok',
                data: {
                    app_name: clientIdExists.app_name
                }
            })
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }

    },
    createCred: async (req, res) => {
        try {
            const client_id = common.generateClientId()
            const client_secret = common.generateClientSecret()
            const appName = req.body.appName

            // Check if app is in db
            const appNameExists = await Client.findOne({ where: { app_name: appName } })
            if (appNameExists) {
                return res.send({
                    code: 404,
                    message: 'App Already Exists.',
                })
            }
            // Save the app in db
            const newClient = Client.build({
                id: common.generateCode(),
                user_id: 'user_id',
                client_id,
                client_secret,
                app_name: appName,
                meta_created_at: Date.now(),
                meta_updated_at: Date.now(),
            })
            const result = newClient.save()
            if (result) {
                return res.send({
                    code: 200,
                    message: 'Client Add Success.',
                    data: result
                })
            }
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }
    },
    getCred: async (req, res) => {
        try {
            const userId = 'user_id'
            const creds = await Client.findAll({ where: { user_id: userId } })
            if (!creds) {
                return res.send({
                    code: 404,
                    message: 'No data found.',
                    data: []
                })
            }
            return res.send({
                code: 200,
                message: 'OK',
                data: creds
            })
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }
    },
    addUri: async (req, res) => {
        try {
            const uri = req.body.redirectUri
            const clientId = req.body.clientId
            // Save the uri with client id
            const newEntry = RedirectUrl.build({
                id: common.generateCode(),
                client_id: clientId,
                redirect_uri: uri
            })
            const result = newEntry.save()
            if (result) {
                return res.send({
                    code: 200,
                    message: 'Save success.',
                    data: result
                })
            }
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }
    },
    getUri: async (req, res) => {
        try {
            const clientId = req.body.clientId
            const uris = await RedirectUrl.findAll({ where: { client_id: clientId } })
            if (!uris) {
                return res.send({
                    code: 404,
                    message: 'No data found.',
                    data: []
                })
            }
            return res.send({
                code: 200,
                message: 'OK',
                data: uris
            })
        } catch (err) {
            return res.send({
                code: 500,
                message: 'Internal Server Error.'
            })
        }
    },
    secure: (req, res) => {
        if (req.token) {
            res.send({
                code: 200,
                message: 'OK'
            })
        } else {
            res.send({
                code: 403,
                message: 'Unauthorized'
            })
        }
    },
    profile: (req, res) => {
        if (true) {
            res.send({
                code: 200,
                message: 'OK',
                data: {
                    userName: 'user1'
                }
            })
        } else {
            res.send({
                code: 403,
                message: 'Unauthorized'
            })
        }
    },
    clients: (req, res) => {

        Client.findAll()
            .then(result => {
                res.send({
                    code: 200,
                    message: 'OK',
                    data: result
                })
            })
            .catch(err => {
                res.send({
                    code: 500,
                    message: err
                })
            })
    },
    users: (req, res) => {

        User.findAll({})
            .then(result => {
                res.send({
                    code: 200,
                    data: result
                })
            })
            .catch(err => {
                res.send({
                    code: 500,
                    message: err
                })
            })
    }
}