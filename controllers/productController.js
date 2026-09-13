const db = require("../db");


// TEST CHECK
const testcheck = (req, res) => {
    res.json({
        message: "Test check successful"
    });
}

// CREATE
const createProduct = (req, res) => {

    const {
        name,
        sku,
        description,
        price,
        stock,
        category,
        brand,
        featured,
        product_type,
        available_date
    } = req.body;

    if (!name || !sku || !price) {
        return res.status(400).json({
            message: "Name, SKU and Price are required"
        });
    }

    const sql = `
        INSERT INTO products
        (
            name,
            sku,
            description,
            price,
            stock,
            category,
            brand,
            featured,
            product_type,
            available_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        sku,
        description,
        price,
        stock,
        category,
        brand,
        featured,
        product_type,
        available_date
    ];

    db.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(201).json({
            message: "Product created successfully",
            id: result.insertId
        });
    });
};


// GET ALL
const getProducts = (req, res) => {

    const sql = "SELECT * FROM products ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json(result);
    });
};


// GET SINGLE
const getProduct = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(result[0]);
    });
};


// UPDATE
const updateProduct = (req, res) => {

    const { id } = req.params;

    const {
        name,
        sku,
        description,
        price,
        stock,
        category,
        brand,
        featured,
        product_type,
        available_date
    } = req.body;

    const sql = `
        UPDATE products SET
            name = ?,
            sku = ?,
            description = ?,
            price = ?,
            stock = ?,
            category = ?,
            brand = ?,
            featured = ?,
            product_type = ?,
            available_date = ?
        WHERE id = ?
    `;

    const values = [
        name,
        sku,
        description,
        price,
        stock,
        category,
        brand,
        featured,
        product_type,
        available_date,
        id
    ];

    db.query(sql, values, (err) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message: "Product updated successfully"
        });
    });
};


// DELETE
const deleteProduct = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message: "Product deleted successfully"
        });
    });
};


// UPDATE STATUS
const updateStatus = (req, res) => {

    const { id } = req.params;

    const { status } = req.body;

    const sql = `
        UPDATE products
        SET status = ?
        WHERE id = ?
    `;

    db.query(sql, [status, id], (err) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message: "Status updated successfully"
        });
    });
};


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateStatus
};