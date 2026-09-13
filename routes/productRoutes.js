const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateStatus
} = require("../controllers/productController");

router.post("/test", testcheck);

router.post("/", createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id/status", updateStatus);

module.exports = router;