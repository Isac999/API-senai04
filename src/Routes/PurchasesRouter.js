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
                "error": error
            });
        }
        conn.query(
            `UPDATE purchases SET
            customer_id = ?,
            product_id = ?,
            purchase_value = ? WHERE id = ?`,
            [   req.body.customer_id,
                req.body.product_id,
                req.body.purchase_value,
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
                    "id_product": req.body.id,
                    "newValues": {
                        "customer_id": req.body.customer_id,
                        "product_id": req.body.product_id,
                        "purchase_value": req.body.purchase_value,
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
            'DELETE FROM purchases WHERE id = ?',
            [req.body.id],
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        'error': error
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
});

router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                "error": error
            });
        }
        conn.query(
            'SELECT * FROM purchases WHERE id = ?',
            [req.body.id],
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        "error": error
                    });
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        "message": "Purchase not found",
                        "id": req.body.id
                    });
                }

                res.status(200).send({
                    "message": "Successfully request",
                    "legth":  result.length,
                    "method": "GET",
                    "result": result
                })
            }
        )
    })
});

module.exports = router;