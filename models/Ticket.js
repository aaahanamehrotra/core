const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  Tickets: {
    type: Number,
    default: 700,
  },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
