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
            'SELECT * FROM purchases;',
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
            'INSERT INTO purchases (customer_id, product_id, purchase_value) VALUES (?, ?, ?)',
            [
                req.body.customer_id,
                req.body.product_id,
                req.body.purchase_value
            ],
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        "error": error
                    });
                }

                res.status(200).send({
                    "message": "Successfully created",
                    "method": "POST",
                    "id_purchase": result.insertId,
                    "values": {
                        "customer_id": req.body.customer_id,
                        "product_id": req.body.product_id,
                        "purchase_value": req.body.purchase_value
                    }
                });
            }
        )
    })
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(200).send({
                
            })
        }
    })
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