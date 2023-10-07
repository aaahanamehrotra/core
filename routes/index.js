const express = require("express");
const res = require("express/lib/response");
const { ensureAuthenticated } = require("../config/auth");

const router = express.Router();

router.get("/", (req, res) => res.render("welcome"));
router.get("/about", (req, res) => res.render("about"));
router.get("/products", (req, res) => res.render("products"));
router.get("/products/:id", (req, res) =>
  res.render("product", { id: req.params.id })
);
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    name: req.user.name,
  })
);

module.exports = router;
