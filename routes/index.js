const express = require("express");
const res = require("express/lib/response");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Product = require("../models/Product");

router.get("/", (req, res) => res.render("dashboard"));
router.get("/about", (req, res) => res.render("about"));
router.get("/checkout", ensureAuthenticated, (req, res) =>
  res.render("checkout")
);
router.get("/book", ensureAuthenticated, async (req, res) => {
  const stock = await Ticket.findById("652420d7667185be193bfd94");
  const tickets = stock.Tickets;

  const data = req.user;
  console.log(data);
  res.render("book", { user: req.user, tickets: tickets });
});

router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("profile", {
    user: req.user,
  })
);
module.exports = router;
