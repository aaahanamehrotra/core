const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ticket = require("../models/Ticket");

router.post("/", async (req, res) => {
  const { username, tickets, id } = req.body;

  let errors = [];
  if (!tickets || tickets > 10) {
    errors.push({
      msg: "Please fill in all fields (You can buy max 10 tickets at a time)",
    });
  }
  if (errors.length > 0) {
    res.render("book", {
      username,
      errors,
      tickets,
      id,
    });
  } else {
    const stock = await Ticket.findById("652420d7667185be193bfd94");
    const remaining = stock.Tickets;
    const bought = tickets;

    const updated = await Ticket.updateOne(
      { _id: "652420d7667185be193bfd94" },
      { $set: { Tickets: remaining - bought } }
    );

    const id = req.body.id;
    console.log(id);
    const buyer = await User.findById(id);
    const inaccount = buyer.bookedtickets;
    console.log(inaccount);
    const added = await User.updateOne(
      { _id: id },
      { $set: { bookedtickets: Number(inaccount) + Number(bought) } }
    );

    res.redirect("/");
  }
});

module.exports = router;
