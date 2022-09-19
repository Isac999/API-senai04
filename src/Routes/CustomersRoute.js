const { request } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(202).send({
        "mensagem": "Acessado a rota atual com GET"
    });
});

router.post('/', (req, res, next) => {
    const collection = {
        "name": req.body.name,
        "price": req.body.price,
        "creator": req.body.creator,
        "description": req.body.description
    }
    let customer = {
        "mensagem": "Produto inserido",
        "value": collection
    }

    res.status(201).send({
        "mensagem": "Acessado a rota atual com POST",
        "result": customer
    });
});

router.put('/', (req, res, next) => {
    res.status(200).send({
        "mensagem": "Acessado a rota atual com PUT"
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).send({
        "mensagem": "Acessado a rota atual com DELETE"
    });
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    res.status(200).send({
        "mensagem": `Retornando o id: ${id}` 
    });
});

module.exports = router;

/*
const UserController = require('../Controllers/UserController');

module.exports = (app) => {
    app.post('/usuario', UserController.post);
    app.put('/usuario/:id', UserController.put);
    app.delete('/usuario/:id', UserController.del);
    app.get('/usuarios', UserController.get);
    app.get('/usuario/:id', UserController.getId);
}
*/