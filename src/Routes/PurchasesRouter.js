const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(202).send({
        "mensagem": "Acessado a rota atual com GET"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        "mensagem": "Acessado a rota atual com POST"
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