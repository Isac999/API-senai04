const { request } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('../../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                "error": error
            });
        }
        conn.query(
            'SELECT * FROM customers;',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        "error": error
                    });
                }

                res.status(200).send({
                    "result": result
                });
            }
        )
    })
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { 
            return res.status(500).send({
                "error": error
            });
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
                });
            }
        )
    })
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                "error": error
            });
        }
        conn.query(
            `UPDATE customers SET 
            name = ?,
            money = ?,
            email = ?,
            password = ? WHERE id = ?`,
            [
                req.body.name,
                req.body.money,
                req.body.email,
                req.body.password,
                req.body.id
            ],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        "error": error
                    });
                }
                res.status(200).send({
                    "result": result
                });
            }

        )
    })
});

router.delete('/', (req, res, next) => {
    res.status(200).send({
        "mensagem": "Acessado a rota atual com DELETE"
    });
});

router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                "error": error
            });
        }
        conn.query(
            'SELECT * FROM customers WHERE id = ?',
            [req.params.id],
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        "error": error
                    });
                }

                res.status(200).send({
                    "result": result
                });
            }
        )
    })
});

module.exports = router;