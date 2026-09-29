const express = require("express");
const db = require("./config/db");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM products ORDER BY id DESC"
        );

        res.status(200).json(rows);

    } catch (error) {
        console.error("Error fetching products:", error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});


// GET one product
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        console.error("Error fetching product:", error);

        res.status(500).json({
            message: "Failed to fetch product"
        });
    }
});


// POST - Add product
router.post("/", async (req, res) => {
    try {
        const {
            name,
            category,
            price,
            quantity,
            minimum_stock,
            supplier
        } = req.body;

        if (!name || !category || price === undefined || quantity === undefined) {
            return res.status(400).json({
                message: "Name, category, price and quantity are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO products
            (name, category, price, quantity, minimum_stock, supplier)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                category,
                price,
                quantity,
                minimum_stock ?? 5,
                supplier ?? null
            ]
        );

        res.status(201).json({
            message: "Product added successfully",
            productId: result.insertId
        });

    } catch (error) {
        console.error("Error adding product:", error);

        res.status(500).json({
            message: "Failed to add product"
        });
    }
});


// PUT - Update product
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            category,
            price,
            quantity,
            minimum_stock,
            supplier
        } = req.body;

        if (!name || !category || price === undefined || quantity === undefined) {
            return res.status(400).json({
                message: "Name, category, price and quantity are required"
            });
        }

        const [result] = await db.query(
            `UPDATE products
             SET name = ?,
                 category = ?,
                 price = ?,
                 quantity = ?,
                 minimum_stock = ?,
                 supplier = ?
             WHERE id = ?`,
            [
                name,
                category,
                price,
                quantity,
                minimum_stock ?? 5,
                supplier ?? null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully"
        });

    } catch (error) {
        console.error("Error updating product:", error);

        res.status(500).json({
            message: "Failed to update product"
        });
    }
});


// DELETE - Delete product
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting product:", error);

        res.status(500).json({
            message: "Failed to delete product"
        });
    }
});


module.exports = router;