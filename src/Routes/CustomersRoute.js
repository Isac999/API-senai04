const { request } = require('express');
const express = require('express');
const { render } = require('../../app');
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
                    "message": "Successfully request",
                    "legth":  result.length,
                    "method": "GET",
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
                    "message": "Successfully created",
                    "method": "POST",
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
                    "message": "Successfully update",
                    "method": "PATCH",
                    "id_customer": req.body.id,
                    "newValues": {
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

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                "error": error
            });
        }
        conn.query(
            'DELETE FROM customers WHERE id = ?',
            [req.body.id],
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        "error": error
                    });
                }
                
                res.status(200).send({
                    "message": "Deleted with success",
                    "method": "DELETE",
                    "idTarget": req.body.id
                });
            }
        )
    })
})

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
                if (result.length == 0) {
                    return res.status(404).send({
                        "message": "Customer not found",
                        "id": req.params.id
                    }) 
                }
                res.status(200).send({
                    "message": "Successfully request",
                    "legth":  result.length,
                    "method": "GET",
                    "result": result
                });
            }
        )
    })
});

module.exports = router;