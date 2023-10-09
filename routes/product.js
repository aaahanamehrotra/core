const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    // console.log(products);
    res.render("products", { data: products });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    res.render("product", { data: product });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
