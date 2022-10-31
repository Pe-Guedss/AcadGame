const ROUTER = require('express').Router();

const AUTH_DOMAIN = require('../../domains/authentication/authDomain');

// const AUTH = require('../../domains/authentication/authDomain');

ROUTER.post('/login', 
    async (req, res, next) => {
        if (!req.isAuthenticated())
            await AUTH_DOMAIN.login(req, res, next);
        else
            res.status(400).send('Você já está logado!');
    },
    async (req, res) => {
        try {
            res.status(200).send({
                token: req.cookies['connect.sid'],
                message: 'Enjoy your token! :)'
            });
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });

module.exports = ROUTER;