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
            'SELECT * FROM products;',
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
            'INSERT INTO products (name, price, description, image_link, created_by) VALUES (?, ?, ?, ?, ?)',
            [
                req.body.name,
                req.body.price,
                req.body.description,
                req.body.image_link,
                req.body.created_by
            ],
            (error, result, field) => {
                conn.release()
                
                if (error) {
                    return res.status(500).send({
                        "error": error
                    });
                }

                res.status(201).send({
                    "message": "Successfully created",
                    "method": "POST",
                    "id_product": result.insertId,
                    "values": {
                        "name": req.body.name,
                        "price": req.body.price,
                        "description": req.body.description,
                        "image_link": req.body.image_link,
                        "created_by": req.body.created_by
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
            `UPDATE products SET
            name = ?,
            price = ?,
            description = ?, 
            image_link = ?,
            created_by = ? WHERE id = ?`, 
            [
                req.body.name,
                req.body.price,
                req.body.description,
                req.body.image_link,
                req.body.created_by,
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
                        "name": req.body.name,
                        "price": req.body.price,
                        "description": req.body.description,
                        "image_link": req.body.image_link,
                        "created_by": req.body.created_by
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
            'DELETE FROM products WHERE id = ?',
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
                })
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
            'SELECT * FROM products WHERE id = ?',
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
                        "message": "CProduct not found",
                        "id": req.params.id
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

module.exports = router;