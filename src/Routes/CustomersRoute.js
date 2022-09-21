const { request } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../../mysql').pool;

router.get('/', (req, res, next) => {
    res.status(202).send({
        "mensagem": "Acessado a rota atual com GET"
    });
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                "error": error
            })
        }
        conn.query(
            'INSERT INTO customers (name, money, email, password) VALUES (?, ?, ?, ?)',
            [req.body.name, req.body.money, req.body.email, req.body.password],
            (error, result, field) => {
                
                conn.release();

                if (error) {
                    return res.status(500).send({
                        'error': error,
                        'response': null
                    });
                }

                res.status(201).send({
                    "mensagem": "Produto inserido",
                    "id_customer": result.insertId,
                    "values": {
                        "name": req.body.name,
                        "money": req.body.money,
                        "email": req.body.email,
                        "password": req.body.password
                    }
                })
            }
        )
    })
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