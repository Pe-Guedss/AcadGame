const ROUTER = require('express').Router();

ROUTER.get('/accepted', async (req, res, next) => {
    try {
        res.status(200).send('Essa rota é responsável por retornar todos os amigos do usuário que realizou a requisição.');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/pending', async (req, res, next) => {
    try {
        res.status(200).send('Essa rota retorna todos os pedido de amizade pendentes do usuário que realizou a requisição.');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.post('/add', async (req, res, next) => {
    try {
        res.status(200).send('Essa rota é responsável por enviar uma solicitação de amizade a outro usuário do aplicativo.');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.delete('/remove', async (req, res, next) => {
    try {
        res.status(200).send('O objetivo dessa rota é permitir ao usuário excluir um amigo da rede.');
    }
    catch (err) {
        next(err);
    }
})